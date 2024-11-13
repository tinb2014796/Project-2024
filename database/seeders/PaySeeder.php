<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pays')->insert([
            [
                'id' => 1,
                'pa_type' => 'Thanh toán khi nhận hàng', 
                'pa_status' => '0',
                'created_at' => NULL,
                'updated_at' => NULL
            ],
            [
                'id' => 2,
                'pa_type' => 'Thanh toán qua ngân hàng',
                'pa_status' => '1', 
                'created_at' => NULL,
                'updated_at' => NULL
            ],
            [
                'id' => 3,
                'pa_type' => 'Thanh toán qua ví điện tử',
                'pa_status' => '1',
                'created_at' => NULL,
                'updated_at' => NULL
            ]
        ]);
    }
}
