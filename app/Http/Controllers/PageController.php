<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Brand;
use App\Models\SaleOff;
use App\Models\ProductS;
use App\Models\Oders;
use App\Models\DetailOrders;
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
        $product = ProductS::with(['images', 'rating.customer'])->find($id);
        $categories = Category::all();
        $brands = Brand::all();
        $saleOffs = SaleOff::all();
        $detailOrders = DetailOrders::whereHas('order', function($query) {
            $query->where('status', '=', '5');
        })->with('order')->where('p_id', $id)->get();
        $totalSold = $detailOrders->sum('quantity');
        // Tính điểm đánh giá trung bình
        $averageRating = $product->rating()->avg('ra_score') ?? 0;
        $product->average_rating = round($averageRating, 1);
        
        // Lấy tất cả đánh giá kèm thông tin khách hàng
        $ratings = $product->rating()->with(['customer:id,cus_familyname,cus_name'])->get();
        
        return Inertia::render('Admin/DetailProduct', compact('product', 'categories', 'brands', 'saleOffs', 'ratings', 'totalSold'));
    }
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function orders()
    {
        $orders = Oders::with('customer', 'payment', 'orderDetails')->get();
        foreach($orders as $order) {
            $order->or_status = json_decode($order->or_status);
        }
        return Inertia::render('Admin/Orders', compact('orders'));
    }
    
    public function customers()
    {
        return Inertia::render('Admin/Customers');
    }
    public function saleOff()
    {
        $saleOffs = SaleOff::with('products')->get();
        $products = ProductS::all();
        return Inertia::render('Admin/SaleOff', compact('saleOffs', 'products'));
    }
}
