<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleOff extends Model
{
    use HasFactory;
    protected $table = 'sale_offs';
    protected $fillable = ['p_id', 'sale_off_price', 'start_date', 'end_date'];
}
