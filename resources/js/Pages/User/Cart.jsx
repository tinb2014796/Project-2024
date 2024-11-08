import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Box, Typography, Paper, Button, Checkbox, TextField, IconButton, Snackbar, Alert } from '@mui/material';
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
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    
    if (selectedProducts.length === 0) {
      setOpenSnackbar(true);
      return;
    }

    const selectedCarts = carts.filter(cart => selectedItems[cart.id]);
    const data = {
      customer_id: selectedCarts[0].customer_id,
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
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 2 }}>
      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'white' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <ShoppingCartIcon sx={{ color: '#ee4d2d', fontSize: 32, marginRight: 2 }} />
            <Typography variant="h6" sx={{ color: '#222', fontWeight: 500 }}>Giỏ Hàng</Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ width: '30%' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Tìm kiếm sản phẩm"
              sx={{ 
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '2px',
                  '&:hover fieldset': {
                    borderColor: '#ee4d2d',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ee4d2d',
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ color: '#ee4d2d' }}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </Paper>
      
      <Paper elevation={0} sx={{ bgcolor: 'white' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #f5f5f5' }}>
          <Grid container alignItems="center">
            <Grid item xs={1}><Checkbox sx={{ color: '#ee4d2d', '&.Mui-checked': { color: '#ee4d2d' } }}/></Grid>
            <Grid item xs={4}><Typography sx={{ color: '#222' }}>Sản Phẩm</Typography></Grid>
            <Grid item xs={1}><Typography sx={{ color: '#222' }}>Đơn Giá</Typography></Grid>
            <Grid item xs={1}><Typography sx={{ color: '#222' }}>Giảm Giá</Typography></Grid>
            <Grid item xs={2}><Typography sx={{ color: '#222' }}>Số Lượng</Typography></Grid>
            <Grid item xs={1}><Typography sx={{ color: '#222' }}>Số Tiền</Typography></Grid>
            <Grid item xs={2}><Typography sx={{ color: '#222' }}>Thao Tác</Typography></Grid>
          </Grid>
        </Box>
        
        {carts.map((item, index) => (
          <Box key={index} sx={{ p: 2, borderBottom: '1px solid #f5f5f5' }}>
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <Checkbox 
                  checked={selectedItems[item.id] || false} 
                  onChange={() => handleCheckboxChange(item.id)}
                  sx={{ color: '#ee4d2d', '&.Mui-checked': { color: '#ee4d2d' } }}
                />
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <img 
                    src={item.product.images[0].ip_image} 
                    alt={item.product.p_name} 
                    style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16 }} 
                  />
                  <Box>
                    <Typography sx={{ color: '#222', mb: 1 }}>{item.product.p_name}</Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>{item.product.p_description}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ color: '#929292' }}>₫{parseFloat(item.product.p_selling).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ color: '#ee4d2d' }}>
                  {item.product.sale_off?.[0]?.s_percent || 0}%
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" alignItems="center">
                  <IconButton 
                    size="small" 
                    onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                    sx={{ border: '1px solid #e8e8e8' }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField 
                    value={quantities[item.id]} 
                    size="small" 
                    sx={{ 
                      width: 40, 
                      mx: 1,
                      '& .MuiOutlinedInput-root': {
                        height: '32px',
                      }
                    }} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                    sx={{ border: '1px solid #e8e8e8' }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ color: '#ee4d2d', fontWeight: 500 }}>
                  ₫{Math.round(parseFloat(item.product.p_selling) * quantities[item.id] * (1 - (item.product.sale_off?.[0]?.s_percent || 0)/100)).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button 
                  onClick={deleteCart}
                  sx={{ 
                    color: '#222',
                    '&:hover': {
                      color: '#ee4d2d',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Xóa
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
        
        <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'white', borderTop: '1px solid #f5f5f5', p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Checkbox sx={{ color: '#ee4d2d', '&.Mui-checked': { color: '#ee4d2d' } }}/>
              <Typography sx={{ color: '#222', mr: 2 }}>Chọn Tất Cả</Typography>
              <Button 
                onClick={deleteCart}
                sx={{ 
                  color: '#222',
                  '&:hover': {
                    color: '#ee4d2d',
                    bgcolor: 'transparent'
                  }
                }}
              >
                Xóa
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              <Box mr={3}>
                <Typography sx={{ color: '#222' }}>
                  Tổng thanh toán ({Object.keys(selectedItems).filter(id => selectedItems[id]).length} sản phẩm):
                  <Typography component="span" sx={{ color: '#ee4d2d', fontSize: '20px', ml: 1, fontWeight: 500 }}>
                    ₫{calculateTotalPrice().toLocaleString()}
                  </Typography>
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                onClick={handleBuySelected}
                sx={{
                  bgcolor: '#ee4d2d',
                  '&:hover': {
                    bgcolor: '#d73211'
                  },
                  px: 4
                }}
              >
                Mua Hàng
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
          Vui lòng chọn sản phẩm trước khi mua hàng
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
