<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;

class SaleOff extends Model
{
    use HasFactory;
    protected $table = 'sale_offs';
    protected $fillable = [
        'id',
        's_name',
        's_percent',
        's_value_min',
        's_value_max',
        's_start',
        's_end',
        's_type',
        's_catalory',
        's_code',
        's_quantity',
        'p_id'
    ];
    
    public function products()
    {
        return $this->belongsTo(Products::class, 'p_id', 'id');
    }
    
}
