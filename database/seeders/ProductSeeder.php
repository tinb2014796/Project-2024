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
            [
                'p_name' => 'Máy xay sinh tố đa năng Sunhouse SHD5323R ĐỎ',
                'p_selling' => 740000,
                'p_quantity' => 20,
                'p_description' => 'Đặc điểm nổi bật\r\nXay đa năng: hoa quả, thực phẩm khô, xay thịt…\r\nLưỡi dao inox sắc bén, thiết kế riêng cho từng loại thực phẩm\r\nXay 2 tốc độ và chế độ nhồi tiện lợi\r\nAn toàn tuyệt đối khi sử dụng',
                'p_purchase' => 600000,
                'c_id' => 1,
                'b_id' => 1
            ],
            [
                'p_name' => 'Máy xay sinh tố đa năng Sunhouse MAMA SHD5353W',
                'p_selling' => 1100000,
                'p_quantity' => 15,
                'p_description' => 'Đặc điểm nổi bật\r\nĐa chức năng: xay hoa quả, xay nhuyễn thịt cá, rau củ quả khô…\r\nCối xay làm bằng thủy tinh siêu bền, chống trầy xước, dễ vệ sinh\r\nLưỡi dao sắc bén làm bằng thép không gỉ\r\nTự động ngắt khi quá tải nhiệt',
                'p_purchase' => 900000,
                'c_id' => 1,
                'b_id' => 1
            ],
            [
                'p_name' => 'Máy xay sinh tố Sunhouse SHD5118',
                'p_selling' => 430000,
                'p_quantity' => 25,
                'p_description' => 'Đặc điểm nổi bật\r\nXay mịn, nghiền nhuyễn hiệu quả, không lo kẹt máy\r\nXay đa dạng nguyên liệu với 2 tốc độ xay & 1 chế độ nhồi\r\n2 cối xay thủy tinh cao cấp, chịu nhiệt tốt, an toàn cả với đồ nóng\r\nLưỡi dao Inox sắc bén, xay mạnh mẽ',
                'p_purchase' => 240000,
                'c_id' => 1,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bàn ủi hơi nước cầm tay Sunhouse SHD2165',
                'p_selling' => 375000,
                'p_quantity' => 25,
                'p_description' => 'Tần suất phun hơi mạnh, làm phẳng nhanh chóng\r\nThiết kế nhỏ gọn, dễ dàng sử dụng\r\nTự động ngắt khi quá nhiệt, an toàn khi sử dụng\r\nBề mặt thép không gỉ, bền bỉ, chống ăn mòn',
                'p_purchase' => 200000,
                'c_id' => 6,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bàn ủi hơi nước cầm tay Sunhouse SHD2175',
                'p_selling' => 440000,
                'p_quantity' => 20,
                'p_description' => 'Hơi phun cực mạnh 25g/phút - Ủi phẳng tức thì\r\nTích hợp là khô và phun hơi, phù hợp với mọi chất liệu\r\nMặt là chống dính - Trượt êm trên mọi loại vải\r\nTay cầm xoay linh hoạt: Ủi đứng, ủi nằm dễ dàng',
                'p_purchase' => 250000,
                'c_id' => 6,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bàn ủi cầm tay Tefal - DT3030E0',
                'p_selling' => 1040000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại bàn ủi\r\nBàn ủi hơi nước cầm tay\r\n\r\nCông suất\r\n1300 W\r\n\r\nĐiện áp\r\n220 V\r\nBình nước\r\n0.125 lít\r\n\r\nTính năng và tiện ích\r\nChức năng\r\nỦi hơi nước\r\n\r\nPhun hơi thẳng đứng\r\n\r\nTiện ích\r\nỦi quần áo treo\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải',
                'p_purchase' => 840000,
                'c_id' => 6,
                'b_id' => 6
            ],
            [
                'p_name' => 'Bàn ủi hơi nước đứng Philips GC487/89',
                'p_selling' => 2500000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại bàn ủi\r\nBàn ủi hơi nước đứng\r\n\r\nCông suất\r\n1800 W\r\n\r\nĐiện áp\r\n220 V\r\nBình nước\r\n1.4 lít\r\n\r\nTính năng và tiện ích\r\nChức năng\r\nỦi hơi nước\r\n\r\nTiện ích\r\nỦi quần áo treo\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nPhụ kiện trong hộp\r\nPhụ kiện trong hộp\r\nGăng tay chống nóng',
                'p_purchase' => 2000000,
                'c_id' => 6,
                'b_id' => 7
            ],
            [
                'p_name' => 'Bàn ủi hơi nước Sunhouse SHD2065',
                'p_selling' => 240000,
                'p_quantity' => 30,
                'p_description' => 'Công suất\r\n1600 W\r\n\r\nĐiện áp\r\n220 V\r\nBình nước\r\n0.125 lít\r\n\r\nTính năng và tiện ích\r\nChức năng\r\nPhun tia\r\n\r\nỦi hơi nước\r\n\r\nPhun hơi tăng cường\r\n\r\nTiện ích\r\nMặt đế chống dính\r\n\r\nChống xoắn dây nguồn\r\n\r\nChống đóng cặn lỗ phun hơi nước\r\n\r\nNút trượt xả cặn\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nPhụ kiện trong hộp\r\nPhụ kiện trong hộp\r\nCốc',
                'p_purchase' => 140000,
                'c_id' => 6,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bàn ủi hơi nước Sunhouse SHD2066',
                'p_selling' => 380000,
                'p_quantity' => 25,
                'p_description' => 'Thiết kế & Trọng lượng\r\nKích thước\r\n28 x 15 x 12 cm\r\nTrọng lượng sản phẩm\r\n1.07 kg\r\n\r\nChất liệu\r\nNhựa cao cấp\r\n\r\nThông số cơ bản\r\nCông suất\r\n2000 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz',
                'p_purchase' => 220000,
                'c_id' => 6,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bàn ủi khô Philips HD1172',
                'p_selling' => 390000,
                'p_quantity' => 25,
                'p_description' => 'Thông số cơ bản\r\nLoại bàn ủi\r\nBàn ủi khô\r\n\r\nCông suất\r\n1000 W\r\n\r\nĐiện áp\r\n220 V\r\nTuổi thọ trung bình\r\n25.000 giờ\r\nBảng điều khiển\r\nCông tắc\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng',
                'p_purchase' => 250000,
                'c_id' => 6,
                'b_id' => 7
            ],
            [
                'p_name' => 'Bàn ủi Philips GC1740',
                'p_selling' => 520000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại bàn ủi\r\nBàn ủi hơi nước\r\n\r\nCông suất\r\n2000 W\r\n\r\nĐiện áp\r\n220 V\r\nBình nước\r\n0.2 lít\r\n\r\nTính năng và tiện ích\r\nChức năng\r\nỦi hơi nước\r\n\r\nPhun tia\r\n\r\nPhun hơi tăng cường\r\n\r\nTiện ích\r\nChống đóng cặn lỗ phun hơi nước\r\n\r\nChống xoắn dây nguồn\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải',
                'p_purchase' => 340000,
                'c_id' => 8,
                'b_id' => 7
            ],
            [
                'p_name' => 'Bàn ủi Philips GC48549',
                'p_selling' => 2500000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại bàn ủi\r\nBàn ủi hơi nước đứng\r\n\r\nCông suất\r\n1800 W\r\n\r\nĐiện áp\r\n220 V\r\nBình nước\r\n1.4 lít\r\n\r\nTính năng và tiện ích\r\nChức năng\r\nỦi hơi nước\r\n\r\nTiện ích\r\nỦi quần áo treo\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nPhụ kiện trong hộp\r\nPhụ kiện trong hộp\r\nGăng tay chống nóng',
                'p_purchase' => 2200000,
                'c_id' => 6,
                'b_id' => 7
            ],
            [
                'p_name' => 'Bình đun siêu tốc Goldsun 1.7L GKT2616',
                'p_selling' => 650000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nCông suất : 1500 W\r\n\r\nDung tích thực: 1.7 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 460000,
                'c_id' => 11,
                'b_id' => 8
            ],
            [
                'p_name' => 'Bình đun siêu tốc Goldsun 1.8L GKT2611',
                'p_selling' => 375000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nCông suất: 1500 W\r\n\r\nDung tích thực: 1.8 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 220000,
                'c_id' => 11,
                'b_id' => 8
            ],
            [
                'p_name' => 'Bình Đun siêu tốc Hydrogen Goldsun GKT2671',
                'p_selling' => 1300000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n800 W\r\n\r\nĐiện áp\r\n220 - 240 V\r\nDung tích thực\r\n1.7 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nMàn hình LED hiển thị\r\n\r\nHẹn giờ nấu\r\n\r\nĐiều khiển cảm ứng\r\n\r\nGiàu hydrogen chống ôxy hóa\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTay cầm cách nhiệt\r\n\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 1100000,
                'c_id' => 11,
                'b_id' => 8
            ],
            [
                'p_name' => 'Bình đun siêu tốc inox 2 lớp 1.8L Sunhouse SHD1356',
                'p_selling' => 240000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n1500 W\r\n\r\nDung tích thực\r\n1.8 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nĐèn báo hoạt động\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nChống rò rỉ nguồn điện',
                'p_purchase' => 180000,
                'c_id' => 11,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bình đun siêu tốc Kangaroo 1.5 lít KG18K1',
                'p_selling' => 350000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n1800 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nDung tích thực\r\n1.5 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 180000,
                'c_id' => 11,
                'b_id' => 5
            ],
            [
                'p_name' => 'Bình đun siêu tốc Kangaroo 1.7 lít KG-353',
                'p_selling' => 800000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n1800 W\r\n\r\nDung tích thực\r\n1.7 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nTự ngắt khi quá tải\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nĐộ bền cao\r\n\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 620000,
                'c_id' => 11,
                'b_id' => 5
            ],
            [
                'p_name' => 'Bình đun siêu tốc Sunhouse 1.5 lít SHD1057',
                'p_selling' => 150000,
                'p_quantity' => 30,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n1500 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 100000,
                'c_id' => 11,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bình đun siêu tốc thủy tinh Goldsun 1.8 Lít GKT2607G',
                'p_selling' => 250000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\nNấu: 1700 W\r\n\r\nDung tích thực\r\n1.8 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐế xoay 360 độ\r\n\r\nĐèn báo LED\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nChân đế chống trượt\r\n\r\nTự ngắt điện khi nước sôi và khi cạn nước',
                'p_purchase' => 180000,
                'c_id' => 11,
                'b_id' => 8
            ],
            [
                'p_name' => 'Bình đun siêu tốc thủy tinh Sunhouse 1.7L SHD1330',
                'p_selling' => 870000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nCông suất\r\n1850 W\r\n\r\nDung tích thực\r\n1.7 lít\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐèn báo hoạt động\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nChống rò rỉ nguồn điện',
                'p_purchase' => 650000,
                'c_id' => 11,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bình thủy điện Kangaroo 5 lít KG5K1',
                'p_selling' => 1500000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nDung tích sử dụng\r\n5 lít\r\n\r\nCông suất\r\n1600 W\r\n\r\nĐiện áp\r\n220 V\r\nHẹn giờ đun sôi\r\nKhông\r\nCách lấy nước\r\nBơm tay\r\nNhiệt độ bình\r\nGiữ ấm 6 mức: 85, 75, 65, 55, 45, 40 độ C\r\n\r\nĐun sôi 100 độ C\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nTự đun sôi lại khi nước nguội\r\n\r\nCột hiển thị mực nước\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nKhoá bơm tay rót nước',
                'p_purchase' => 1290000,
                'c_id' => 12,
                'b_id' => 5
            ],
            [
                'p_name' => 'Bình thủy điện Sharp 2.8 lít KP-B28SV-SC',
                'p_selling' => 790000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nDung tích sử dụng\r\n2.8 lít\r\n\r\nCông suất\r\n670 W\r\n\r\nĐiện áp\r\n220 V\r\nHẹn giờ đun sôi\r\nKhông\r\nCách lấy nước\r\nBơm tay\r\nNhiệt độ bình\r\nĐun sôi 90 độ C\r\n\r\nGiữ ấm 80 độ C\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nCột hiển thị mực nước\r\n\r\nTự đun sôi lại khi nước nguội\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nKhoá bơm tay rót nước',
                'p_purchase' => 590000,
                'c_id' => 12,
                'b_id' => 3
            ],
            [
                'p_name' => 'Bình thủy điện Sunhouse 3.5 lít SH1535',
                'p_selling' => 1265000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nDung tích sử dụng\r\n3.5 lít\r\n\r\nCông suất\r\n750 W\r\n\r\nĐiện áp\r\n220 V\r\nHẹn giờ đun sôi\r\nKhông\r\nCách lấy nước\r\nBơm tay\r\nNhiệt độ bình\r\nĐun sôi 100 độ C\r\n\r\nGiữ ấm 80 độ C\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nCột hiển thị mực nước\r\n\r\nTự đun sôi lại khi nước nguội\r\n\r\nCó chế độ tẩy cặn\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nKhoá bơm tay rót nước',
                'p_purchase' => 1000000,
                'c_id' => 12,
                'b_id' => 1
            ],
            [
                'p_name' => 'Bình thủy điện Toshiba 4.5 lít PLK-45SF(WT)VN',
                'p_selling' => 2290000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nDung tích sử dụng\r\n4.5 lít\r\n\r\nCông suất\r\n700 W\r\n\r\nĐiện áp\r\n220 V\r\nHẹn giờ đun sôi\r\nSau 6 tiếng\r\nCách lấy nước\r\nNhấn nút điện tử\r\nNhiệt độ bình\r\nĐun sôi 100 độ C\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nMàn hình hiển thị\r\n\r\nCột hiển thị mực nước\r\n\r\nTự đun sôi lại khi nước nguội\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nKhoá rót nước điện tử\r\n\r\nChế độ rót nước chậm chống bỏng',
                'p_purchase' => 2090000,
                'c_id' => 12,
                'b_id' => 9
            ],
            [
                'p_name' => 'Đèn bàn Comet CT413',
                'p_selling' => 150000,
                'p_quantity' => 25,
                'p_description' => 'Thiết kế & Trọng lượng\r\nTrọng lượng sản phẩm\r\n550 g\r\n\r\nChất liệu\r\nNhựa ABS\r\n\r\nThông số cơ bản\r\nLoại đèn\r\nĐèn bàn\r\n\r\nCông suất\r\n60 W\r\n\r\nĐiện áp\r\n220 V\r\nTuổi thọ trung bình\r\n25.000 giờ\r\nBảng điều khiển\r\nNút ấn Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐèn LED chống cận\r\n\r\nPhụ kiện trong hộp\r\nPhụ kiện trong hộp\r\nSách HDSD',
                'p_purchase' => 100000,
                'c_id' => 8,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn bàn Điện Quang ĐQ DKL14 Đen',
                'p_selling' => 350000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn bàn\r\n\r\nCông suất\r\n5 W\r\n\r\nĐiện áp\r\n220 V\r\nTuổi thọ trung bình\r\n25.000 giờ\r\nBảng điều khiển\r\nCông tắc\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng',
                'p_purchase' => 250000,
                'c_id' => 8,
                'b_id' => 11
            ],
            [
                'p_name' => 'Đèn bàn sạc Led Comet CT178W',
                'p_selling' => 154000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn bàn\r\n\r\nCông suất\r\n3 W\r\n\r\nĐiện áp\r\n5 V\r\nTuổi thọ trung bình\r\n25.000 giờ\r\nBảng điều khiển\r\nCảm ứng Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nĐèn LED chống cận\r\n\r\nPhụ kiện trong hộp\r\nPhụ kiện trong hộp\r\nDây cáp sạc',
                'p_purchase' => 100000,
                'c_id' => 8,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn bàn sạc Led Điện Quang ĐQ LDL12B Đen',
                'p_selling' => 350000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn bàn\r\n\r\nCông suất\r\n6 W\r\n\r\nĐiện áp\r\n5 V\r\nBảng điều khiển\r\nCảm ứng\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐèn LED chống cận',
                'p_purchase' => 220000,
                'c_id' => 8,
                'b_id' => 11
            ],
            [
                'p_name' => 'Đèn bắt muỗi Điện Quang ĐQ EML06L',
                'p_selling' => 336000,
                'p_quantity' => 15,
                'p_description' => 'Thiết kế & Trọng lượng\r\nKích thước\r\n380 x 250 mm\r\nTrọng lượng sản phẩm\r\n982 g\r\n\r\nChất liệu\r\nNhựa ABS\r\n\r\nThông số cơ bản\r\nLoại đèn\r\nĐèn diệt côn trùng\r\n\r\nCông suất\r\n0.5 W\r\n\r\nĐiện áp\r\n220 V\r\nBảng điều khiển\r\nCông tắc\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nCó móc treo',
                'p_purchase' => 210000,
                'c_id' => 8,
                'b_id' => 11
            ],
            [
                'p_name' => 'Đèn diệt côn trùng đa năng Comet CM068',
                'p_selling' => 350000,
                'p_quantity' => 15,
                'p_description' => 'Thiết kế & Trọng lượng\r\nTrọng lượng sản phẩm\r\n550 g\r\n\r\nChất liệu\r\nNhựa ABS\r\n\r\nThông số cơ bản\r\nLoại đèn\r\nĐèn diệt côn trùng\r\n\r\nCông suất\r\n4.2 W\r\n\r\nĐiện áp\r\n220 - 240 V\r\nBảng điều khiển\r\nNút bấm',
                'p_purchase' => 240000,
                'c_id' => 8,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn diệt côn trùng đa năng Điện Quang ĐQ EML01',
                'p_selling' => 215000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn diệt côn trùng\r\n\r\nCông suất\r\n1 W\r\n\r\nBảng điều khiển\r\nCông tắc\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nDễ vệ sinh',
                'p_purchase' => 110000,
                'c_id' => 8,
                'b_id' => 11
            ],
            [
                'p_name' => 'Đèn thông minh Nanoleaf Shapes Lục Giác 9 ô đèn (bộ khởi động)',
                'p_selling' => 5690000,
                'p_quantity' => 2,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn thông minh',
                'p_purchase' => 4900000,
                'c_id' => 8,
                'b_id' => 16
            ],
            [
                'p_name' => 'Đèn pin sạc cầm tay Hotwell AT03H2',
                'p_selling' => 100000,
                'p_quantity' => 30,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n3 W\r\n\r\nThời gian sạc đầy\r\n3 - 6 giờ\r\n\r\nSố bóng đèn\r\nĐèn pin: 1 bóng\r\n\r\nĐèn tích điện: 1 bóng\r\n\r\nBảng điều khiển\r\nCông tắc\r\n\r\nDây sạc điện\r\nĐuôi sạc trực tiếp\r\nTính năng và tiện ích\r\nTiện ích\r\nTích hợp đèn tích điện\r\n\r\nTự ngắt khi sạc đầy\r\n\r\nĐèn báo sạc đầy\r\n\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nPhụ kiện trong hộp\r\nDây sạc',
                'p_purchase' => 70000,
                'c_id' => 7,
                'b_id' => 10
            ],
            [
                'p_name' => 'Đèn pin sạc đội đầu Sunhouse SHE-5032',
                'p_selling' => 106000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc đội đầu\r\n\r\nCông suất\r\n3 W\r\n\r\nThời gian sạc đầy\r\n12 - 15 giờ\r\n\r\nSố bóng đèn\r\nĐèn pin: 1 bóng\r\n\r\nBảng điều khiển\r\nNút gạt\r\n\r\nDây sạc điện\r\nĐuôi sạc trực tiếp\r\nTính năng và tiện ích\r\nTiện ích\r\nĐèn báo sạc đầy\r\n\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nPhụ kiện trong hộp\r\nDây đeo',
                'p_purchase' => 60000,
                'c_id' => 7,
                'b_id' => 1
            ],
            [
                'p_name' => 'Đèn pin sạc Led Comet CRT344',
                'p_selling' => 45000,
                'p_quantity' => 40,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n0.5 W\r\n\r\nThời gian sạc đầy\r\n8 - 11 giờ\r\n\r\nSố bóng đèn\r\nĐèn pin: 1 bóng\r\n\r\nBảng điều khiển\r\nNút ấn\r\n\r\nDây sạc điện\r\nĐuôi sạc trực tiếp\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng',
                'p_purchase' => 25000,
                'c_id' => 7,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn pin sạc Led Comet CRT455',
                'p_selling' => 245000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n11 W\r\n\r\nThời gian sạc đầy\r\n6 - 10 giờ\r\n\r\nSố bóng đèn\r\nĐèn pin: 1 bóng\r\n\r\nĐèn tích điện: 16 bóng\r\n\r\nBảng điều khiển\r\nNút ấn\r\n\r\nDây sạc điện\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nKết hợp đèn Led chiếu sáng\r\n\r\nPhụ kiện trong hộp\r\nDây sạc Micro USB',
                'p_purchase' => 165000,
                'c_id' => 7,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn sạc Led Comet CM8517',
                'p_selling' => 200000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n3 W\r\n\r\nThời gian sạc đầy\r\n12 giờ\r\n\r\nBảng điều khiển\r\nNúm xoay\r\n\r\nDây sạc điện\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nPhụ kiện trong hộp\r\nCáp',
                'p_purchase' => 120000,
                'c_id' => 7,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn sạc Led Comet CRL3102',
                'p_selling' => 210000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn bàn\r\n\r\nCông suất\r\n8 W\r\n\r\nSố bóng đèn\r\n16 bóng\r\n\r\nBảng điều khiển\r\nNút ấn\r\n\r\nDây sạc điện\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nTiện ích\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nPhụ kiện trong hộp\r\nDây cáp sạc',
                'p_purchase' => 140000,
                'c_id' => 7,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn sạc Led năng lượng mặt trời Comet CRL3103S',
                'p_selling' => 210000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n10 W\r\n\r\nBảng điều khiển\r\nNúm xoay\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nSạc pin năng lượng mặt trời\r\n\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nPhụ kiện trong hộp\r\nDây cáp sạc',
                'p_purchase' => 140000,
                'c_id' => 7,
                'b_id' => 2
            ],
            [
                'p_name' => 'Đèn tích điện đa năng 360 Sunhouse SHE6848LA',
                'p_selling' => 260000,
                'p_quantity' => 15,
                'p_description' => 'Thông số cơ bản\r\nLoại đèn\r\nĐèn pin sạc điện\r\n\r\nCông suất\r\n10 W\r\n\r\nThời gian sạc đầy\r\n12 giờ\r\n\r\nSố bóng đèn\r\nĐèn pin: 1 bóng\r\n\r\nĐèn tích điện: 48 bóng\r\n\r\nBảng điều khiển\r\nNúm vặn\r\n\r\nDây sạc điện\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nTiện ích\r\nTích hợp đèn tích điện\r\n\r\nĐiều chỉnh chế độ ánh sáng\r\n\r\nĐèn báo sạc đầy\r\n\r\nPhụ kiện trong hộp\r\nDây sạc',
                'p_purchase' => 180000,
                'c_id' => 7,
                'b_id' => 1
            ],
            [
                'p_name' => 'Ổ cắm điện 4 lỗ 3m Comet CESG2403',
                'p_selling' => 180000,
                'p_quantity' => 20,
                'p_description' => 'Công suất tối đa\r\n\r\n2500 W\r\n\r\nTrọng lượng sản phẩm\r\n\r\n400 g',
                'p_purchase' => 100000,
                'c_id' => 10,
                'b_id' => 2
            ],
            [
                'p_name' => 'Ổ cắm điện 5 lỗ 2 USB 2m Điện Quang ECO ĐQ ESK 5ECO 2A',
                'p_selling' => 240000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại ổ cắm\r\nỔ cắm điện\r\n\r\nCông suất tối đa\r\nTổng: 2500 W\r\n\r\nĐiện áp vào\r\n250V / 10A\r\nSố ổ cắm\r\n2 lỗ 3 chấu\r\n\r\n3 lỗ 2 chấu\r\n\r\n2 cổng USB\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nCó cổng USB, sạc điện thoại khi cần\r\n\r\nAn toàn sử dụng\r\nĐộ bền cao\r\n\r\nChống rò rĩ nguồn điện\r\n\r\nCó công tắc tắt/mở bảo vệ ổ cắm và thiết bị khi quá tải, tránh chập cháy mất an toàn điện',
                'p_purchase' => 160000,
                'c_id' => 10,
                'b_id' => 11
            ],
            [
                'p_name' => 'Ổ cắm điện 7 lỗ 3m Comet CES4433',
                'p_selling' => 160000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại ổ cắm\r\nAdapter sạc\r\n\r\nCông suất tối đa\r\n2500 W\r\n\r\nĐiện áp vào\r\n100 - 240 V / 50 - 60 Hz\r\nSố ổ cắm\r\n3 lỗ 3 chấu\r\n\r\n3 lỗ 2 chấu\r\n\r\nAn toàn sử dụng\r\nBảo vệ sốc điện, ngăn ngừa ngắn mạch, kiểm soát nhiệt độ\r\n\r\nTự ngắt khi quá nhiệt',
                'p_purchase' => 80000,
                'c_id' => 10,
                'b_id' => 2
            ],
            [
                'p_name' => 'Ổ cắm điện tích hợp củ sạc nhanh và đèn ngủ iCORE ITS100C',
                'p_selling' => 500000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại ổ cắm\r\nỔ cắm điện\r\n\r\nCông suất tối đa\r\nTổng: 2500 W\r\n\r\nĐiện áp vào\r\n250V / 10A\r\nSố ổ cắm\r\nỔ cắm AC\r\n\r\nCổng USB-A\r\n\r\nCổng Type -C\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nỔ cắm đa năng\r\n\r\nĐèn ngủ cảm ứng\r\n\r\nMiếng che chống giật\r\n\r\nAn toàn sử dụng\r\nTích hợp Cầu chì chống quá tải',
                'p_purchase' => 400000,
                'c_id' => 10,
                'b_id' => 12
            ],
            [
                'p_name' => 'Ổ cắm du lịch đa năng thông minh PACK&GO PPC01',
                'p_selling' => 620000,
                'p_quantity' => 5,
                'p_description' => 'Thiết kế & Trọng lượng\r\nKích thước\r\n67.5 x 55.5 x 50.5 mm\r\nTrọng lượng sản phẩm\r\n120 g\r\n\r\nChất liệu\r\nVỏ: Nhựa Polycarbonate\r\n\r\nThông số cơ bản\r\nLoại ổ cắm\r\nỔ cắm điện',
                'p_purchase' => 500000,
                'c_id' => 10,
                'b_id' => 13
            ],
            [
                'p_name' => 'Phích cắm chuyển đa chiều Điện Quang ĐQ EPC NK-803-K Xanh',
                'p_selling' => 80000,
                'p_quantity' => 30,
                'p_description' => 'Thông số cơ bản\r\nLoại ổ cắm\r\nỔ cắm điện\r\n\r\nCông suất tối đa\r\n250 W\r\n\r\nSố ổ cắm\r\nLỗ 3 chấu 1',
                'p_purchase' => 45000,
                'c_id' => 10,
                'b_id' => 11
            ],
            [
                'p_name' => 'Nồi cơm điện 1.2L Sunhouse Happy time HTD8522G',
                'p_selling' => 410000,
                'p_quantity' => 10,
                'p_description' => 'Đặc điểm nổi bật\r\nLòng nồi chống dính Whitford (USA) siêu bền\r\nVỏ nhựa cao cấp, có quai xách chống bỏng\r\nCấu tạo vung kép, giữ nhiệt tốt\r\nSản xuất tại Việt Nam',
                'p_purchase' => 280000,
                'c_id' => 4,
                'b_id' => 1
            ],
            [
                'p_name' => 'Nồi cơm điện 1.8L Sunhouse MAMA SHD8658G',
                'p_selling' => 1100000,
                'p_quantity' => 10,
                'p_description' => 'Đặc điểm nổi bật\r\nNghiên cứu, thiết kế và kiểm soát chất lượng bởi chuyên gia Hàn Quốc\r\nLòng nồi phủ chống dính cao cấp an toàn cho sức khỏe\r\nCông nghệ nấu 3D (ủ ấm 3 chiều) giữ cơm ngon suốt 48 giờ\r\nThân nồi bằng nhựa PP cách nhiệt, siêu bền\r\nĐường kính mâm nhiệt lớn, tỏa nhiệt đều, cơm ngon hơn\r\nKiểu dáng trẻ trung, có quai xách chống bỏng tiện dụng',
                'p_purchase' => 900000,
                'c_id' => 4,
                'b_id' => 1
            ],
            [
                'p_name' => 'Nồi cơm điện cao tần Sharp 1.2 lít KS-IH122V-BK',
                'p_selling' => 2600000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi cao tần\r\n\r\nDung tích thực\r\n1.2 lít\r\n\r\nSố người ăn\r\n2 - 4 người\r\nĐiện áp\r\n220 V / 50 Hz\r\nCông suất\r\nNấu: 1100 W\r\n\r\nĐộ dày lòng nồi\r\n3 mm\r\n\r\nCông nghệ nấu\r\nNấu cao tần\r\n\r\n3D (Toả nhiệt từ 3 hướng)\r\n\r\nBảng điều khiển\r\nNút ấn Tiếng Việt\r\n\r\nDây nguồn\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nChức năng nấu\r\nNấu cơm\r\n\r\nHầm\r\n\r\nTiện ích\r\nHẹn giờ nấu\r\n\r\nCó xửng hấp\r\n\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nLòng nồi chống dính\r\n\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nPhụ kiện trong hộp\r\nMuỗng soup\r\n\r\nCốc đong\r\n\r\nXửng hấp\r\n\r\nMuỗng cơm',
                'p_purchase' => 2400000,
                'c_id' => 4,
                'b_id' => 3
            ],
            [
                'p_name' => 'Nồi cơm điện cao tần Toshiba 1 lít RC-10IX1PV',
                'p_selling' => 3990000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi cao tần\r\n\r\nDung tích thực\r\n1 lít\r\n\r\nSố người ăn\r\n2 - 4 người\r\nĐiện áp\r\n220 V\r\nCông suất\r\n1000 W\r\n\r\nĐộ dày lòng nồi\r\n3 mm\r\n\r\nCông nghệ nấu\r\nNấu cao tần\r\n\r\nBảng điều khiển\r\nCảm ứng có màn hình hiển thị\r\n\r\nDây nguồn\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nChức năng nấu\r\n10 chế độ nấu\r\n\r\nTiện ích\r\nVan thoát hơi thông minh\r\n\r\nHẹn giờ nấu\r\n\r\nMàn hình hiển thị\r\n\r\nCó xửng hấp\r\n\r\nPhụ kiện trong hộp\r\nDây nguồn\r\n\r\nMuỗng cơm\r\n\r\nCốc đong\r\n\r\nXửng hấp',
                'p_purchase' => 3400000,
                'c_id' => 4,
                'b_id' => 9
            ],
            [
                'p_name' => 'Nồi cơm điện Sharp 2.2 lít KS-223TJV-CH',
                'p_selling' => 800000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi nắp gài\r\n\r\nDung tích thực\r\n2.2 lít\r\n\r\nSố người ăn\r\n4 - 6 người\r\nĐiện áp\r\n220 V\r\nCông suất\r\n900 W\r\n\r\nĐộ dày lòng nồi\r\n1 mm\r\n\r\nCông nghệ nấu\r\n3D (Toả nhiệt từ 3 hướng)\r\n\r\nBảng điều khiển\r\nNút nhấn\r\n\r\nDây nguồn\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nChức năng nấu\r\n2 chế độ nấu\r\n\r\nTiện ích\r\nCó xửng hấp\r\n\r\nVan thoát hơi thông minh\r\n\r\nPhụ kiện trong hộp\r\nDây nguồn\r\n\r\nXửng hấp\r\n\r\nCốc đong\r\n\r\nMuỗng cơm',
                'p_purchase' => 650000,
                'c_id' => 4,
                'b_id' => 3
            ],
            [
                'p_name' => 'Nồi cơm điện Toshiba 1 lít RC-10JFM(H)VN',
                'p_selling' => 600000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi nắp gài\r\n\r\nDung tích thực\r\n1 lít\r\n\r\nSố người ăn\r\n2 - 4 người\r\nĐiện áp\r\n220 V\r\nCông suất\r\n500 W\r\n\r\nĐộ dày lòng nồi\r\n1.7 mm\r\n\r\nCông nghệ nấu\r\n3D (Toả nhiệt từ 3 hướng)\r\n\r\nBảng điều khiển\r\nNút gạt\r\n\r\nDây nguồn\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nChức năng nấu\r\n3 chế độ nấu\r\n\r\nTiện ích\r\nCó xửng hấp\r\n\r\nPhụ kiện trong hộp\r\nXửng hấp\r\n\r\nMuỗng cơm\r\n\r\nDây nguồn\r\n\r\nCốc đong',
                'p_purchase' => 450000,
                'c_id' => 4,
                'b_id' => 9
            ],
            [
                'p_name' => 'Nồi cơm điện tử Sharp 1.8 lít KS-COM18V',
                'p_selling' => 2390000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi điện tử\r\n\r\nDung tích thực\r\n1.8 lít\r\n\r\nSố người ăn\r\n4 - 6 người\r\nĐiện áp\r\n220 V\r\nCông suất\r\n830 W\r\n\r\nĐộ dày lòng nồi\r\n1.4 mm\r\n\r\nCông nghệ nấu\r\n3D (Toả nhiệt từ 3 hướng)\r\n\r\nBảng điều khiển\r\nNút nhấn có màn hình hiển thị\r\n\r\nDây nguồn\r\nDây rút vào thân nồi\r\nTính năng và tiện ích\r\nChức năng nấu\r\n8 chế độ nấu\r\n\r\nTiện ích\r\nCó xửng hấp\r\n\r\nHẹn giờ nấu\r\n\r\nVan thoát hơi thông minh\r\n\r\nPhụ kiện trong hộp\r\nMuỗng cơm\r\n\r\nCốc đong\r\n\r\nXửng hấp',
                'p_purchase' => 2100000,
                'c_id' => 4,
                'b_id' => 3
            ],
            [
                'p_name' => 'Nồi cơm điện tử Toshiba 1.8 lít RC-18DH2PV(W)',
                'p_selling' => 1920000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại nồi\r\nNồi điện tử\r\n\r\nDung tích thực\r\n1.8 lít\r\n\r\nSố người ăn\r\n4 - 6 người\r\nĐiện áp\r\n220 V\r\nCông suất\r\n760 W\r\n\r\nĐộ dày lòng nồi\r\n2.2 mm\r\n\r\nCông nghệ nấu\r\n1D (Toả nhiệt từ 1 hướng)\r\n\r\nBảng điều khiển\r\nNút nhấn có màn hình hiển thị\r\n\r\nDây nguồn\r\nCó thể tháo rời\r\nTính năng và tiện ích\r\nChức năng nấu\r\n11 chế độ nấu\r\n\r\nTiện ích\r\nCó xửng hấp\r\n\r\nMàn hình hiển thị\r\n\r\nVan thoát hơi thông minh\r\n\r\nHẹn giờ nấu\r\n\r\nPhụ kiện trong hộp\r\nMuỗng cơm\r\n\r\nXửng hấp\r\n\r\nCốc đong\r\n\r\nDây nguồn',
                'p_purchase' => 1760000,
                'c_id' => 4,
                'b_id' => 9
            ],
            [
                'p_name' => 'Đèn sưởi nhà tắm Benny 3 bóng BHT825W',
                'p_selling' => 750000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi phòng tắm\r\n\r\nCông nghệ sưởi\r\n1D (Toả nhiệt từ 1 hướng)\r\n\r\nCông suất\r\nTổng: 825 W\r\n\r\nSố bóng sưởi\r\n3 bóng\r\n\r\nBảng điều khiển\r\nNút bấm\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều',
                'p_purchase' => 590000,
                'c_id' => 13,
                'b_id' => 15
            ],
            [
                'p_name' => 'Đèn sưởi nhà tắm Kangaroo 2 bóng KG247V',
                'p_selling' => 1290000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi phòng tắm\r\n\r\nCông nghệ sưởi\r\nHồng ngoại\r\n\r\nCông suất\r\n550 W\r\n\r\nĐiện áp\r\n220 V\r\nPhạm vi làm ấm\r\n4 - 6 m2\r\nTuổi thọ trung bình\r\n5000 giờ\r\nSố bóng sưởi\r\n2 bóng\r\n\r\nBảng điều khiển\r\nCông tắc\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nĐèn thạch anh chống chói mắt\r\n\r\nChế độ sử dụng đứng hoặc nằm ngang\r\n\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nPhụ kiện trong hộp\r\nGiá treo\r\n\r\nỐc vít',
                'p_purchase' => 1090000,
                'c_id' => 13,
                'b_id' => 5
            ],
            [
                'p_name' => 'Máy sưởi gốm Kangaroo KGFH06',
                'p_selling' => 4090000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nChế độ bảo hành\r\nLắp đặt tại nhà\r\n\r\nLoại quạt sưởi\r\nSưởi gốm Ceramic\r\n\r\nCông nghệ sưởi\r\nSưởi gốm Ceramic\r\n\r\nCông suất\r\n2000 W\r\n\r\nĐiện áp\r\n220 V\r\nPhạm vi làm ấm\r\n15 - 25 m2\r\nBảng điều khiển\r\nCảm ứng có màn hình hiển thị\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nHẹn giờ tắt\r\n\r\nĐiều khiển từ xa bằng remote\r\n\r\nĐèn thạch anh chống chói mắt\r\n\r\nCảm biến nghiêng\r\n\r\nTiết kiệm điện\r\n\r\nChân đế quay\r\n\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nGiữ oxy không gây khó thở và khô da',
                'p_purchase' => 3890000,
                'c_id' => 13,
                'b_id' => 5
            ],
            [
                'p_name' => 'Máy sưởi gốm Unie 2000 W UE-125',
                'p_selling' => 2690000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nChế độ bảo hành\r\nBảo hành tại nhà\r\n\r\nLoại quạt sưởi\r\nSưởi gốm Ceramic\r\n\r\nCông nghệ sưởi\r\nSưởi gốm Ceramic\r\n\r\nCông suất\r\n2000 W\r\n\r\nĐiện áp\r\n220 V\r\nPhạm vi làm ấm\r\n15 - 25 m2\r\nBảng điều khiển\r\nNúm vặn\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nHẹn giờ tắt\r\n\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nMàn hình hiển thị\r\n\r\nGiữ oxy không gây khó thở và khô da\r\n\r\nTiết kiệm điện\r\n\r\nĐiều khiển từ xa bằng remote\r\n\r\nAn toàn sử dụng\r\nTự ngắt điện khi đổ, ngã\r\n\r\nChân đế chống trượt\r\n\r\nLưới tản nhiệt tránh bỏng, giật\r\n\r\nTự ngắt điện khi quá tải',
                'p_purchase' => 2400000,
                'c_id' => 13,
                'b_id' => 14
            ],
            [
                'p_name' => 'Quạt sưởi gốm Ceramic Fujihome FH1100 1500W',
                'p_selling' => 700000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nChế độ bảo hành\r\nBảo hành tại hãng\r\n\r\nLoại quạt sưởi\r\nSưởi gốm\r\n\r\nCông suất\r\nTổng: 1500 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nPhạm vi làm ấm\r\n8 - 12 m2\r\nBảng điều khiển\r\nNúm xoay Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nSưởi ấm nhanh\r\n\r\nKhông đốt oxy\r\n\r\nKhông phát sáng\r\n\r\nKhông gây khô da\r\n\r\nChân đế và tay cầm bằng kim loại chắc chắn\r\n\r\nNúm xoay điều chỉnh nhiệt độ\r\n\r\nNúm xoay điều chỉnh tốc độ gió\r\n\r\nAn toàn sử dụng\r\nBảo vệ quá nhiệt\r\n\r\nTự động tắt khi bị đổ, lật',
                'p_purchase' => 520000,
                'c_id' => 13,
                'b_id' => 8
            ],
            [
                'p_name' => 'Quạt sưởi gốm Ceramic mini FujiE CH-202 1000W',
                'p_selling' => 540000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi gốm Ceramic\r\n\r\nCông nghệ sưởi\r\nSưởi gốm\r\n\r\nCông suất\r\nTổng: 1000 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nPhạm vi làm ấm\r\n4 - 8 m2\r\nBảng điều khiển\r\nNút bấm Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nTự ngắt khi quá tải\r\n\r\nAn toàn sử dụng\r\nTự ngắt khi quá nhiệt',
                'p_purchase' => 450000,
                'c_id' => 13,
                'b_id' => 8
            ],
            [
                'p_name' => 'Quạt sưởi gốm Ceramic tạo ẩm Fujihome FH6000 2200W',
                'p_selling' => 3230000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nChế độ bảo hành\r\nBảo hành tại hãng\r\n\r\nLoại quạt sưởi\r\nSưởi gốm\r\n\r\nCông nghệ sưởi\r\nSưởi gốm\r\n\r\nCông suất\r\nTổng: 2200 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nPhạm vi làm ấm\r\n10 - 25 m2\r\nBảng điều khiển\r\nNúm xoay Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nSưởi ấm nhanh\r\n\r\nKhông đốt oxy\r\n\r\nKhông phát sáng\r\n\r\nKhông gây khô da\r\n\r\nMặt lưới chịu nhiệt độ cao\r\n\r\nNúm xoay điều chỉnh nhiệt độ\r\n\r\nNút bấm cảm ứng hiện đại\r\n\r\nMàn hình LED hiển thị\r\n\r\nĐiều khiển bằng remote\r\n\r\nHẹn giờ\r\n\r\nAn toàn sử dụng\r\nBảo vệ quá nhiệt\r\n\r\nTự ngắt khi quá nhiệt\r\n\r\nTự động tắt khi bị đổ, lậtThông số cơ bản\r\nChế độ bảo hành\r\nBảo hành tại hãng\r\n\r\nLoại quạt sưởi\r\nSưởi gốm\r\n\r\nCông nghệ sưởi\r\nSưởi gốm\r\n\r\nCông suất\r\nTổng: 2200 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nPhạm vi làm ấm\r\n10 - 25 m2\r\nBảng điều khiển\r\nNúm xoay Tiếng Việt\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nSưởi ấm nhanh\r\n\r\nKhông đốt oxy\r\n\r\nKhông phát sáng\r\n\r\nKhông gây khô da\r\n\r\nMặt lưới chịu nhiệt độ cao\r\n\r\nNúm xoay điều chỉnh nhiệt độ\r\n\r\nNút bấm cảm ứng hiện đại\r\n\r\nMàn hình LED hiển thị\r\n\r\nĐiều khiển bằng remote\r\n\r\nHẹn giờ\r\n\r\nAn toàn sử dụng\r\nAn toàn sử dụng\r\nBảo vệ quá nhiệt\r\n\r\nTự ngắt khi quá nhiệt\r\n\r\nTự động tắt khi bị đổ, lật',
                'p_purchase' => 3000000,
                'c_id' => 13,
                'b_id' => 8
            ],
            [
                'p_name' => 'Quạt sưởi phòng tắm Ceramic Sunhouse SHD3816W',
                'p_selling' => 1190000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi phòng tắm\r\n\r\nCông nghệ sưởi\r\nHồng ngoại\r\n\r\nCông suất\r\n1850 W\r\n\r\nĐiện áp\r\n220 V\r\nPhạm vi làm ấm\r\n4 - 8 m2\r\nBảng điều khiển\r\nNút ấn\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nCảm biến nghiêng\r\n\r\nTiết kiệm điện\r\n\r\nĐèn thạch anh chống chói mắt\r\n\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nGiữ oxy không gây khó thở và khô da\r\n\r\nAn toàn sử dụng\r\nLưới tản nhiệt tránh bỏng, giật\r\n\r\nChân đế chống trượt\r\n\r\nTự ngắt điện khi quá tải\r\n\r\nTự ngắt điện khi đổ, ngã',
                'p_purchase' => 990000,
                'c_id' => 13,
                'b_id' => 5
            ],
            [
                'p_name' => 'Sưởi điện Halogen 2 bóng Kangaroo KG1016C',
                'p_selling' => 690000,
                'p_quantity' => 5,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi halogen\r\n\r\nCông nghệ sưởi\r\nHalogen\r\n\r\nCông suất\r\n800 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nPhạm vi làm ấm\r\n10 - 15 m2\r\nSố bóng sưởi\r\n2 bóng\r\n\r\nBảng điều khiển\r\nNúm vặn\r\n\r\nAn toàn sử dụng\r\nTự ngắt điện khi đổ, ngã\r\n\r\nTự ngắt điện khi quá tải',
                'p_purchase' => 500000,
                'c_id' => 13,
                'b_id' => 9
            ],
            [
                'p_name' => 'Sưởi điện hồng ngoại 2 bóng Sunhouse SHD7022',
                'p_selling' => 870000,
                'p_quantity' => 10,
                'p_description' => 'Thông số cơ bản\r\nLoại quạt sưởi\r\nSưởi hồng ngoại\r\n\r\nCông nghệ sưởi\r\nHồng ngoại\r\n\r\nCông suất\r\n1200 W\r\n\r\nĐiện áp\r\n220 V\r\nPhạm vi làm ấm\r\n5 - 20 m2\r\nBảng điều khiển\r\nNúm vặn\r\n\r\nTính năng và tiện ích\r\nTiện ích\r\nTốc độ làm nóng nhanh, tỏa nhiệt đều\r\n\r\nĐèn thạch anh chống chói mắt\r\n\r\nGiữ oxy không gây khó thở và khô da\r\n\r\nCảm biến nghiêng\r\n\r\nChân đế quay\r\n\r\nTiết kiệm điện\r\n\r\nAn toàn sử dụng\r\nTự ngắt điện khi quá tải\r\n\r\nTự ngắt điện khi đổ, ngã\r\n\r\nChân đế chống trượt',
                'p_purchase' => 680000,
                'c_id' => 13,
                'b_id' => 5
            ],
            [
                'p_name' => 'Vợt muỗi Comet CP045',
                'p_selling' => 119000,
                'p_quantity' => 20,
                'p_description' => 'Thông số cơ bản\r\nLoại vợt muỗi\r\nVợt bắt muỗi\r\n\r\nCông suất\r\n2 W\r\n\r\nĐiện áp\r\n220 V / 50 Hz\r\nThời gian sạc đầy\r\n6 - 10 giờ\r\n\r\nThời gian sử dụng\r\nTối đa 7 ngày\r\n\r\nSố lớp lưới\r\n3 lớp\r\nĐiều khiển\r\nNút bấm, cần gạt tắt mở\r\n\r\nĐầu sạc điện\r\nCần gạt phích cắm điện tích hợp',
                'p_purchase' => 79000,
                'c_id' => 9,
                'b_id' => 6
            ]
        ]);
        
    }
}
