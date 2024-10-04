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
            's_start' => '2024-10-01',
            's_end' => '2024-10-03',
        ]);
        DB::table('sale_offs')->insert([
            's_percent' => 20,
            's_start' => '2024-10-01',
            's_end' => '2024-10-03',
        ]);
        DB::table('sale_offs')->insert([
            's_percent' => 30,
            's_start' => '2024-10-01',
            's_end' => '2024-10-03',
        ]);
    }
}
