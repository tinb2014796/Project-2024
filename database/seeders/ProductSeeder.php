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
            'p_name'=> 'Máy Sinh Tố',
            'p_selling'=> 100000,
            'p_quantity'=> 10,
            'p_image'=> '1729180212_bia.png',
            'p_description'=> 'Máy Sinh Tố',
            'p_purchase'=> 100000,
            'c_id'=> 1,
            'b_id'=> 1,
            's_id'=> 1,
        ]);
        DB::table('products')->insert([
            'p_name'=> 'Chảo cạn Inox 5 đáy',
            'p_selling'=> 800000,
            'p_quantity'=> 10,
            'p_image'=> '1729181481_Artboard 1 copy 10(1).png',
            'p_description'=> 'Chảo cạn Inox 5 đáy',
            'p_purchase'=> 800000,
            'c_id'=> 2,
            'b_id'=> 1,
            's_id'=> 1,
        ]);
        
    }
}
