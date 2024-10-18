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
  const { product, categories, brands, saleOffs } = usePage().props;
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '600px' }}>
              <img src={product.images[currentImageIndex].ip_image} alt={product.p_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', top: '50%', left: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 10, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexWrap: 'wrap' }}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image.ip_image}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: '8px',
                    m: 0.5,
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid #1976d2' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
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
            <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
              đ{product.p_purchase.toLocaleString()}
            </Typography>
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
              Cửa hàng: <Chip label={product.s_id} size="small" sx={{ backgroundColor: '#e0e0e0' }} />
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditModalOpen(true)} sx={{ flex: 1 }}>
                Chỉnh sửa sản phẩm
              </Button>
              <Button variant="contained" startIcon={<AddPhotoAlternateIcon />} onClick={handleOpenAddImageModal} sx={{ flex: 1 }}>
                Thêm ảnh
              </Button>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleOpenDeleteModal} sx={{ flex: 1 }}>
                Xóa sản phẩm
              </Button>
            </Box>
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
          <Button variant="contained" onClick={handleAddImage} disabled={!selectedImage} fullWidth>
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
            <Button variant="contained" color="error" onClick={handleDeleteProduct}>
              Xóa sản phẩm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetail;