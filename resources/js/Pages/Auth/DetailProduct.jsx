
import React from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Rating, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, usePage } from "@inertiajs/react";


const ProductDetail = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
            <img src="/images/banphim.webp" alt="Bàn phím" style={{ width: '100%', height: 'auto' }} />
            <IconButton sx={{ position: 'absolute', top: '50%', left: 10 }}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', top: '50%', right: 10 }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <img src="/images/banphim.webp" alt="Ảnh nhỏ 1" style={{ width: '22%', height: 'auto' }} />
            <img src="/images/banphim.webp" alt="Ảnh nhỏ 2" style={{ width: '22%', height: 'auto' }} />
            <img src="/images/banphim.webp" alt="Ảnh nhỏ 3" style={{ width: '22%', height: 'auto' }} />
            <img src="/images/banphim.webp" alt="Ảnh nhỏ 4" style={{ width: '22%', height: 'auto' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button startIcon={<FavoriteIcon />} variant="outlined">
              Đã thích (986)
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Chip label="Yêu Thích+" color="error" size="small" />
          <Typography variant="h5" gutterBottom>
            Hotswap, Red switch - Bàn phím cơ K550 plus red switch, hotswap tặng kèm gấp và 2 switch, cực chống nhiễu , Combo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={4.8} readOnly precision={0.1} />
            <Typography variant="body2" sx={{ ml: 1 }}>4.8</Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>1,4k Đánh Giá</Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>3,6k Đã Bán</Typography>
          </Box>
          <Paper sx={{ p: 1, bgcolor: 'error.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">FLASH SALE</Typography>
            <Typography variant="body2">KẾT THÚC TRONG 05:05:12</Typography>
          </Paper>
          <Typography variant="h4" color="error" gutterBottom>
            đ179.000
          </Typography>
          <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
            đ219.000
          </Typography>
          <Chip label="18% GIẢM" color="error" size="small" />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Chính Sách Trả Hàng
          </Typography>
          <Typography variant="body2">
            Trả hàng 15 ngày Đổi ý miễn phí
          </Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
            Mua Kèm Deal Sốc
          </Button>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Bảo Hiểm
          </Typography>
          <Button variant="outlined" color="primary">
            Bảo hiểm Thiết bị điện tử
          </Button>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Vận Chuyển
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalShippingIcon color="primary" />
            <Typography variant="body2" sx={{ ml: 1 }}>Miễn phí vận chuyển</Typography>
          </Box>

        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;