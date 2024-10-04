import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DetailOrders from '../../Components/DetailOrders';

const DonHang = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const donHangGoc = [
    { maDonHang: '7535', maKhachHang: 'KH001', tenKhachHang: 'Nguyễn Văn A', sanPham: [{
        maSanPham: 'SP001',
        tenSanPham: 'Maggi',
        soLuong: 2,
        donGia: 10000,
        tongTien: 20000,
    },
    {
        maSanPham: 'SP002',
        tenSanPham: 'CHINSU',
        soLuong: 1,
        donGia: 15000,
        tongTien: 15000,
    },
    {
        maSanPham: 'SP003', 
        tenSanPham: 'Coca Cola',
        soLuong: 3,
        donGia: 12000,
        tongTien: 36000,
    }
    ], ngayDat: '2024-09-12', trangThai: 'Trễ hạn', phuongThucThanhToan: 'Thanh toán khi nhận hàng', trangThaiThanhToan: 'Chưa thanh toán' },

    { maDonHang: '7536', maKhachHang: 'KH002', tenKhachHang: 'Nguyễn Phước Tài', sanPham: [{
        maSanPham: 'SP001',
        tenSanPham: 'Maggi',
        soLuong: 2,
        donGia: 10000,
        tongTien: 20000,
    },
    {
        maSanPham: 'SP002',
        tenSanPham: 'CHINSU',
        soLuong: 3,
        donGia: 15000,
        tongTien: 45000,
    },
    {
        maSanPham: 'SP003', 
        tenSanPham: 'Coca Cola',
        soLuong: 10,
        donGia: 12000,
        tongTien: 120000,
    }
    ], ngayDat: '2024-09-11', trangThai: 'Trễ hạn', phuongThucThanhToan: 'Chuyển khoản', trangThaiThanhToan: 'Đã thanh toán' },
  ];

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleConfirmDelivery = (maDonHang) => {
    // Xử lý logic xác nhận giao hàng ở đây
    console.log(`Đã xác nhận giao hàng cho đơn hàng ${maDonHang}`);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredOrders = donHangGoc.filter(don => don.ngayDat === selectedDate);

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Tất cả đơn hàng</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            sx={{ width: '200px' }}
            InputProps={{
              sx: { color: 'black', borderColor: 'black' }
            }}
          />
          <Button variant="outlined" sx={{ width: '200px', minWidth: '120px' }}>Bộ lọc</Button>
          <Button variant="outlined" sx={{ width: '200px' }}>Lịch sử đơn hàng</Button>
        </Box>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#00FFFF' }}>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Phương thức thanh toán</TableCell>
              <TableCell>Trạng thái thanh toán</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((don, index) => (
              <TableRow key={index}>
                <TableCell>{don.maDonHang}</TableCell>
                <TableCell>{don.tenKhachHang}</TableCell>
                <TableCell>
                  {don.sanPham.reduce((total, sp) => total + sp.tongTien, 0).toLocaleString('vi-VN')} VNĐ
                </TableCell>
                <TableCell>{don.phuongThucThanhToan}</TableCell>
                <TableCell>{don.phuongThucThanhToan === 'Chuyển khoản' ? 'Đã thanh toán' : don.trangThaiThanhToan}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenDetail(don)}
                    sx={{ mr: 1 }}
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => handleConfirmDelivery(don.maDonHang)}
                  >
                    Xác nhận giao hàng
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailOrders 
        open={openDetail} 
        handleClose={handleCloseDetail} 
        order={selectedOrder} 
      />
    </Box>
  );
};

export default DonHang;
