<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::create([
            'b_name' => 'Sunhouse',
            'b_sdt' => '0909090911',
        ]);
        Brand::create([
            'b_name' => 'Comet', 
            'b_sdt' => '0909090912',
        ]);
        Brand::create([
            'b_name' => 'Sharp',
            'b_sdt' => '0909090913',
        ]);
        Brand::create([
            'b_name' => 'Fuji',
            'b_sdt' => '0909090914',
        ]);
        Brand::create([
            'b_name' => 'Kangaroo',
            'b_sdt' => '0909090915',
        ]);
        Brand::create([
            'b_name' => 'Tefal',
            'b_sdt' => '0909090916',
        ]);
        Brand::create([
            'b_name' => 'Philips',
            'b_sdt' => '0909090917',
        ]);
        Brand::create([
            'b_name' => 'Goldsun',
            'b_sdt' => '0909090918',
        ]);
        Brand::create([
            'b_name' => 'Toshiba',
            'b_sdt' => '0909090919',
        ]);
        Brand::create([
            'b_name' => 'Hotwell',
            'b_sdt' => '0909090920',
        ]);
        Brand::create([
            'b_name' => 'Điện Quang',
            'b_sdt' => '0909090921',
        ]);
        Brand::create([
            'b_name' => 'Icore',
            'b_sdt' => '0909090922',
        ]);
        Brand::create([
            'b_name' => 'Pack&Go',
            'b_sdt' => '0909090923',
        ]);
        Brand::create([
            'b_name' => 'Unie',
            'b_sdt' => '0909090924',
        ]);
        Brand::create([
            'b_name' => 'Benny',
            'b_sdt' => '0909090925',
        ]);
        Brand::create([
            'b_name' => 'Nanoleaf',
            'b_sdt' => '0909090926',
        ]);
    }
}
