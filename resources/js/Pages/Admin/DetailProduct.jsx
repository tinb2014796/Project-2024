import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Chip, Rating, IconButton, Divider, Container, Modal, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePage, router } from "@inertiajs/react";
import EditProductModal from '../../Components/EditProductModal';

const ProductDetail = () => {
  const { product, categories, brands, saleOffs, ratings, average_rating, totalSold } = usePage().props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openAddImageModal, setOpenAddImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  const handleOpenAddImageModal = () => setOpenAddImageModal(true);
  const handleCloseAddImageModal = () => {
    setOpenAddImageModal(false);
    setSelectedImage(null);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleAddImage = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('product_id', product.id);

      router.post('/admin/add-product-image', formData, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: handleCloseAddImageModal,
      });
    }
  };

  const handleDeleteProduct = () => {
    router.delete(`/admin/products/delete/${product.id}`, {
      onSuccess: () => router.visit('/admin/products'),
    });
  };

  const handleEditProduct = (editedProduct) => {
    router.post(`/admin/products/edit/${product.id}`, editedProduct, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setEditModalOpen(false),
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#f5f5f5', py: 2 }}>
      <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
        <Grid container spacing={2}>
          {/* Phần hình ảnh bên trái */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ position: 'relative', borderRadius: '2px', height: '450px' }}>
              <img src={product.images[currentImageIndex].ip_image} alt={product.p_name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 10, bgcolor: 'rgba(0,0,0,0.4)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 10, bgcolor: 'rgba(0,0,0,0.4)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}>
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
                    border: currentImageIndex === index ? '2px solid #ee4d2d' : '1px solid #e8e8e8',
                    '&:hover': { borderColor: '#ee4d2d' },
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          </Grid>

          {/* Phần thông tin bên phải */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 400, mb: 1 }}>
                {product.p_name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Rating value={product.average_rating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.secondary">
                  {product.average_rating} / 5
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary">{ratings.length} Đánh Giá</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color="text.secondary"> Còn lại {product.p_quantity}</Typography>
                <Typography variant="body2" color="text.secondary"> Đã Bán {totalSold}</Typography>
              </Box>

              <Box sx={{ bgcolor: '#fafafa', p: 2, mb: 2 }}>
                <Typography variant="h4" color="#ee4d2d" sx={{ fontWeight: 500 }}>
                  {formatCurrency(product.p_purchase)}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Danh Mục</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Chip 
                    label={categories.find(cat => cat.id === product.c_id)?.c_name || 'Không xác định'} 
                    size="small" 
                    sx={{ bgcolor: '#f5f5f5' }} 
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Thương Hiệu</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Chip 
                    label={brands.find(brand => brand.id === product.b_id)?.b_name || 'Không xác định'} 
                    size="small" 
                    sx={{ bgcolor: '#f5f5f5' }} 
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Khuyến Mãi</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Chip 
                    label={saleOffs.find(sale => sale.id === product.s_id)?.s_name || 'Không có khuyến mãi'} 
                    size="small" 
                    sx={{ bgcolor: '#f5f5f5' }} 
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />} 
                  onClick={() => setEditModalOpen(true)}
                  sx={{ 
                    bgcolor: '#ee4d2d',
                    '&:hover': { bgcolor: '#d73211' },
                    flex: 1
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={handleOpenAddImageModal}
                  sx={{ 
                    bgcolor: '#ee4d2d',
                    '&:hover': { bgcolor: '#d73211' },
                    flex: 1
                  }}
                >
                  Thêm ảnh
                </Button>
                <Button 
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleOpenDeleteModal}
                  sx={{ flex: 1 }}
                >
                  Xóa
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: 'white', mt: 2, p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          MÔ TẢ CHI TIẾT
        </Typography>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {product.p_description}
          </Typography>
        </Box>
      </Box>

      {/* Phần đánh giá sản phẩm */}
      <Box sx={{ bgcolor: 'white', mt: 2, p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          ĐÁNH GIÁ SẢN PHẨM
        </Typography>
        <Box sx={{ p: 2 }}>
          {ratings.map((rating, index) => (
            <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="subtitle2">
                  {rating.customer.cus_familyname} {rating.customer.cus_name}
                </Typography>
                <Rating value={rating.ra_score} readOnly size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {rating.ra_comment}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={product}
        onEdit={handleEditProduct}
        categories={categories}
        brands={brands}
        saleOffs={saleOffs}
      />

      <Modal open={openAddImageModal} onClose={handleCloseAddImageModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Thêm ảnh sản phẩm
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            style={{ marginBottom: '16px' }}
          />
          <Button 
            variant="contained" 
            onClick={handleAddImage} 
            disabled={!selectedImage} 
            fullWidth
            sx={{ bgcolor: '#ee4d2d', '&:hover': { bgcolor: '#d73211' } }}
          >
            Thêm ảnh
          </Button>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Xác nhận xóa sản phẩm
          </Typography>
          <Typography variant="body1" gutterBottom>
            Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleCloseDeleteModal} sx={{ mr: 2 }}>
              Hủy
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleDeleteProduct}
              sx={{ bgcolor: '#ee4d2d', '&:hover': { bgcolor: '#d73211' } }}
            >
              Xóa sản phẩm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetail;