import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Rating, IconButton, Divider, Container } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { usePage, router } from "@inertiajs/react";

const ProductDetail = () => {
  const { product, categories, brands, saleOffs } = usePage().props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerId, setCustomerId] = useState(JSON.parse(localStorage.getItem('customer'))?.id || 1);
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= product.p_quantity) {
      alert('Số lượng sản phẩm không đủ');
      return;
    }
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  const handleAddToCart = () => {
    if (!customerId) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
      return;
    }

    if (quantity > product.p_quantity) {
      alert('Số lượng sản phẩm không đủ');
      return;
    }

    const cart = {
      customer_id: customerId,
      product_id: product.id,
      quantity: quantity,
      discount: 0,
    };

    router.post('/user/cart', cart);
    alert('Thêm vào giỏ hàng thành công');
  };

  const handleBuyNow = () => {
    if (!customerId) {
      alert('Vui lòng đăng nhập để mua hàng');
      return;
    }

    if (quantity > product.p_quantity) {
      alert('Số lượng sản phẩm không đủ');
      return;
    }

    const cart = {
      customer_id: customerId,
      product_id: product.id,
      quantity: quantity,
      discount: 0,
    };

    router.post('/pay', cart);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const checkValidSaleOff = (sale) => {
    const currentDate = new Date();
    const startDate = new Date(sale.s_start);
    const endDate = new Date(sale.s_end);
    return currentDate >= startDate && currentDate <= endDate;
  };

  const validSaleOffs = product.sale_off ? product.sale_off.filter(sale => checkValidSaleOff(sale)) : [];

  const calculateDiscountedPrice = () => {
    if (validSaleOffs.length === 0) return product.p_selling;
    
    const maxDiscount = Math.max(...validSaleOffs.map(sale => sale.s_percent));
    const discountAmount = (product.p_selling * maxDiscount) / 100;
    return product.p_selling - discountAmount;
  };

  // Tính tổng số lượng đã bán
  const calculateTotalSold = () => {
    if (!product.order_details) return 0;
    
    return product.order_details.reduce((total, detail) => {
      if (detail.order && detail.order.or_status === '4') {
        return total + detail.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5f5', py: 2, marginBottom: 6, marginTop: 6 }}>
      <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ 
              position: 'relative',
              height: '450px',
              border: '1px solid #e8e8e8'
            }}>
              <img 
                src={product.images[currentImageIndex].ip_image} 
                alt={product.p_name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain'
                }} 
              />
              <IconButton 
                onClick={handlePrevImage} 
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: 10,
                  bgcolor: 'rgba(0,0,0,0.4)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton 
                onClick={handleNextImage} 
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  right: 10,
                  bgcolor: 'rgba(0,0,0,0.4)', 
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Paper>
            
            <Box sx={{ display: 'flex', mt: 2, gap: 1, overflowX: 'auto' }}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image.ip_image}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid #00bcd4' : '1px solid #e8e8e8',
                    '&:hover': { borderColor: '#00bcd4' },
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
                {product.p_name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={4.5} readOnly precision={0.5} />
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Đã bán {calculateTotalSold()}
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                mb: 2
              }}>
                {validSaleOffs.length > 0 ? (
                  <>
                    <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 500 }}>
                      {formatCurrency(calculateDiscountedPrice())}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        textDecoration: 'line-through',
                        color: '#757575'
                      }}
                    >
                      {formatCurrency(product.p_selling)}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h4" sx={{ color: '#00bcd4', fontWeight: 500 }}>
                    {formatCurrency(product.p_selling)}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2" color="text.secondary">
                      Vận chuyển
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ color: '#00bcd4', mr: 1 }} />
                      <Typography variant="body2">
                        Vận chuyển qua GHN
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2" color="text.secondary">
                      Danh mục
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">
                      {categories.find(cat => cat.id === product.c_id)?.c_name || 'Không xác định'}
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2" color="text.secondary">
                      Thương hiệu
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">
                      {brands.find(brand => brand.id === product.b_id)?.b_name || 'Không xác định'}
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body2" color="text.secondary">
                      Khuyến mãi
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {validSaleOffs.length > 0 ? (
                      <Typography variant="body2">
                        Giảm {Math.max(...validSaleOffs.map(sale => sale.s_percent))}%
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        Không có khuyến mãi
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body2" color="text.secondary">
                      Số lượng
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button 
                        variant="outlined" 
                        onClick={handleDecreaseQuantity}
                        sx={{ 
                          minWidth: 'unset',
                          p: 0,
                          width: 32,
                          height: 32,
                          borderColor: '#e0e0e0',
                          color: '#00bcd4'
                        }}
                      >
                        -
                      </Button>
                      <Typography sx={{ mx: 2, minWidth: 40, textAlign: 'center' }}>
                        {quantity}
                      </Typography>
                      <Button 
                        variant="outlined"
                        onClick={handleIncreaseQuantity}
                        sx={{ 
                          minWidth: 'unset',
                          p: 0,
                          width: 32,
                          height: 32,
                          borderColor: '#e0e0e0',
                          color: '#00bcd4'
                        }}
                      >
                        +
                      </Button>
                      <Typography variant="body2" sx={{ ml: 2, color: '#757575' }}>
                        {product.p_quantity} sản phẩm có sẵn
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    height: 48,
                    borderColor: '#00bcd4',
                    color: '#00bcd4',
                    '&:hover': {
                      borderColor: '#00acc1',
                      bgcolor: 'rgba(0, 188, 212, 0.04)'
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="contained"
                  onClick={handleBuyNow}
                  sx={{
                    flex: 1,
                    height: 48,
                    bgcolor: '#00bcd4',
                    '&:hover': {
                      bgcolor: '#00acc1'
                    }
                  }}
                >
                  Mua ngay
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2, bgcolor: '#fff', p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          MÔ TẢ SẢN PHẨM
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {product.p_description}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetail;