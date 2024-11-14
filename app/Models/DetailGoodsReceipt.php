<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GoodsReceipt;
use App\Models\Products;


class DetailGoodsReceipt extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantity_import',
        'quantity_back',
        'price',
        'status',
        'note',
        'is_added',
        'goods_receipt_id',
        'product_id'
    ];

    public function goodsReceipt()
    {
        return $this->belongsTo(GoodsReceipt::class);
    }

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
