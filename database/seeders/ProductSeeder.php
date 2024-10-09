<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            'p_name' => 'Sản phẩm 1',
            'p_price' => 100000,
            'p_description' => 'Sản phẩm 1',
            'p_status' => 1,
            'c_id' => 1,
            'b_id' => 1,
            's_id' => 1,
        ]);
    }
}
