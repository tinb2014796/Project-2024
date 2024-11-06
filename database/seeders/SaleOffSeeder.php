<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SaleOffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sale_offs')->insert([
            's_percent' => 10,
            's_name' => 'Khuyến mãi 10%',
            's_value_min' => 1000000,
            's_value_max' => 2000000,
            's_start' => '2024-10-01',
            's_end' => '2024-10-30',
            
        ]);
        DB::table('sale_offs')->insert([
            's_percent' => 20,
            's_name' => 'Khuyến mãi 20%',
            's_value_min' => 1000000,
            's_value_max' => 2000000,
            's_start' => '2024-10-01',
            's_end' => '2024-10-30',
        ]);
        DB::table('sale_offs')->insert([
            's_percent' => 30,
            's_name' => 'Khuyến mãi 30%',
            's_value_min' => 1000000,
            's_value_max' => 2000000,
            's_start' => '2024-10-01',
            's_end' => '2024-10-30',
        ]);
    }
}
