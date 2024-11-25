<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->all();
        $customer = Customer::where('cus_email', $data['email'])->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Không tìm thấy khách hàng',
                'status' => 404
            ], 404);
        }


        if ($customer->cus_password && !$data['password']) {
            return response()->json([
                'message' => 'Vui lòng nhập mật khẩu',
                'requires_password' => true,
                'status' => 403,
                'data' => [
                    'requires_password' => true,
                    'message' => 'Vui lòng nhập mật khẩu'
                ]
            ], 403);
        }

        if ($customer->cus_password && !Hash::check($data['password'], $customer->cus_password)) {
            return response()->json([
                'message' => 'Mật khẩu không đúng',
                'status' => 401,
                'data' => [
                    'message' => 'Mật khẩu không đúng'
                ]
            ], 401);
        }


        return response()->json([
            'customer' => $customer,
            'message' => 'Đăng nhập thành công'
        ]);
        
    }


    public function register(Request $request ,Response $res)
    {
        $data = $request->all();
        if(Customer::where('cus_email', $data['email'])->first()){
            return response()->json([
                'message' => 'Email đã tồn tại'
            ], 400);
        }
        $customer = Customer::create([
            'cus_name' => $data['name'],
            'cus_familyname' => $data['familyname'], 
            'cus_sdt' => $data['phone'],
            'cus_email' => $data['email'],
            'cus_password' => bcrypt($data['password']),
            'cus_sex' => $data['sex'],
            'cus_birthday' => $data['birthday'],
            'cus_address' => $data['address'],
            'province_id' => $data['province_id'],
            'district_id' => $data['district_id'], 
            'ward_code' => $data['ward_code'],
            'cus_image' => null,
            'cus_points' => 0
        ]);

        return response()->json([
            'customer' => $customer,
        ]);
    }

    public function logout(Request $request)
    {
        $customer = $request->user();

        if ($customer) {
            $customer->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logout successfully'
            ]);
        }

        return response('', 204);
    }

    public function checkLoginStatus(Request $request)
    {
        $customer = $request->customer();

        $status = $customer->currentAccessToken()->delete();
        if($status) {
            return response()->json([
                'logged_in' => true,
                'customer' => $customer
            ]);
        }

        return response()->json([
            'logged_in' => false
        ]);
    }

    public function getCurrentUser(Request $request)
    {
        $token = $request->bearerToken();

        $customer = Customer::whereHas('tokens', function ($query) use ($token) {
            $query->where('token', hash('sha256', $token));
        })->first();

        return response()->json([
            'valid' => $customer ? true : false,
            'customer' => $customer
        ]);
    }   

    public function verifyToken(Request $request)
    {
        $token = $request->input('token');
        $customer = Customer::whereHas('tokens', function ($query) use ($token) {
            $query->where('token', hash('sha256', $token));
        })->first();
        
        return response()->json([
            'valid' => $customer ? true : false,
            'customer' => $customer
        ]);
    }
}