<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'pays';

    protected $fillable = [
        'pa_type',
        'pa_status'
    ];

    public function orders()
    {
        return $this->hasMany(Oders::class, 'pa_id', 'id');
    }
}
