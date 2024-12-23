<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Models\Oders;
use App\Models\Products;
use App\Models\SaleOff;
use App\Models\DetailOrders;

class CustomerController extends Controller
{
    public function signin(Request $request)
    {
        $customer = Customer::where('cus_email', $request->cus_email)->first();
        
        if (!$customer) {
            return redirect()->back()->withErrors(['error' => 'Email không tồn tại']);
        }

        if (!password_verify($request->cus_password, $customer->cus_password)) {
            return redirect()->back()->withErrors(['error' => 'Mật khẩu không đúng']);
        }
        
        $request->session()->put('customer', $customer);
        return redirect()->route('user.home')->with('success', 'Đăng nhập thành công');
    }

    public function logout(Request $request)
    {
        $request->session()->forget('customer');
        return redirect()->route('user.home');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createCustomer(Request $request)
    {
        // Kiểm tra xem email đã tồn tại chưa
        $existingCustomer = Customer::where('cus_email', $request->cus_email)->first();
        
        if ($existingCustomer) {
            // Nếu email đã tồn tại, không cho tạo tài khoản mới
            return redirect()->back()->withErrors(['cus_email' => 'Email đã tồn tại']);
        }

        // Kiểm tra xem số điện thoại đã tồn tại chưa
        $existingPhone = Customer::where('cus_sdt', $request->cus_sdt)->first();

        if ($existingPhone) {
            // Nếu số điện thoại đã tồn tại, không cho tạo tài khoản mới
            return redirect()->back()->withErrors(['cus_sdt' => 'Số điện thoại đã tồn tại']);
        }

        // Mã hóa mật khẩu trước khi lưu
        $hashedPassword = bcrypt($request->cus_password);

        // Tạo token ngẫu nhiên
        $token = bin2hex(random_bytes(32));

        // Nếu email và số điện thoại chưa tồn tại, tạo khách hàng mới
        $customers = Customer::create([
            'cus_familyname' => $request->cus_familyname ?? '',
            'cus_name' => $request->cus_name ?? '',
            'cus_sdt' => $request->cus_sdt ?? '',
            'cus_email' => $request->cus_email ?? '',
            'cus_sex' => $request->cus_sex ?? '',
            'cus_birthday' => $request->cus_birthday ?? '',
            'cus_password' => $hashedPassword,
            'cus_address' => $request->cus_address ?? '',
            'province_id' => $request->province_id ?? '',
            'district_id' => $request->district_id ?? '',
            'ward_code' => $request->ward_code ?? '',
            'cus_image' => $request->cus_image ?? '',
            'cus_points' => $request->cus_points ?? 0,
            'remember_token' => $token
        ]);

        return Inertia::render('User/Signin');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function updateImageCustomer(Request $request, $id)
    {
        $customer = Customer::find($id);
        $file = $request->file('cus_image');
        $file_name = time().'_'.$file->getClientOriginalName(); 
        $file->move(public_path('images'), $file_name);
        $imageUrl = asset('images/'.$file_name);
        $customer->cus_image = $imageUrl;
        $customer->save();
        return redirect()->route('user.customer');
    }

    /**
     * Display the specified resource.
     */
    public function information(Request $request)
    {
        $customer = $request->session()->get('customer');
        $customer = Customer::with('saleOffs')->find($customer->id);
    
        return Inertia::render('User/Customer', ['customer' => $customer]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function getCustomer($id)
    {
        $customer = Customer::find($id);
        return Inertia::render('User/Customer', ['customer' => $customer]);
    }

    public function updateCustomer(Request $request, $id)
    {
        $customer = Customer::find($id);
        $customer->update([
            'cus_familyname' => $request->cus_familyname,
            'cus_name' => $request->cus_name,
            'cus_sex' => $request->cus_sex,
            'cus_birthday' => $request->cus_birthday,
            'cus_sdt' => $request->cus_sdt,
            'cus_address' => $request->cus_address,
            'province_id' => $request->province_id,
            'district_id' => $request->district_id,
            'ward_code' => $request->ward_code,
            

        ]);
        $customer->save();
        return Inertia::render('User/Customer', ['customer' => $customer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateAddress(Request $request, Customer $customer)
    {
        $customer = $request->customer_id;
        $customer = Customer::find($customer);
        $customer->cus_address = $request->address;
        $customer->province_id = $request->province_id;
        $customer->district_id = $request->district_id;
        $customer->ward_code = $request->ward_code;
        $customer->cus_sdt = $request->phone;
        $customer->save();
        return redirect()->route('user.cart');

    }
    public function returnAddress(Request $request, Customer $customer)
    {
        $customer = $request->customer_id;
        $customer = Customer::find($customer);
        $customer->cus_address = $request->address;
        $customer->province_id = $request->province_id;
        $customer->district_id = $request->district_id;
        $customer->ward_code = $request->ward_code;
        $customer->cus_sdt = $request->phone;
        $customer->save();
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function ListCustomers()
    {
        $customers = Customer::all();
        $customers = Customer::with('orders')->get();
        
        return Inertia::render('Admin/Customer', ['customers' => $customers]);

    }

    public function customerChart()
    {
        $customers = Customer::with(['orders' => function($query) {
            $query->where('status', 5) // Chỉ lấy đơn hàng đã hoàn thành
                  ->with('orderDetails');
        }])->get();
        $customers = $customers->map(function($customer) {
            $order = $customer->orders;
            $totalSpent = $customer->orders->sum(function($order) {
                $orderDetails = $order->orderDetails;
                $detailsDiscount = $orderDetails->sum('discount');
                return $order->or_total - $order->or_discount - $detailsDiscount;
            });
            
            return [
                'id' => $customer->id,
                'name' => $customer->cus_name,
                'total_spent' => $totalSpent,
                'orders' => $customer->orders // Thêm số lượng đơn hàng
            ];
        });
        
        return Inertia::render('Admin/ChildAdmin/ChartCustomer', [
            'customers' => $customers
        ]);
    }

    public function DetailCustomer($id)
    {
        $customer = Customer::with('orders')->find($id);
        return Inertia::render('Admin/DetailCustomer', ['customer' => $customer]);
    }

    public function tradePoint(Request $request)
    {
        $customer = $request->session()->get('customer');
        $customer = Customer::with(['saleOffs' => function($query) {
            $query->whereDoesntHave('order'); // Chỉ lấy những voucher chưa được sử dụng trong đơn hàng nào
        }])->find($customer->id);
        return Inertia::render('User/TradePoint', ['customer' => $customer]);
    }
}
