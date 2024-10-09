<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'c_name' => 'noi',
            'c_image' => 'noi.jpg',
        ]);
        DB::table('categories')->insert([
            'c_name' => 'Ly',
            'c_image' => 'ly.jpg',
        ]);
        DB::table('categories')->insert([
            'c_name' => 'Chen',
            'c_image' => 'chen.jpg',
        ]);
    }
}
