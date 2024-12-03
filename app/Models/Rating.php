<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Customer;

class Rating extends Model
{
    use HasFactory;
    
    protected $table = 'ratings';
    protected $fillable = [
        'ra_score',
        'ra_comment', 
        'ra_reply',
        'ra_cus_reply',
        'p_id',
        'cus_id'
    ];

    // Relationship với Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'p_id');
    }

    // Relationship với Customer 
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cus_id');
    }
    
}
