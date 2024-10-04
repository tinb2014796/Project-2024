import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DetailOrders = ({ open, handleClose, order }) => {
  const thanhTien = order?.sanPham.reduce((total, sp) => total + sp.tongTien, 0);
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Chi tiết đơn hàng #{order?.maDonHang}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Thông tin đơn hàng</Typography>
            <Typography>Mã đơn hàng: {order?.maDonHang}</Typography>
            <Typography>Tên khách hàng: {order?.tenKhachHang}</Typography>
            <Typography>Ngày đặt: {order?.ngayDat}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Thông tin sản phẩm</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell>Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.sanPham.map((sp, index) => (
                <TableRow key={index}>
                  <TableCell>{sp.maSanPham}</TableCell>
                  <TableCell>{sp.tenSanPham}</TableCell>
                  <TableCell>{sp.soLuong}</TableCell>
                  <TableCell>{sp.donGia.toLocaleString('vi-VN')} VNĐ</TableCell>
                  <TableCell>{sp.tongTien.toLocaleString('vi-VN')} VNĐ</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell><strong>Thành tiền:</strong></TableCell>
                <TableCell><strong>{thanhTien?.toLocaleString('vi-VN')} VNĐ</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailOrders;
