<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DetailOrders;    
use App\Models\Customer;
use App\Models\Payment;

class Oders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = ['or_date', 'or_total', 'or_status' , 'or_ship', 'or_note', 'cus_id', 'pa_id'];
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cus_id', 'id');
    }
    public function payment()
    {
        return $this->belongsTo(Payment::class, 'pa_id', 'id');
    }
    public function orderDetails()
    {
        return $this->hasMany(DetailOrders::class, 'or_id', 'id')->join('products', 'products.id', '=', 'detail_orders.p_id');
    }
    public function products()
    {
        return $this->hasMany(Products::class, 'id', 'p_id');
    }
    public function images()
    {
        return $this->hasMany(ImageProduct::class, 'p_id', 'id');
    }
    
}
