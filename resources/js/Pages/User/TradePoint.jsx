import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import { CardGiftcard, Stars } from '@mui/icons-material';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const TradePoint = () => {
  const { customer} = usePage().props;
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  console.log(customer);
  const vouchers = [
    {
      id: 1,
      name: 'Giảm giá 50.000đ',
      points: 25,
      value_max: 50000,
      value_min: 100000,
      description: 'Áp dụng cho đơn hàng từ 1.000.000đ'
    },
    {
      id: 2, 
      name: 'Giảm giá 100.000đ',
      points: 40,
      value_max: 100000,
      value_min: 1500000,
      description: 'Áp dụng cho đơn hàng từ 1.500.000đ'
    },
    {
      id: 3,
      name: 'Giảm giá 200.000đ',
      points: 50,
      value_max: 200000,
      value_min: 1800000,
      description: 'Áp dụng cho đơn hàng từ 1.800.000đ'
    }
  ];

  const handleTradePoints = (voucher) => {
    console.log(voucher);
    router.post('/user/trade-point', {
      name: voucher.name,
      points: voucher.points,
      description: voucher.description,
      value_max: voucher.value_max,
      value_min: voucher.value_min
    });
    setSelectedVoucher(voucher);
    alert('Đã đổi voucher thành công!');
    // Xử lý đổi điểm
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Stars sx={{ color: '#FFD700', mr: 1, fontSize: 40 }} />
          <Typography variant="h5" fontWeight="bold">
            Điểm tích lũy của bạn: {customer.cus_points || 0} điểm
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary" mb={4}>
          Sử dụng điểm tích lũy để đổi lấy các voucher giảm giá hấp dẫn
        </Typography>

        <Grid container spacing={3}>
          {vouchers.map((voucher) => (
            <Grid item xs={12} sm={6} md={4} key={voucher.id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CardGiftcard sx={{ color: '#FF4500', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {voucher.name}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" mb={2}>
                    {voucher.description}
                  </Typography>
                  <Typography variant="h6" color="#FF4500" fontWeight="bold">
                    {voucher.points} điểm
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={customer.cus_points < voucher.points }
                    onClick={() => handleTradePoints(voucher)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      backgroundColor: '#FF4500',
                      '&:hover': {
                        backgroundColor: '#FF6347'
                      }
                    }}
                  >
                    Đổi điểm
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default TradePoint;