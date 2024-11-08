<?php

namespace App\Http\Controllers;

use App\Models\Oders;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DetailOrders;
use Illuminate\Support\Facades\Auth;
use App\Models\SaleOff;
use App\Models\Products;


class OrdersController extends Controller
{
    /**
     * Tạo đơn hàng mới.
     */
    public function createOrder(Request $request)
    {
        $paymentMethod = $request->paymentMethod;
        $customer_id = $request->customer_id;
        $products = $request->products;
        $totalPrice = $this->calculateTotalPrice($products);
        
        $order = $this->createNewOrder($customer_id, $paymentMethod, $totalPrice, $request->note);
        if ($order->id) {
            $this->createOrderDetails($order->id, $products);
            
            // Xóa sản phẩm trong giỏ hàng sau khi đặt hàng thành công
            foreach ($products as $product) {
                \App\Models\Cart::where('customer_id', $customer_id)
                    ->where('product_id', $product['id'])
                    ->delete();
            }
        }
        
        $orders = Oders::with(['customer', 'payment', 'orderDetails'])->find($order->id);

        foreach ($orders->orderDetails as $detail) {
            $product = Products::with('images')->find($detail->p_id);
            $detail->images = $product->images;
        }
        
        if ($paymentMethod == 'cod') {
            return Inertia::render('User/OrderInform', compact('orders'));
        } elseif ($paymentMethod == 'bank') {
            $vnp_Url = $this->createPaymentUrl($order, $totalPrice);
            return Inertia::render('User/OrderInform', compact('orders', 'vnp_Url'));
        }
    }

    /**
     * Tính tổng giá trị đơn hàng.
     */
    private function calculateTotalPrice($products)
    {
        return array_reduce($products, function($total, $product) {
            return $total + ($product['price'] * $product['quantity']);
        }, 0);
    }

    /**
     * Tạo đơn hàng mới.
     */
    private function createNewOrder($customer_id, $paymentMethod, $totalPrice, $note)
    {
        $order = new Oders();
        $order->cus_id = $customer_id;
        $order->pa_id = $paymentMethod == 'cod' ? 1 : 3;
        $order->or_total = $totalPrice;
        $order->or_status = json_encode(['6' => 'Chưa xác nhận']); // Chưa xác nhận
        $order->or_ship = '';
        $order->or_date = now();
        $order->or_note = $note ?? 'Không có ghi chú';
        $order->save();
        
        return $order;
    }

    /**
     * Tạo chi tiết đơn hàng.
     */
    private function createOrderDetails($order_id, $products)
    {
        foreach ($products as $product) {
            DetailOrders::create([
                'or_id' => $order_id,
                'p_id' => $product['id'],
                'quantity' => $product['quantity'],
                'total' => $product['price'] * $product['quantity']
            ]);
        }
    }

    /**
     * Tạo URL thanh toán VNPAY.
     */
    public function createPaymentUrl($order, $totalPrice)
    {
        $vnp_TmnCode = "3DR25O0Z";
        $vnp_HashSecret = "ZT3DYXM8SLCVA3YJXTBIDP6PUMI8V0PI";
        $vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:8000/return-vnpay";
        $vnp_TxnRef = $order->id;
        $vnp_OrderInfo = "Thanh toán hóa đơn phí dịch vụ";
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $totalPrice * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = $vnp_Bill_State = "";

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => request()->ip(),
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        if ($vnp_BankCode) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if ($vnp_Bill_State) {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url .= "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        return $vnp_Url;
    }

    public function returnVnpay(Request $request)
    {
        $vnp_ResponseCode = $request->vnp_ResponseCode;
        $vnp_TxnRef = $request->vnp_TxnRef;

        if($vnp_ResponseCode == '00') {
            $order = Oders::find($vnp_TxnRef);
            $order->or_status = 1;
            $order->save();
            $orders = Oders::with(['customer', 'payment', 'orderDetails.product.images'])->find($order->id);
            return Inertia::render('User/OrderSuccess', compact('orders'));
        }
    }

    public function updatePayment(Request $request)
    {

        $order = Oders::find($request->order_id);
        $order->save();
        return redirect()->back();
    }

    public function updateOrder($order_id)
    {
        $order = Oders::find($order_id);
        $order->or_status = 1;
        $order->or_date = now();
        $order->save();
        return redirect()->back();
    }

    public function confirmOrder($order_id)
    {
        $order = Oders::find($order_id);
        return Inertia::render('User/OrderConfirm', compact('order'));
    }

    public function orderConfirm()
    {
        return Inertia::render('User/OrderConfirm');
    }

    public function orderSuccess()
    {
        $user = session()->get('customer');
        $orders = Oders::with(['customer', 'payment', 'orderDetails.product'])
                      ->where('cus_id', $user->id)
                      ->get();
        $orders = $orders->map(function($order) {
            $order->or_status = json_decode($order->or_status);
            return $order;
        });
        return Inertia::render('User/OrderSuccess', compact('orders'));
    }

    public function followOrder()
    {
        return Inertia::render('User/FollowOrder');
    }

    public function orderInform()
    {
        return Inertia::render('User/OrderInform');
    }

    public function cancelOrder(Request $request, $order_id)
    {
        $order = Oders::find($order_id);
        
        $order->or_note = $request->or_note ?? '';
        $order->or_status = -1;
        $user = session()->get('customer');
        $orders = Oders::with(['customer', 'payment', 'orderDetails.product'])
                      ->where('cus_id', $user->id)
                      ->get();
        $order->save();
        return redirect()->back()->with('success', 'Hủy đơn hàng thành công');
    }
}
