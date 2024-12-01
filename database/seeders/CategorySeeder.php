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
            [
                'id' => 1,
                'c_name' => 'Máy sinh tố',
                'c_image' => '/images/1730816841_1000x670(170).jpg',
                'created_at' => '2024-11-05 00:27:21',
                'updated_at' => '2024-11-05 00:27:21'
            ],
            [
                'id' => 2, 
                'c_name' => 'Chảo',
                'c_image' => '/images/1730816857_1000x670 copy 1 (7)(1).jpg',
                'created_at' => '2024-11-05 00:27:37',
                'updated_at' => '2024-11-05 00:27:37'
            ],
            [
                'id' => 3,
                'c_name' => 'Nồi',
                'c_image' => '/images/1730816869_bia.png', 
                'created_at' => '2024-11-05 00:27:49',
                'updated_at' => '2024-11-05 00:27:49'
            ],
            [
                'id' => 4,
                'c_name' => 'Nồi cơm điện',
                'c_image' => '/images/1730816881_sunhouse-mama-shd8658g_021.jpg',
                'created_at' => '2024-11-05 00:28:01', 
                'updated_at' => '2024-11-05 00:28:01'
            ],
            [
                'id' => 5,
                'c_name' => 'Quạt',
                'c_image' => '/images/1730816897_Thumb 01(110).jpg',
                'created_at' => '2024-11-05 00:28:17',
                'updated_at' => '2024-11-05 00:28:17'
            ],
            [
                'id' => 6,
                'c_name' => 'Bàn ủi',
                'c_image' => '/images/1731255854_bu kho.jpg',
                'created_at' => '2024-11-10 09:24:14',
                'updated_at' => '2024-11-10 09:24:14'
            ],
            [
                'id' => 7,
                'c_name' => 'Đèn pin',
                'c_image' => '/images/1731255882_crt3.jpg',
                'created_at' => '2024-11-10 09:24:42',
                'updated_at' => '2024-11-10 09:24:42'
            ],
            [
                'id' => 8,
                'c_name' => 'Đèn',
                'c_image' => '/images/1731255910_db3.jpg',
                'created_at' => '2024-11-10 09:25:10',
                'updated_at' => '2024-11-10 09:25:10'
            ],
            [
                'id' => 9,
                'c_name' => 'Vợt điện',
                'c_image' => '/images/1731255937_vd do.jpg',
                'created_at' => '2024-11-10 09:25:37',
                'updated_at' => '2024-11-10 09:25:37'
            ],
            [
                'id' => 10,
                'c_name' => 'Ổ diện',
                'c_image' => '/images/1731255964_o dien 4 mau.jpg',
                'created_at' => '2024-11-10 09:26:04',
                'updated_at' => '2024-11-10 09:26:04'
            ],
            [
                'id' => 11,
                'c_name' => 'Bình đun siêu tốc',
                'c_image' => '/images/1731255997_2611.png',
                'created_at' => '2024-11-10 09:26:37',
                'updated_at' => '2024-11-10 09:26:37'
            ],
            [
                'id' => 12,
                'c_name' => 'Bình thủy điện',
                'c_image' => '/images/1731256037_sh1535-1.jpg',
                'created_at' => '2024-11-10 09:27:17',
                'updated_at' => '2024-11-10 09:27:17'
            ],
            [
                'id' => 13,
                'c_name' => 'Thiết bị sưởi ấm',
                'c_image' => '/images/1731335273_quat sunhouse.jpg',
                'created_at' => '2024-11-11 07:27:53',
                'updated_at' => '2024-11-11 07:27:53'
            ]
        ]);
    }
}
