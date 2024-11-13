<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\Customer;
use App\Http\Middleware\UserAuthMiddleware;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Brand;
use App\Models\SaleOff;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class UserController extends Controller
{
    public function home(Request $request)
    {
        $customer = $request->session()->get('customer');
        $products = Products::with('images','category','saleOff')->get();
        $categories = Category::all();
        
        // Lấy các chương trình khuyến mãi còn hiệu lực
        $saleOffs = SaleOff::where('s_end', '>', now())->get();

        if($customer && $customer->role === 'admin') {
            return redirect('/admin');
        }

        if($customer){
            return Inertia::render('User/Home', compact('products','customer','categories','saleOffs'));
        }
        return Inertia::render('User/Home', compact('products','categories','saleOffs'));
    }
    public function detailProduct($id)
    {
        $product = Products::with('images','saleOff','orderDetails.order')->find($id);
        
        $categories = Category::all();
        $brands = Brand::all();
        
        // Lấy các chương trình khuyến mãi còn hiệu lực cho sản phẩm này
        return Inertia::render('User/DetailProduct', compact('product', 'categories', 'brands'));
    }   
    public function cart()
    {
        $carts = Cart::with('customer','product')->get();
        $products = Products::with('images','category','saleOff')->get();

        return Inertia::render('User/Cart', compact('carts','products'));

    }   
    public function repay()
    {
        return Inertia::render('User/Repay');
    }
    public function report()
    {
        return Inertia::render('User/Report');
    }
    public function pay(Request $request)
    {
        $customer = $request->customer_id;
        $customer = Customer::find($customer);
        $cart = $request->all();
        $products = Products::with('images')->with(['saleOff' => function($query) {
            $query->where('s_end', '>', now());
        }])->get();
        return Inertia::render('User/Pay', compact('cart', 'products','customer'));

    }
    public function user()
    {
        return Inertia::render('User/User');
    }
    public function signup()
    {
        return Inertia::render('User/Signup');
    }
    public function signin()
    {    
        $user = session()->get('user');
        if($user && $user->role !== 'admin') {
            return redirect('user.home');
        }
        return Inertia::render('User/Signin');
    }
    
    public function adminLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || $user->role !== 'admin') {
            return back()->withErrors([
                'email' => 'Thông tin đăng nhập không chính xác'
            ]);
        }

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            $request->session()->regenerate();
            session(['user' => Auth::user()]);
            return redirect()->route('admin.home');
        }

        return back()->withErrors([
            'password' => 'Mật khẩu không chính xác'
        ]);
    }
    public function adminSignin()
    {
        return Inertia::render('Admin/Signin');
    }


}
