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
use App\Models\DetailOrders;

class UserController extends Controller
{
    public function home(Request $request)
    {
        $customer = $request->session()->get('customer');
        $products = Products::with('images','category','saleOff')->get();
        $categories = Category::all();
        $carts = [];
        
        // Lấy các chương trình khuyến mãi còn hiệu lực
        $saleOffs = SaleOff::where('s_end', '>', now())->get();

        if($customer && $customer->role === 'admin') {
            return redirect('/admin');
        }

        if($customer){
            $carts = Cart::with('customer','product')
                        ->where('customer_id', $customer->id)
                        ->get();
            return Inertia::render('User/Home', compact('products','customer','categories','saleOffs', 'carts'));
        }
        return Inertia::render('User/Home', compact('products','categories','saleOffs', 'carts'));
    }
    public function detailProduct($id)
    {
        $customer = session()->get('customer');
        $product = Products::with(['images', 'saleOff', 'orderDetails.order', 'rating.customer'])->find($id);
        $detailOrders = DetailOrders::whereHas('order', function($query) {
            $query->where('status', '=', '5');
        })->with('order')->where('p_id', $id)->get();
        $totalSold = $detailOrders->sum('quantity');
        $categories = Category::all();
        $brands = Brand::all();
        $carts = [];
        
        if($customer) {
            $carts = Cart::with('customer','product')
                        ->where('customer_id', $customer->id)
                        ->get();
        }
        
        // Tính điểm đánh giá trung bình
        $averageRating = $product->rating()->avg('ra_score') ?? 0;
        $product->average_rating = round($averageRating, 1);
        
        // Lấy tất cả đánh giá kèm thông tin khách hàng
        $ratings = $product->rating()->with(['customer:id,cus_familyname,cus_name'])->get();
        
        return Inertia::render('User/DetailProduct', compact('product', 'categories', 'brands', 'ratings', 'detailOrders', 'totalSold', 'carts'));
    }
    public function cart()
    {
        $customer = session()->get('customer');
        if(!$customer) {
            return redirect()->route('signin');
        }
        
        $carts = Cart::with('customer','product')
                    ->where('customer_id', $customer->id)
                    ->get();
        $products = Products::with('images','category','saleOff')->get();

        return Inertia::render('User/Cart', compact('carts','products'));

    }   
    public function repay()
    {
        $customer = session()->get('customer');
        if(!$customer) {
            return redirect()->route('signin');
        }
        
        $carts = Cart::with('customer','product')
                    ->where('customer_id', $customer->id)
                    ->get();
        return Inertia::render('User/Repay', compact('carts'));
    }
    public function report()
    {
        $customer = session()->get('customer');
        if(!$customer) {
            return redirect()->route('signin');
        }
        
        $carts = Cart::with('customer','product')
                    ->where('customer_id', $customer->id)
                    ->get();
        return Inertia::render('User/Report', compact('carts'));
    }
    public function pay(Request $request)
    {
        $customer = $request->customer_id;
        $customer = Customer::find($customer);
        $cart = $request->all();
        $saleOffs = SaleOff::where('s_end', '>', now())->get();
        $products = Products::with('images')->with(['saleOff' => function($query) {
            $query->where('s_end', '>', now());
        }])->get();
        
        if(!$customer) {
            return redirect()->route('signin');
        }
        
        $carts = Cart::with('customer','product')
                    ->where('customer_id', $customer->id)
                    ->get();
        return Inertia::render('User/Pay', compact('cart', 'products','customer','saleOffs', 'carts'));

    }
    public function user()
    {
        $customer = session()->get('customer');
        if(!$customer) {
            return redirect()->route('signin');
        }
        
        $carts = Cart::with('customer','product')
                    ->where('customer_id', $customer->id)
                    ->get();
        return Inertia::render('User/User', compact('carts'));
    }
    public function signup()
    {
        $carts = [];
        return Inertia::render('User/Signup', compact('carts'));
    }
    public function signin()
    {    
        $user = session()->get('user');
        $carts = [];
        if($user && $user->role !== 'admin') {
            return redirect('user.home');
        }
        return Inertia::render('User/Signin', compact('carts'));
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
