import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import axios from 'axios';

const FollowOrder = () => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.post(
                    'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
                    {
                        order_code: "LDV9K7" // Mã đơn hàng cần theo dõi
                    },
                    {
                        headers: {
                            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                            'ShopId': '195215', 
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.code === 200) {
                    setOrderDetail(response.data.data);
                } else {
                    setError('Không thể lấy thông tin đơn hàng');
                }
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy thông tin đơn hàng');
                console.error('Lỗi:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, []);
    console.log(orderDetail);
    if (loading) return <Typography>Đang tải...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Thông Tin Đơn Hàng
                </Typography>
                
                {orderDetail && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>
                                <strong>Mã đơn hàng:</strong> {orderDetail.order_code}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <strong>Trạng thái:</strong> {orderDetail.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <strong>Địa chỉ giao hàng:</strong> {orderDetail.to_address}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <strong>Thời gian dự kiến:</strong> {orderDetail.expected_delivery_time}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Box>
    );
};

export default FollowOrder;
