<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        's_id',
    ];

    public function images()
    {
        return $this->hasMany(ImageProduct::class, 'p_id', 'id');
    }
}
