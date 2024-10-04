<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Brand;
use App\Models\SaleOff;
use App\Models\ProductS;
class PageController extends Controller
{
    public function products()
    {
        $categories = Category::all();
        $brands = Brand::all();
        $saleOffs = SaleOff::all();
        $products = ProductS::all();
        return Inertia::render('Admin/Products', compact('categories', 'brands', 'saleOffs', 'products'));
    }
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function orders()
    {
        return Inertia::render('Admin/Orders');
    }
    public function customers()
    {
        return Inertia::render('Admin/Customers');
    }
//     public function detailProduct()
//     {
//         return Inertia::render('Auth/DetailProduct');
//     }   
//     public function cart()
//     {
//         return Inertia::render('Auth/Cart');
//     }   
//     public function repay()
//     {
//         return Inertia::render('Auth/Repay');
//     }
//     public function report()
//     {
//         return Inertia::render('Auth/Report');
//     }
//     public function pay()
//     {
//         return Inertia::render('Auth/Pay');
//     }
//     public function user()
//     {
//         return Inertia::render('Auth/User');
//     }
}
