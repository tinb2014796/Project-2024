import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Button, Checkbox, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 325000;

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const totalAmount = quantity * price;

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, m: 2, mb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ShoppingCartIcon sx={{ fontSize: 50, marginRight: 2 }} />
            <Typography variant="h5">Nghệ Shop | Giỏ hàng</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ width: '30%' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Tìm kiếm sản phẩm"
              sx={{ 
                width: '100%'
              }}
              InputProps={{
                endAdornment: (
                  <IconButton color="primary" aria-label="tìm kiếm">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2, m: 2, mt: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item container xs={12} alignItems="center">
            <Grid item xs={1}><Checkbox /></Grid>
            <Grid item xs={5}><Typography variant="subtitle1">Sản Phẩm</Typography></Grid>
            <Grid item xs={1}><Typography variant="subtitle1">Đơn Giá</Typography></Grid>
            <Grid item xs={2}><Typography variant="subtitle1">Số Lượng</Typography></Grid>
            <Grid item xs={1}><Typography variant="subtitle1">Số Tiền</Typography></Grid>
            <Grid item xs={2}><Typography variant="subtitle1">Thao Tác</Typography></Grid>
          </Grid>
          
          <Grid item container xs={12} alignItems="center">
            <Grid item xs={1}><Checkbox /></Grid>
            <Grid item xs={5}>
              <Box display="flex" alignItems="center">
                <img src="/images/banphim.webp" alt="Bàn phím" style={{ width: 80, height: 80, marginRight: 16 }} />
                <Box>
                  <Typography variant="body1">Bàn Phím Cơ Máy Tính Gaming K550 Pro Full Led 7 Chế Độ Hi...</Typography>
                  <Typography variant="body2">Phân Loại Hàng: Đen,Blue Switch</Typography>
                  <Typography variant="body2" color="error">Đổi ý miễn phí 15 ngày</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>₫598.000</Typography>
              <Typography variant="body1">₫{price.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Box display="flex" alignItems="center">
                <IconButton size="small" onClick={handleDecrease}><RemoveIcon /></IconButton>
                <TextField value={quantity} size="small" sx={{ width: 40, mx: 1 }} readOnly />
                <IconButton size="small" onClick={handleIncrease}><AddIcon /></IconButton>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body1" color="error">₫{totalAmount.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="text" color="error">Xóa</Button>
              <Button variant="text" color="primary">Tìm sản phẩm tương tự</Button>
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Box bgcolor="#f5f5f5" p={2}>
              <Typography variant="body2">
                Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0; Giảm ₫500.000 phí vận chuyển đơn tối thiểu ₫500.000
                <Button variant="text" color="primary" size="small">Tìm hiểu thêm</Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Cart;
