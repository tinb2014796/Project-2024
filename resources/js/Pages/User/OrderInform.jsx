import { useState } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { usePage, Link } from '@inertiajs/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderInform = () => {
    const { orders } = usePage().props
    console.log(orders);
    const calculateTotal = () => {
        const subtotal = orders.order_details?.reduce((total, item) => {
            return total + (item.quantity * parseInt(item.total/item.quantity));
        }, 0) || 0;
        
        const totalDiscount = 76000 + 52000;
        
        return subtotal - totalDiscount - (orders.or_discount || 0);
    };
    
    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '90vh', py: 4 }}>
            <Box sx={{ width: '80%', maxWidth: 1000, mx: 'auto' }}>
                <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        <CheckCircleIcon sx={{ color: '#ee4d2d', fontSize: 40, mr: 2 }} />
                        <Typography variant='h5' sx={{ color: '#ee4d2d', fontWeight: 500 }}>
                            Đặt hàng thành công
                        </Typography>
                    </Box>

                    <Box sx={{ bgcolor: '#fafafa', p: 2, borderRadius: 1, mb: 3 }}>
                        <Typography variant='subtitle1' sx={{ color: '#222', mb: 1 }}>
                            Cảm ơn bạn đã mua hàng!
                        </Typography>
                        <Typography variant='body2' sx={{ color: '#757575' }}>
                            Mã đơn hàng của bạn là: <strong>#{orders.id}</strong>
                        </Typography>
                    </Box>

                    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e8e8e8', mb: 3 }}>
                        <Typography variant='h6' sx={{ mb: 2, color: '#222' }}>Thông tin đơn hàng</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ '& .MuiTypography-root': { mb: 1, color: '#222' } }}>
                                    <Typography variant='body1'>Người nhận: <strong>{orders.customer?.cus_name} {orders.customer?.cus_familyname}</strong></Typography>
                                    <Typography variant='body1'>Số điện thoại: {orders.customer?.cus_sdt}</Typography>
                                    <Typography variant='body1'>Địa chỉ: {orders.customer?.cus_address}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ '& .MuiTypography-root': { mb: 1, color: '#222' } }}>
                                    <Typography variant='body1'>Phương thức thanh toán: <strong>{orders.payment?.pa_type}</strong></Typography>
                                    <Typography variant='body1'>Ngày đặt: {new Date(orders.or_date).toLocaleDateString('vi-VN')}</Typography>
                                    <Typography variant='body1'>Trạng thái: <span style={{ color: '#ee4d2d' }}>{orders.or_status === 0 ? "Chờ xử lý" : "Đã xử lý"}</span></Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={0} sx={{ p: 3, border: '1px solid #e8e8e8' }}>
                        <Typography variant='h6' sx={{ mb: 3, color: '#222' }}>Chi tiết đơn hàng</Typography>
                        {orders.order_details?.map((item, index) => (
                            <Box key={index} sx={{ 
                                display: 'flex', 
                                py: 2,
                                borderBottom: index !== orders.order_details.length - 1 ? '1px solid #f5f5f5' : 'none'
                            }}>
                                <img 
                                    src={item.images[0]?.ip_image} 
                                    alt={item.product?.p_name}
                                    style={{ 
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginRight: '16px'
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant='subtitle1' sx={{ mb: 1 }}>{item.product?.p_name}</Typography>
                                    <Typography variant='body2' sx={{ color: '#757575' }}>Số lượng: x{item.quantity}</Typography>
                                    <Typography variant='body2' sx={{ color: '#ee4d2d' }}>{parseInt(item.total/item.quantity).toLocaleString()}đ</Typography>
                                    {item.discount > 0 && (
                                        <Typography variant='body2' sx={{ color: '#00C853' }}>
                                            Giảm giá: -{parseInt(item.discount).toLocaleString()}đ
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                        
                        <Box sx={{ 
                            mt: 3, 
                            pt: 2, 
                            borderTop: '1px solid #f5f5f5',
                            textAlign: 'right' 
                        }}>
                            <Typography variant='body1' sx={{ mb: 1 }}>
                                Tổng tiền hàng: {(1280000).toLocaleString()}đ
                            </Typography>
                            <Typography variant='body1' sx={{ color: '#00C853', mb: 1 }}>
                                Giảm giá: -{(128000).toLocaleString()}đ
                            </Typography>
                            {orders.or_discount > 0 && (
                                <Typography variant='body1' sx={{ color: '#00C853', mb: 1 }}>
                                    Voucher: -{parseInt(orders.or_discount).toLocaleString()}đ
                                </Typography>
                            )}
                            <Typography variant='h6' sx={{ color: '#ee4d2d' }}>
                                Thành tiền: {calculateTotal().toLocaleString()}đ
                            </Typography>
                        </Box>
                    </Paper>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Link href="/user/order-success">
                            <Button 
                                variant="contained" 
                                sx={{ 
                                    bgcolor: '#ee4d2d',
                                    '&:hover': {
                                        bgcolor: '#d73211'
                                    },
                                    mr: 2
                                }}
                            >
                                Theo dõi đơn hàng
                            </Button>
                        </Link>
                        <Link href="/user/home">
                            <Button 
                                variant="outlined"
                                sx={{
                                    color: '#ee4d2d',
                                    borderColor: '#ee4d2d',
                                    '&:hover': {
                                        borderColor: '#d73211'
                                    }
                                }}
                            >
                                Tiếp tục mua sắm 
                            </Button>
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )   
}

export default OrderInform;
