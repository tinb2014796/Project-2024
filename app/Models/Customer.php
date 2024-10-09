<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Customer extends Model
{
    use HasFactory;
    protected $table = 'customers';
    protected $fillable = [
        'cus_name',
        'cus_familyname',
        'cus_sdt',
        'cus_email',
        'cus_password',
        'cus_sex',
        'cus_birthday',
        'cus_address',
        'cus_image',
        'cus_points',
    ];

}