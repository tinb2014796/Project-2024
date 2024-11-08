<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

class CustomerController extends Controller
{
    public function signin(Request $request)
    {
    
        $customer = Customer::where('cus_email', $request->cus_email)->first();
        if ($customer && $customer->cus_password === $request->cus_password) {
            $request->session()->put('customer', $customer);
           return redirect()->route('user.home')->with('success', 'Đăng nhập thành công');
        } 
        return  Inertia::render('User/Signin',['error' => 'Email hoặc mật khẩu không đúng']);
        
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

        // Nếu email chưa tồn tại, tạo khách hàng mới
        $customers = Customer::create([
            'cus_familyname' => $request->cus_familyname ?? '',
            'cus_name' => $request->cus_name ?? '',
            'cus_sdt' => $request->cus_sdt ?? '',
            'cus_email' => $request->cus_email ?? '',
            'cus_sex' => $request->cus_sex ?? '',
            'cus_birthday' => $request->cus_birthday ?? '',
            'cus_password' => $request->cus_password ?? '',
            'cus_address' => $request->cus_address ?? '',
            'province_id' => $request->province_id ?? '',
            'district_id' => $request->district_id ?? '',
            'ward_code' => $request->ward_code ?? '',
            'cus_image' => $request->cus_image ?? '',
            'cus_points' => $request->cus_points ?? 0,
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
        $customer = Customer::find($customer->id);
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
}
