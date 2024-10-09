import React from 'react';
import { Grid, Box, Typography, Paper, Button, Checkbox, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { usePage, router } from "@inertiajs/react";

const Cart = () => {
  const { carts } = usePage().props;
  console.log(carts);

const deleteCart = (id) => {
  router.delete(`/user/cart/product/${id}`);
  console.log(id);
}

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
          
          {carts.map((item, index) => (
            <Grid key={index} item container xs={12} alignItems="center">
              <Grid item xs={1}><Checkbox /></Grid>
              <Grid item xs={5}>
                <Box display="flex" alignItems="center">
                  <img src={item.product.images[0].ip_image} alt={item.product.p_name} style={{ width: 80, height: 80, marginRight: 16 }} />
                  <Box>
                    <Typography variant="body1">{item.product.p_name}</Typography>
                    <Typography variant="body2">{item.product.p_description}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1">₫{parseFloat(item.product.p_selling).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" alignItems="center">
                  <IconButton size="small"><RemoveIcon /></IconButton>
                  <TextField value={item.quantity} size="small" sx={{ width: 40, mx: 1 }} readOnly />
                  <IconButton size="small"><AddIcon /></IconButton>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" color="error">
                  ₫{(parseFloat(item.product.p_selling) * item.quantity).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button variant="text" color="error" onClick={() => deleteCart(item.id)}>Xóa</Button>
                <Button variant="text" color="primary">Tìm sản phẩm tương tự</Button>
              </Grid>
            </Grid>
          ))}
          
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
