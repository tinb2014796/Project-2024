<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Oders;
use App\Models\User;
use App\Models\Customer;
use App\Models\DetailOrders;  
class HomeController extends Controller
{
    public function index()
    {
        $orders = Oders::all();
        $details = DetailOrders::all();
        $users = User::all();
        $customers = Customer::all();
        return Inertia::render('Admin/Home', [
            'orders' => $orders,
            'details' => $details,
            'users' => $users,
            'customers' => $customers
        ]);   
    }
}
