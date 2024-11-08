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
    if (quantity < product.p_quantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
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

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#fff', py: 4, borderRadius: 2, boxShadow: 2, marginBottom: 6, marginTop: 6 }}>
      <Box sx={{ py: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={5} sx={{ 
              p: 2, 
              position: 'relative', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              height: '500px',
              backgroundColor: '#f8f9fa'
            }}>
              <img 
                src={product.images[currentImageIndex].ip_image} 
                alt={product.p_name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }} 
              />
              <IconButton 
                onClick={handlePrevImage} 
                sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: 10, 
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)'
                  }
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
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,1)'
                  }
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Paper>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 2, 
              gap: 1,
              flexWrap: 'wrap'
            }}>
              {product.images.map((image, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    p: 0.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transform: currentImageIndex === index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <img
                    src={image.ip_image}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'contain',
                      borderRadius: 8
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                </Paper>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#2c3e50',
                  mb: 2
                }}
              >
                {product.p_name}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {validSaleOffs.length > 0 ? (
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        textDecoration: 'line-through',
                        color: '#95a5a6'
                      }}
                    >
                      {formatCurrency(product.p_selling)}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#e74c3c',
                        fontWeight: 600
                      }}
                    >
                      {formatCurrency(calculateDiscountedPrice())}
                    </Typography>
                  </Box>
                ) : (
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#e74c3c',
                      fontWeight: 600
                    }}
                  >
                    {formatCurrency(product.p_selling)}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Rating 
                  value={4.5} 
                  readOnly 
                  precision={0.5}
                  sx={{ color: '#f1c40f' }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 1, 
                    color: '#7f8c8d',
                    display: 'inline'
                  }}
                >
                  (50 đánh giá)
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Danh mục: 
                  <Chip 
                    label={categories.find(cat => cat.id === product.c_id)?.c_name || 'Không xác định'} 
                    sx={{ 
                      ml: 1,
                      backgroundColor: '#3498db',
                      color: 'white'
                    }} 
                  />
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  Thương hiệu:
                  <Chip 
                    label={brands.find(brand => brand.id === product.b_id)?.b_name || 'Không xác định'} 
                    sx={{ 
                      ml: 1,
                      backgroundColor: '#2ecc71',
                      color: 'white'
                    }}
                  />
                </Typography>

                {validSaleOffs.length > 0 && (
                  <Typography variant="body1">
                    Khuyến mãi:
                    {validSaleOffs.map((sale, index) => (
                      <Chip 
                        key={index}
                        label={`Giảm ${sale.s_percent}%`} 
                        sx={{ 
                          ml: 1,
                          backgroundColor: '#e74c3c',
                          color: 'white'
                        }}
                      />
                    ))}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {product.p_description}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 3,
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: 2
              }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Số lượng:</Typography>
                <Button 
                  variant="outlined" 
                  onClick={handleDecreaseQuantity}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '50%'
                  }}
                >
                  -
                </Button>
                <Typography sx={{ mx: 3, fontSize: '1.2rem' }}>{quantity}</Typography>
                <Button 
                  variant="outlined" 
                  onClick={handleIncreaseQuantity}
                  sx={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '50%'
                  }}
                >
                  +
                </Button>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 2, 
                    color: product.p_quantity > 0 ? '#27ae60' : '#e74c3c'
                  }}
                >
                  ({product.p_quantity} sản phẩm có sẵn)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant="contained" 
                  startIcon={<ShoppingCartIcon />} 
                  onClick={handleAddToCart}
                  disabled={product.p_quantity === 0}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    backgroundColor: '#3498db',
                    '&:hover': {
                      backgroundColor: '#2980b9'
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleBuyNow}
                  disabled={product.p_quantity === 0}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    backgroundColor: '#e74c3c',
                    '&:hover': {
                      backgroundColor: '#c0392b'
                    }
                  }}
                >
                  Mua ngay
                </Button>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: 2
              }}>
                <LocalShippingIcon sx={{ color: '#3498db' }} />
                <Typography variant="body1" sx={{ ml: 1, color: '#2c3e50' }}>
                  Miễn phí vận chuyển toàn quốc
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            color: '#2c3e50',
            fontWeight: 600,
            mb: 2
          }}
        >
          Mô tả sản phẩm
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#34495e',
            lineHeight: 1.8
          }}
        >
          {product.p_description}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetail;