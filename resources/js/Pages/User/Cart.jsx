import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Box, Typography, Paper, Button, Checkbox, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { usePage, router } from "@inertiajs/react";
import debounce from 'lodash/debounce';

const Cart = () => {

  const { carts } = usePage().props;
  const [quantities, setQuantities] = useState(carts.reduce((acc, item) => ({...acc, [item.id]: item.quantity}), {}));
  const [selectedItems, setSelectedItems] = useState({});

  console.log(carts);

  const deleteCart = () => {
    const itemsToDelete = Object.keys(selectedItems).filter(id => selectedItems[id]);
    itemsToDelete.forEach(id => {
      router.delete(`/user/cart/product/${id}`);
    });
  }

  const debouncedUpdate = useCallback(
    debounce((id, newQuantity) => {
      router.post('/user/cart/update', { id, quantity: newQuantity });
    }, 2000),
    []
  );

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities(prevQuantities => ({...prevQuantities, [id]: newQuantity}));
      debouncedUpdate(id, newQuantity);
    }
  }

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => ({...prev, [id]: !prev[id]}));
  }

  const handleBuySelected = () => {
    const selectedProducts = Object.keys(selectedItems).filter(id => selectedItems[id]);
    const selectedCarts = carts.filter(cart => selectedItems[cart.id]);
    const data = {
      customer_id: 1,
      products: selectedCarts.map(cart => ({
        id: cart.product.id,
        quantity: quantities[cart.id],
        price: parseFloat(cart.product.p_selling)
      })),
      total: calculateTotalPrice()
    }
    console.log(data);
    router.post('/user/pay', data);
  }

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const calculateTotalPrice = () => {
    let total = 0;
    carts.forEach(item => {
      if (selectedItems[item.id]) {
        const discount = item.product.sale_off?.[0]?.s_percent || 0;
        const price = parseFloat(item.product.p_selling);
        const quantity = quantities[item.id];
        const discountedPrice = price * (1 - discount/100);
        total += discountedPrice * quantity;
      }
    });
    return Math.round(total);
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, m: 2, mb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ShoppingCartIcon sx={{ color: '#FFCC33', fontSize: 50, marginRight: 2 }} />
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
            <Grid item xs={4}><Typography variant="subtitle1">Sản Phẩm</Typography></Grid>
            <Grid item xs={1}><Typography variant="subtitle1">Đơn Giá</Typography></Grid>
            <Grid item xs={1}><Typography variant="subtitle1">Khuyến Mãi</Typography></Grid>
            <Grid item xs={2}><Typography variant="subtitle1">Số Lượng</Typography></Grid>
            <Grid item xs={1}><Typography variant="subtitle1">Số Tiền</Typography></Grid>
            <Grid item xs={2}><Typography variant="subtitle1">Thao Tác</Typography></Grid>
          </Grid>
          
          {carts.map((item, index) => (
            <Grid key={index} item container xs={12} alignItems="center">
              <Grid item xs={1}><Checkbox checked={selectedItems[item.id] || false} onChange={() => handleCheckboxChange(item.id)} /></Grid>
              <Grid item xs={4}>
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
              <Grid item xs={1}>
                <Typography variant="body1" color="error">
                  {item.product.sale_off?.[0]?.s_percent || 0}%
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}><RemoveIcon /></IconButton>
                  <TextField 
                    value={quantities[item.id]} 
                    size="small" 
                    sx={{ width: 40, mx: 1 }} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  />
                  <IconButton size="small" onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}><AddIcon /></IconButton>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body1" color="error">
                  ₫{Math.round(parseFloat(item.product.p_selling) * quantities[item.id] * (1 - (item.product.sale_off?.[0]?.s_percent || 0)/100)).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button variant="text" color="error" onClick={deleteCart}>Xóa</Button>
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
          
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Typography variant="h6" color="error">
                Tổng tiền: ₫{calculateTotalPrice().toLocaleString()}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleBuySelected} >
                Mua hàng đã chọn
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Cart;
