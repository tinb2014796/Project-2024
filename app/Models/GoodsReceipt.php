<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\DetailGoodsReceipt;
use App\Models\Products;

class GoodsReceipt extends Model
{
    use HasFactory;
    protected $fillable = [
        'import_date',
        'brand_id'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function goodsReceiptDetails()
    {
        return $this->hasMany(DetailGoodsReceipt::class);
    }
}
