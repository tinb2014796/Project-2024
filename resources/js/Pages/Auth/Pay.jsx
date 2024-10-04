import React from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup,ToggleButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

const Pays = () => {
    const [paymentMethod, setPaymentMethod] = React.useState('cod');

    const handlePaymentChange = (event, newPaymentMethod) => {
      if (newPaymentMethod !== null) {
        setPaymentMethod(newPaymentMethod);
      }
    };
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon color="error" />
          <Typography variant="h6" sx={{ ml: 1 }}>Địa Chỉ Nhận Hàng</Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Trần Nguyễn Trung Tín (+84) 935212148
        </Typography>
        <Typography variant="body2">
          333a, khu vực Phú Mỹ, Phường Thường Thạnh, Quận Cái Răng, Cần Thơ
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Chip label="Mặc Định" size="small" sx={{ mr: 1 }} />
          <Button variant="text" color="primary" size="small">Thay Đổi</Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Sản phẩm</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Đơn giá</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Số lượng</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Thành tiền</Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FavoriteIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Phụ Kiện - Đồ Dùng - Siêu Rẻ</Typography>
          <Button startIcon={<ChatIcon />} variant="outlined" size="small" sx={{ ml: 2 }}>
            Chat ngay
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/path-to-product-image.jpg"
              alt="Product"
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <Box>
              <Typography variant="body2">Ốp Lưng Realme C53 4G Chống Sốc Trong Su...</Typography>
              <Typography variant="caption" color="error">Đổi trả miễn phí 15 ngày</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">đ19.000</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">1</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">đ19.000</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">Bảo hiểm Rơi vỡ màn hình</Typography>
            <Typography variant="caption">
              Bảo vệ các rủi ro nứt vỡ do sự cố hoặc tai nạn cho màn hình của thiết bị di động được mua tại Shopee hoặc các kênh mua sắm khác. Tìm hiểu thêm
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">đ12.999</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">1</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">đ12.999</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Lưu ý cho Người bán..."
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">Đơn vị vận chuyển:</Typography>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Nhanh</Typography>
            <Typography variant="caption">Nhận hàng vào 18 Tháng 9 - 19 Tháng 9</Typography>
          </Box>
          <Button variant="text" color="primary" size="small">Thay Đổi</Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>Được đồng kiểm.</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1">Tổng số tiền (1 sản phẩm):</Typography>
          <Typography variant="h6" color="error">đ47.700</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>Phương thức thanh toán</Typography>
        <ToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={handlePaymentChange}
          aria-label="payment method"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="shopee" aria-label="Số dư TK Shopee">
            Số dư TK Shopee (₫0)
          </ToggleButton>
          <ToggleButton value="shopeepay" aria-label="Ví ShopeePay">
            Ví ShopeePay
          </ToggleButton>
          <ToggleButton value="credit" aria-label="Thẻ Tín dụng/Ghi nợ">
            Thẻ Tín dụng/Ghi nợ
          </ToggleButton>
          <ToggleButton value="googlepay" aria-label="Google Pay">
            Google Pay
          </ToggleButton>
          <ToggleButton value="cod" aria-label="Thanh toán khi nhận hàng">
            Thanh toán khi nhận hàng
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="body2" gutterBottom>
          Thanh toán khi nhận hàng
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Grid container justifyContent="flex-end">
            <Grid item xs={6}>
              <Typography variant="body2" align="right" gutterBottom>Tổng tiền hàng</Typography>
              <Typography variant="body2" align="right" gutterBottom>Phí vận chuyển</Typography>
              <Typography variant="h6" align="right" color="error" gutterBottom>Tổng thanh toán</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" align="right" gutterBottom>₫19.000</Typography>
              <Typography variant="body2" align="right" gutterBottom>₫28.700</Typography>
              <Typography variant="h6" align="right" color="error" gutterBottom>₫47.700</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <a href="#" style={{ color: 'blue' }}>Điều khoản Shopee</a>
          </Typography>
          <Button variant="contained" color="error" fullWidth sx={{ mt: 1 }}>
            Đặt hàng
          </Button>
        </Box>
      </Paper>
    </Box>
  );
  
};

export default Pays;

