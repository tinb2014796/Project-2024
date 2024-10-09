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

class UserController extends Controller
{
    public function home(Request $request)
    {
        $customer = $request->session()->get('customer');
        $products = Products::with('images')->get();
        if($customer){
           
            return Inertia::render('User/Home', compact('products','customer'));
        }
        return Inertia::render('User/Home', compact('products'));
    }
    public function detailProduct($id)
    {
        $product = Products::with('images')->find($id);
        $categories = Category::all();
        $brands = Brand::all();
        $saleOffs = SaleOff::all();
        return Inertia::render('User/DetailProduct', compact('product','categories','brands'));

    }   
    public function cart()
    {
        $carts = Cart::with('customer','product')->get();
        return Inertia::render('User/Cart', compact('carts'));

    }   
    public function repay()
    {
        return Inertia::render('User/Repay');
    }
    public function report()
    {
        return Inertia::render('User/Report');
    }
    public function pay()
    {
        return Inertia::render('User/Pay');
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
        return Inertia::render('User/Signin');
    }

}
