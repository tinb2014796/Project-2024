import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import { CardGiftcard, Stars } from '@mui/icons-material';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const TradePoint = () => {
  const { customer } = usePage().props;
  
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Stars sx={{ color: '#FFD700', mr: 1, fontSize: 40 }} />
          <Typography variant="h5" fontWeight="bold">
            Điểm tích lũy của bạn: {customer.cus_points || 0} điểm
          </Typography>
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
                    Hết hạn: {new Date(voucher.s_end).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default TradePoint;