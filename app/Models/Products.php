<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SaleOff;
use App\Models\ImageProduct;
use App\Models\Category;
use App\Models\DetailOrders;
use App\Models\Rating;

class Products extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'p_name',
        'p_selling',
        'p_quantity',
        'p_image',
        'p_description',
        'p_purchase',
        'c_id',
        'b_id',
    ];

    public function images()
    {
        return $this->hasMany(ImageProduct::class, 'p_id', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'c_id', 'id');
    }
    public function saleOff()
    {
        return $this->hasMany(SaleOff::class, 'p_id', 'id')
                    ->where('s_end', '>', now());
    }
    public function orderDetails()
    {
        return $this->hasMany(DetailOrders::class, 'p_id', 'id');
    }
    public function rating()
    {
        return $this->hasMany(Rating::class, 'p_id', 'id');
    }
}
