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
            'pa_type' => 'Thanh toán khi nhận hàng',
            'pa_status' => 0,
        ]);
        DB::table('pays')->insert([
            'pa_type' => 'Thanh toán qua ngân hàng',
            'pa_status' => 1,
        ]);
        DB::table('pays')->insert([
            'pa_type' => 'Thanh toán qua ví điện tử',
            'pa_status' => 1,
        ]);
    }
}
