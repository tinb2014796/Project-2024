<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;   


class Customer extends Model
{
    use HasFactory, HasApiTokens;
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
        'province_id',
        'district_id',
        'ward_code',
        'cus_image',
        'cus_points',
    ];
    public function orders()
    {
        return $this->hasMany(Oders::class, 'cus_id', 'id');
    }
    public function saleOffs()
    {
        return $this->hasMany(SaleOff::class, 'cus_id', 'id');
    }
    
}
