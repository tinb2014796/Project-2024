import React from 'react';
import { Box, Typography, Button, Rating, Avatar, Grid, Chip } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

const ProductReview = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>ĐÁNH GIÁ SẢN PHẨM</Typography>
      
      <Box sx={{ bgcolor: '#fff9f3', p: 2, borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" color="error" sx={{ mr: 1 }}>4.8</Typography>
          <Typography variant="body2" color="text.secondary">trên 5</Typography>
        </Box>
        
        <Rating value={4.8} readOnly sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button variant="outlined" size="small">Tất Cả</Button>
          <Button variant="outlined" size="small">5 Sao (1,2k)</Button>
          <Button variant="outlined" size="small">4 Sao (70)</Button>
          <Button variant="outlined" size="small">3 Sao (17)</Button>
          <Button variant="outlined" size="small">2 Sao (12)</Button>
          <Button variant="outlined" size="small">1 Sao (17)</Button>
          <Button variant="outlined" size="small">Có Bình Luận (642)</Button>
          <Button variant="outlined" size="small">Có Hình Ảnh / Video (376)</Button>
        </Box>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ mr: 2 }}>H</Avatar>
          <Typography variant="subtitle1">hanh_nguyen1229</Typography>
        </Box>
        
        <Rating value={5} readOnly size="small" />
        
        <Typography variant="caption" color="text.secondary" display="block">
          2022-08-19 01:56 | Phân loại hàng: Trắng bluce switch
        </Typography>
        
        <Typography variant="body2" sx={{ my: 1 }}>
          Chất lượng sản phẩm: tốt
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          Shop giao hàng rất nhanh, đóng gói rất cẩn thận, bàn phím cơ độ này tốt, đèn led đẹp, mình rất hài lòng. Cho shop 5 sao và sẽ giới thiệu bạn bè mua bàn phím này.
        </Typography>
        
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid item key={item}>
              <Box
                component="img"
                src={`/path-to-image-${item}.jpg`}
                alt={`Review image ${item}`}
                sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            icon={<ThumbUpAltOutlinedIcon />}
            label="44"
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReview;