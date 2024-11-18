<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Oders;
use App\Models\User;
use App\Models\Customer;
use App\Models\DetailOrders;  
use App\Models\Products;
class HomeController extends Controller
{
    public function index()
    {
        $orders = Oders::all();
        $details = DetailOrders::all();
        $users = User::all();
        $customers = Customer::all(); 
        $products = Products::all();

        // Tính doanh thu theo ngày
        $dailyRevenue = $orders->groupBy(function($order) {
            return \Carbon\Carbon::parse($order->created_at)->format('Y-m-d');
        })->map(function($dayOrders) use ($details) {
            return $dayOrders->sum(function($order) use ($details) {
                $orderDetails = $details->where('or_id', $order->id);
                $detailsDiscount = $orderDetails->sum('discount');
                return $order->or_total - $order->or_discount - $detailsDiscount;
            });
        });

        // Tính doanh thu theo tuần
        $weeklyRevenue = $orders->groupBy(function($order) {
            return \Carbon\Carbon::parse($order->created_at)->format('W');
        })->map(function($weekOrders) use ($details) {
            return $weekOrders->sum(function($order) use ($details) {
                $orderDetails = $details->where('or_id', $order->id);
                $detailsDiscount = $orderDetails->sum('discount');
                return $order->or_total - $order->or_discount - $detailsDiscount;
            });
        });

        // Tính doanh thu theo tháng
        $monthlyRevenue = $orders->groupBy(function($order) {
            return \Carbon\Carbon::parse($order->created_at)->format('m');
        })->map(function($monthOrders) use ($details) {
            return $monthOrders->sum(function($order) use ($details) {
                $orderDetails = $details->where('or_id', $order->id);
                $detailsDiscount = $orderDetails->sum('discount');
                return $order->or_total - $order->or_discount - $detailsDiscount;
            });
        });

        // Tính doanh thu theo năm
        $yearlyRevenue = $orders->groupBy(function($order) {
            return \Carbon\Carbon::parse($order->created_at)->format('Y');
        })->map(function($yearOrders) use ($details) {
            return $yearOrders->sum(function($order) use ($details) {
                $orderDetails = $details->where('or_id', $order->id);
                $detailsDiscount = $orderDetails->sum('discount');
                return $order->or_total - $order->or_discount - $detailsDiscount;
            });
        });

        return Inertia::render('Admin/Home', [
            'orders' => $orders,
            'details' => $details,
            'users' => $users,
            'customers' => $customers,
            'products' => $products,
            'dailyRevenue' => $dailyRevenue,
            'weeklyRevenue' => $weeklyRevenue,
            'monthlyRevenue' => $monthlyRevenue, 
            'yearlyRevenue' => $yearlyRevenue
        ]);   
    }
}
