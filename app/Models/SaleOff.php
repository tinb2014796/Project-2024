<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Products;
use App\Models\Oders;
use App\Models\Customer;

class SaleOff extends Model
{
    use HasFactory;
    protected $table = 'sale_offs';
    protected $fillable = [
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
        'cus_id',
        'p_id'
    ];
    
    public function products()
    {
        return $this->belongsTo(Products::class, 'p_id', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cus_id', 'id');
    }
    public function order()
    {
        return $this->hasMany(Oders::class, 'voucher_code', 's_code');
    }
}
