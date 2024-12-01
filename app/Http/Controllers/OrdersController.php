<?php

namespace App\Http\Controllers;

use App\Models\Oders;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DetailOrders;
use Illuminate\Support\Facades\Auth;
use App\Models\SaleOff;
use App\Models\Products;
use Carbon\Carbon;


class OrdersController extends Controller
{

    /**
     * Tạo đơn hàng mới.
     */
    public function createOrder(Request $request)
    {
        //dd($request->all());
        $paymentMethod = $request->paymentMethod;
        $customer_id = $request->customer_id;
        $products = $request->products;
        $voucher_code = $request->voucher_code;
        $discount = $request->discount;
        $shippingFee = $request->shippingFee;

        
        $totalPrice = $this->calculateTotalPrice($products);
        
        $order = $this->createNewOrder($customer_id, $paymentMethod, $totalPrice, $request->note, $products, $voucher_code, $discount, $shippingFee);
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
    private function createNewOrder($customer_id, $paymentMethod, $totalPrice, $note, $products, $voucher_code, $discount, $shippingFee)
    {
        $order = new Oders();
        $order->cus_id = $customer_id;
        $order->pa_id = $paymentMethod == 'cod' ? 1 : 2;
        // $order->pa_id = $paymentMethod == 'vnpay' ? 2 : 3;
        $order->or_total = $totalPrice;
        $order->or_status = json_encode(['1' => 'Đang chờ xử lý']);
        $order->or_ship = '';
        $order->or_date = now();
        $order->or_note = $note ?? 'Không có ghi chú';
        $order->voucher_code = $voucher_code;
        $order->or_discount = $discount;
        $order->or_ship = $shippingFee;
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
                'total' => $product['price'] * $product['quantity'],
                'discount' => $product['discount'] ?? 0
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
        $vnp_Returnurl = "http://localhost:8000/user/return-vnpay";
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
            if($order) {
                $order->or_status = json_encode(['0' => 'Đã thanh toán', '1' => 'Đang chờ xử lý']);
                $order->save();
                // $orders = Oders::with(['customer', 'payment', 'orderDetails.product.images'])->find($order->id);
                $orders = Oders::with(['customer', 'payment', 'orderDetails'])->find($order->id);

                foreach ($orders->orderDetails as $detail) {
                    $product = Products::with('images')->find($detail->p_id);
                    $detail->images = $product->images;
                }
        
                return Inertia::render('User/OrderInform', compact('orders'));
            }
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
        $status = $request->status;
        $order = Oders::find($order_id);
        
        // Lấy trạng thái hiện tại
        $currentStatus = json_decode($order->or_status, true);
        
        // Thêm trạng thái mới
        switch($status) {
            case '1':
                $currentStatus['1'] = 'Đang chờ xử lý';
                break;
            case '2':
                $currentStatus['2'] = 'Đã xác nhận';
                break;
            case '3':
                $currentStatus['3'] = 'Đã giao cho đơn vị vận chuyển';
                break;
            case '4':
                $currentStatus['4'] = 'Đang giao';
                // Trừ số lượng sản phẩm khi đơn hàng đang giao
                foreach($order->orderDetails as $detail) {
                    $product = $detail->product;
                    $product->p_quantity -= $detail->quantity;
                    $product->save();
                }
                break;
            case '5':
                $currentStatus['5'] = 'Đã giao';
                // Cộng điểm cho khách hàng khi đơn hàng đã giao
                $customer = $order->customer;
                $customer->cus_points += floor($order->or_total / 100000); // Cộng 1 điểm cho mỗi 100k
                $customer->save();
                break;
            case '6':
                $currentStatus['6'] = 'Chưa xác nhận';
                break;
            case '-1':
                $currentStatus['-1'] = 'Đã hủy';
                $order->or_note = $request->or_note ?? '';
                break;

        }

        $order->or_status = json_encode($currentStatus);
        $order->status = $status;
        $order->save();
        return redirect()->back()->with('success', 'Hủy đơn hàng thành công');
    }


    public function updateStatus($order_id, Request $request)
    {
        $status = $request->status;
        $order = Oders::find($order_id);
        
        // Lấy trạng thái hiện tại
        $currentStatus = json_decode($order->or_status, true);
        
        // Thêm trạng thái mới
        switch($status) {
            case '1':
                $currentStatus['1'] = 'Đang chờ xử lý';
                break;
            case '2':
                $currentStatus['2'] = 'Đã xác nhận';
                break;
            case '3':
                $currentStatus['3'] = 'Đã giao cho đơn vị vận chuyển';
                break;
            case '4':
                $currentStatus['4'] = 'Đang giao';
                // Trừ số lượng sản phẩm khi đơn hàng đang giao
                foreach($order->orderDetails as $detail) {
                    $product = $detail->product;
                    $product->p_quantity -= $detail->quantity;
                    $product->save();
                }
                break;
            case '5':
                $currentStatus['5'] = 'Đã giao';
                // Cộng điểm cho khách hàng khi đơn hàng đã giao
                $customer = $order->customer;
                $customer->cus_points += floor($order->or_total / 100000); // Cộng 1 điểm cho mỗi 100k
                $customer->save();
                break;
            case '6':
                $currentStatus['6'] = 'Chưa xác nhận';
                break;
            case '-1':
                $currentStatus['-1'] = 'Đã hủy';
                break;
        }

        $order->or_status = json_encode($currentStatus);
        $order->status = $status;
        $order->save();
        return redirect()->back();
    }
    
    //API
    public function apiOrdersByCustomerId($id, Request $request) 
    {
        $date = $request->date;

        // Truy vấn đơn hàng của khách hàng theo ngày
        $query = Oders::with(['customer', 'payment', 'orderDetails.product'])
            ->where('cus_id', $id);

        // Lọc theo ngày nếu có
        if ($date) {
            $query->whereDate('or_date', Carbon::parse($date)->format('Y-m-d'));
        }

        // Sắp xếp theo thời gian tạo mới nhất
        $orders = $query->orderBy('created_at', 'desc')->get();

        // Format lại dữ liệu đơn hàng
        $formattedOrders = $orders->map(function ($order) {
            // Format chi tiết sản phẩm trong đơn hàng
            $items = $order->orderDetails->map(function ($detail) {
                return [
                    'product_name' => $detail->product->p_name,
                    'quantity' => $detail->quantity, 
                    'price' => $detail->product->p_selling,
                    'discount' => $detail->discount,
                    'or_discount' => $detail->order->or_discount
                ];
            });

            // Trả về thông tin đơn hàng
            return [
                'id' => $order->id,
                'or_date' => $order->or_date,
                'or_total' => $order->or_total,
                'or_status' => json_decode($order->or_status, true),
                'or_ship' => $order->or_ship,
                'or_note' => $order->or_note,
                'cus_id' => $order->cus_id,
                'pa_id' => $order->pa_id,
                'voucher_code' => $order->voucher_code,
                'or_discount' => $order->or_discount,
                'items' => $items
            ];
        });
        

        // Trả về kết quả
        return response()->json([
            'success' => true,
            'data' => $formattedOrders
        ]);
    }

    public function apiCreateOrder(Request $request)
    {  
        try {
            $paymentMethod = $request->paymentMethod;
            $customer_id = $request->customer_id;
            $products = $request->products;
            $voucher_code = $request->voucher_code ?? null;
            $discount = $request->discount ?? 0;
            $shippingFee = $request->shippingFee;
            $note = $request->note ?? '';
            
            $totalPrice = 0;
            foreach ($products as $product) {
                $totalPrice += $product['selling_price'] * $product['quantity'];
            }
            $totalPrice += $shippingFee;
            
            // Tạo đơn hàng mới
            $order = new Oders();
            $order->cus_id = $customer_id;
            $order->pa_id = $paymentMethod === 'cod' ? 1 : 2; // 1: COD, 2: Online
            $order->or_total = $totalPrice;
            $order->or_note = $note;
            $order->voucher_code = $voucher_code;
            $order->or_discount = $discount;
            $order->or_ship = $shippingFee;
            $order->or_date = now();
            $order->or_status = json_encode(['1' => 'Đang chờ xử lý']);
            $order->save();

            // Tạo chi tiết đơn hàng
            foreach ($products as $product) {
                $detail = new DetailOrders();
                $detail->or_id = $order->id;
                $detail->p_id = $product['id'];
                $detail->quantity = $product['quantity'];
                $detail->total = $product['selling_price'] * $product['quantity'];
                $detail->discount = $product['discount'] ?? 0;
                $detail->save();
            }
            
            $orders = Oders::with(['customer', 'payment', 'orderDetails'])->find($order->id);

            foreach ($orders->orderDetails as $detail) {
                $product = Products::with('images')->find($detail->p_id);
                $detail->images = $product->images;
            }
            
            return response()->json(['orders' => $orders, 'message' => 'Đặt hàng thành công']);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
     public function apiDetailOrders($id)
     {

     }

}
