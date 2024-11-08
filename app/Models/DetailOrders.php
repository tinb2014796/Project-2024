<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;

class DetailOrders extends Model
{
    use HasFactory;
    protected $table = 'detail_orders';
    protected $fillable = [
        'or_id',
        'p_id',
        'quantity',
        'total',
        'discount'
    ];
    public function product()
    {
        return $this->belongsTo(Products::class, 'p_id')->with('images');
    }
}
