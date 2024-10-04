<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
            'b_name' => 'Sunhouse',
            'b_sdt' => '0909090909',

        ]);
        DB::table('brands')->insert([
            'b_name' => 'Mixi',
            'b_sdt' => '0909090911',

        ]);
        DB::table('brands')->insert([
            'b_name' => 'Brb',
            'b_sdt' => '0909090933',
        ]);
    }
}
