import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Grid, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';

export default function DetailCustomer() {
    const { customer } = usePage().props;
    const [wardName, setWardName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [provinceName, setProvinceName] = useState('');
    console.log(customer);
    useEffect(() => {
        const getProvinceName = async () => {
            try {
                const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        'token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data;
                const province = data.data.find(p => p.ProvinceID === parseInt(customer.province_id));
                setProvinceName(province ? province.ProvinceName : '');

                if (province) {
                    const districtResponse = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                        headers: {
                            'token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                            'Content-Type': 'application/json'
                        },
                        params: {
                            province_id: province.ProvinceID
                        }
                    });
                    const districtData = districtResponse.data;
                    const district = districtData.data.find(d => d.DistrictID === parseInt(customer.district_id));
                    setDistrictName(district ? district.DistrictName : '');

                    if (district) {
                        const wardResponse = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                            headers: {
                                'token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                                'Content-Type': 'application/json'
                            },
                            params: {
                                district_id: district.DistrictID
                            }
                        });
                        const wardData = wardResponse.data;
                        const ward = wardData.data.find(w => w.WardCode === customer.ward_code);
                        setWardName(ward ? ward.WardName : '');
                    }
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };

        if (customer.province_id) {
            getProvinceName();
        }
    }, [customer]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const getStatusText = (status) => {
        if (!status) return 'Không xác định';
        try {
            const statusObj = JSON.parse(status);
            const lastStatus = Object.entries(statusObj).pop();
            return lastStatus ? lastStatus[1] : 'Không xác định';
        } catch (e) {
            return 'Không xác định';
        }
    };

    const getPaymentMethod = (payment) => {
        if (!payment) return 'Không xác định';
        switch(payment.pa_id) {
            case 1: return 'Tiền mặt';
            case 2: return 'Thanh toán online';
            default: return 'Không xác định';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Chi tiết khách hàng
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Thông tin cá nhân
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Họ và tên:</strong> {customer.cus_familyname} {customer.cus_name}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {customer.cus_email}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Số điện thoại:</strong> {customer.cus_sdt}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Điểm tích lũy:</strong> {customer.cus_points}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Địa chỉ
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Địa chỉ chi tiết:</strong> {customer.cus_address}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Phường/Xã:</strong> {wardName || 'Không xác định'}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Quận/Huyện:</strong> {districtName || 'Không xác định'}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Tỉnh/Thành phố:</strong> {provinceName || 'Không xác định'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
                    Lịch sử đơn hàng
                </Typography>
                
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Phương thức thanh toán</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customer.orders && customer.orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{formatDate(order.or_date)}</TableCell>
                                    <TableCell>
                                        {order.or_total ? order.or_total.toLocaleString('vi-VN') : '0'} đ
                                    </TableCell>
                                    <TableCell>{getStatusText(order.or_status)}</TableCell>
                                    <TableCell>{getPaymentMethod(order.payment)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}