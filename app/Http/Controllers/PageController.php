<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Brand;
use App\Models\SaleOff;
use App\Models\ProductS;
use App\Models\Oders;
class PageController extends Controller
{
    public function products()
    {
        $categories = Category::all();
        $brands = Brand::all();
        $saleOffs = SaleOff::all();
        $products = ProductS::with('images')->get();
        return Inertia::render('Admin/Products', compact('categories', 'brands', 'saleOffs', 'products'));
    }

    public function detailProduct($id)
    {
        $product = ProductS::with('images')->find($id);
        $categories = Category::all();
        $brands = Brand::all();
        $saleOffs = SaleOff::all();
        return Inertia::render('Admin/DetailProduct', compact('product', 'categories', 'brands', 'saleOffs'));
    }
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function orders()
    {
        $orders = Oders::with('customer', 'payment', 'orderDetails')->get();
        foreach ($orders as $order) {
            $order->tracking_id ='LDV9P8';
        }

        return Inertia::render('Admin/Orders', compact('orders'));
    }
    public function customers()
    {
        return Inertia::render('Admin/Customers');
    }
    public function saleOff()
    {
        $saleOffs = SaleOff::all();
        return Inertia::render('Admin/SaleOff', compact('saleOffs'));
    }
}
