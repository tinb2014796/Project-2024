import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CardGiftcard, Stars } from '@mui/icons-material';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const TradePoint = () => {
  const { customer } = usePage().props;
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  
  const [vouchers] = useState([
    {
      id: 1,
      name: 'Giảm giá 50.000đ',
      points: 25,
      value_max: 50000,
      value_min: 100000,
      description: 'Áp dụng cho đơn hàng từ 200.000đ'
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
  ]);

  const handleTradePoints = (voucher) => {
    router.post('/user/trade-point', {
      name: voucher.name,
      points: voucher.points,
      description: voucher.description,
      value_max: voucher.value_max,
      value_min: voucher.value_min
    });
    alert('Đã đổi voucher thành công!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <Stars sx={{ color: '#FFD700', mr: 1, fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold">
              Điểm tích lũy của bạn: { customer.cus_points || 0} điểm
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00BCD4',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00ACC1'
              },
              borderRadius: '20px',
              padding: '4px 16px'
            }}
            onClick={() => setOpenVoucherModal(true)}
          >
            Đổi Voucher
          </Button>
        </Box>
        
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Voucher của bạn
        </Typography>

        <Grid container spacing={3} mb={4}>
          {customer.sale_offs && customer.sale_offs.map((voucher) => (
            <Grid item xs={12} sm={6} md={4} key={voucher.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5'
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CardGiftcard sx={{ color: '#4CAF50', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {voucher.s_name}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" mb={2}>
                    {voucher.s_description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mã: {voucher.s_code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hết hạn: {formatDate(voucher.s_end)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog 
        open={openVoucherModal}
        onClose={() => setOpenVoucherModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#00BCD4', color: 'white' }}>
          <Box display="flex" alignItems="center">
            <CardGiftcard sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Kho Voucher</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Điểm tích lũy hiện tại: <span style={{ color: '#00BCD4', fontWeight: 'bold' }}>{customer.cus_points || 0} điểm</span>
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {vouchers.map((voucher) => (
                <Grid item xs={12} sm={6} md={4} key={voucher.id}>
                  <Paper 
                    elevation={3}
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                        {voucher.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {voucher.description}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                        {voucher.points} điểm
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: '#00BCD4',
                        '&:hover': {
                          backgroundColor: '#00ACC1'
                        },
                        borderRadius: '20px'
                      }}
                      disabled={customer.cus_points < voucher.points}
                      onClick={() => handleTradePoints(voucher)}
                    >
                      {'Đổi ngay'}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVoucherModal(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TradePoint;