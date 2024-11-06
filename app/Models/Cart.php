<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Products;


class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $fillable = ['id', 'customer_id', 'product_id', 'quantity', 'discount'];
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id', 'id')->with('images','saleOff');
    }
    public function cart(){
        return $this->belongsTo(Customer::class, 'customer_id', 'id')->belongsTo(Products::class, 'product_id', 'id');
    }
    
}
