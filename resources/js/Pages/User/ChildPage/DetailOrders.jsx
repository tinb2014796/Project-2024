import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stepper, Step, StepLabel } from '@mui/material';

export default function DetailOrders({
    openDetailDialog, handleCloseDetailDialog, selectedOrder, addressDetails, 
    provinceList: provinces, districtList: districts, wardList: wards, selectedAddress
    }) {
    const getOrderStatusSteps = (status) => {
        const steps = [
            { label: 'Chờ xử lý', completed: false },
            { label: 'Đã xác nhận', completed: false },
            { label: 'Đang giao', completed: false },
            { label: 'Đã giao', completed: false }
        ];
        
        const currentStatus = parseInt(Object.keys(status)[Object.keys(status).length - 1]);
            
        for (let i = 0; i < currentStatus; i++) {
            steps[i].completed = true;
        }
        
        return steps;
    };

    const getProvinceName = (provinceId) => {
        const province = provinces.find(p => p.ProvinceID === parseInt(provinceId));
        return province ? province.ProvinceName : '';
    };
        
    const getDistrictName = (districtId) => {
        const district = districts.find(d => d.DistrictID === parseInt(districtId));
        return district ? district.DistrictName : '';
    };
        
    const getWardName = (wardCode) => {
        const ward = wards.find(w => w.WardCode === wardCode);
        return ward ? ward.WardName : '';
    };

    return (
        <Dialog 
            open={openDetailDialog} 
            onClose={handleCloseDetailDialog} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2 }}>
                Chi tiết đơn hàng #{selectedOrder?.id}
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                {selectedOrder && (
                    <Box>
                        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                Trạng thái đơn hàng
                            </Typography>
                            <Stepper activeStep={parseInt(Object.keys(selectedOrder.status)[Object.keys(selectedOrder.status).length - 1]) - 1}>
                                {getOrderStatusSteps(selectedOrder.status).map((step, index) => (
                                    <Step key={index} completed={step.completed}>
                                        <StepLabel>{step.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                Thông tin khách hàng
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Tên:</strong> {selectedOrder.customer?.cus_name} {selectedOrder.customer?.cus_familyname}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Địa chỉ:</strong> {selectedOrder.customer?.cus_address}, {' '}
                                    {getWardName(selectedOrder.customer?.ward_code)}, {' '}
                                    {getDistrictName(selectedOrder.customer?.district_id)}, {' '}
                                    {getProvinceName(selectedOrder.customer?.province_id)}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Số điện thoại:</strong> {selectedOrder.customer?.cus_sdt}
                                </Typography>
                                <Typography>
                                    <strong>Email:</strong> {selectedOrder.customer?.cus_email}
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                Thông tin đơn hàng
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Ngày đặt:</strong> {new Date(selectedOrder.ngayDat).toLocaleString()}
                                </Typography>
                                <Typography sx={{ mb: 1 }}>
                                    <strong>Phương thức thanh toán:</strong> {selectedOrder.payment?.pa_type}
                                </Typography>
                                <Typography>
                                    <strong>Ghi chú:</strong> {selectedOrder.ghiChu || 'Không có'}
                                </Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                                Chi tiết sản phẩm
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Thành tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedOrder.orderDetails?.map((detail, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>{detail.p_name}</TableCell>
                                                <TableCell align="right">{detail.quantity}</TableCell>
                                                <TableCell align="right">{parseInt(detail.p_selling).toLocaleString('vi-VN')}đ</TableCell>
                                                <TableCell align="right">{parseInt(detail.total).toLocaleString('vi-VN')}đ</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>Giảm giá sản phẩm:</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                                -{parseInt(selectedOrder.totalDetailDiscount)?.toLocaleString('vi-VN')}đ
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>Giảm giá đơn hàng:</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                                -{selectedOrder.orderDiscount?.toLocaleString('vi-VN')}đ
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>Tổng cộng:</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                {parseInt(selectedOrder.tongTien).toLocaleString('vi-VN')}đ
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={handleCloseDetailDialog}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
