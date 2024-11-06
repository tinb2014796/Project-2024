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
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '600px' }}>
              <img 
                src={product.images[currentImageIndex].ip_image} 
                alt={product.p_name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  imageRendering: 'high-quality',
                  backgroundColor: '#fff'
                }} 
              />
              <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexWrap: 'wrap', gap: 1 }}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image.ip_image}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fff',
                    padding: '4px',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    },
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#333' }}>
              {product.p_name}
            </Typography>
            {validSaleOffs.length > 0 ? (
              <>
                <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatCurrency(product.p_selling)}
                </Typography>
                <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
                  {formatCurrency(calculateDiscountedPrice())}
                </Typography>
              </>
            ) : (
              <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
                {formatCurrency(product.p_selling)}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={4.5} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>(50 đánh giá)</Typography>
            </Box>
            <Typography variant="body2" gutterBottom>
              Danh mục: <Chip label={categories.find(cat => cat.id === product.c_id)?.c_name || 'Không xác định'} size="small" sx={{ backgroundColor: '#e0e0e0' }} />
            </Typography>
            <Typography variant="body2" gutterBottom>
              Thương hiệu: <Chip label={brands.find(brand => brand.id === product.b_id)?.b_name || 'Không xác định'} size="small" sx={{ backgroundColor: '#e0e0e0' }} />
            </Typography>
            <Typography variant="body2" gutterBottom>
              Khuyến mãi: {validSaleOffs.length > 0 ? validSaleOffs.map((sale, index) => (
                <Chip 
                  key={index}
                  label={`Giảm ${sale.s_percent}%`} 
                  size="small" 
                  color="error"
                  sx={{ ml: 1 }}
                />
              )) : <Typography component="span" sx={{ ml: 1, color: '#666' }}>Không có khuyến mãi</Typography>}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {product.p_description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>Số lượng:</Typography>
              <Button variant="outlined" onClick={handleDecreaseQuantity}>-</Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button variant="outlined" onClick={handleIncreaseQuantity}>+</Button>
              <Typography variant="body2" sx={{ ml: 2, color: '#666' }}>
                ({product.p_quantity} sản phẩm có sẵn)
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<ShoppingCartIcon />} 
                sx={{ mr: 2 }} 
                onClick={handleAddToCart}
                disabled={product.p_quantity === 0}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleBuyNow}
                disabled={product.p_quantity === 0}
              >
                Mua ngay
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShippingIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>Miễn phí vận chuyển</Typography>
            </Box>
            <Divider sx={{ my: 2 }} /> 
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        Mô tả sản phẩm
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: '#666', lineHeight: 1.6 }}>
        {product.p_description}
      </Typography>
    </Container>
  );
};

export default ProductDetail;