<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ImageProduct extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('images')->insert([
            'i_name' => 'Sản phẩm 1', //duong dan anh
            'p_id' => 1,
        ]);
    }
}
