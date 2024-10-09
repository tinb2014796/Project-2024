<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ratings')->insert([
            'ra_score' => 5,
            'ra_comment' => 'Sản phẩm rất tốt',
            'p_id' => 1,
            'cus_id' => 1,
        ]);
    }
}
