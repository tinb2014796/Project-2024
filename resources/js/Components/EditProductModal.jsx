import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';


export default function EditProductModal({ open, onClose, product, onEdit, categories, brands, saleOffs }) {
  const [editedProduct, setEditedProduct] = useState(product || {});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setEditedProduct(product || {});
    setPreviewImage(product?.p_image || null);
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditedProduct(prevState => ({
        ...prevState,
        p_image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(editedProduct);
    onClose(); // Đóng modal sau khi lưu thay đổi
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Chỉnh sửa sản phẩm
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="p_name"
                value={editedProduct.p_name || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Giá bán"
                name="p_selling"
                type="number"
                value={editedProduct.p_selling || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Số lượng"
                name="p_quantity"
                type="number"
                value={editedProduct.p_quantity || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Giá mua"
                name="p_purchase"
                type="number"
                value={editedProduct.p_purchase || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  name="c_id"
                  value={editedProduct.c_id || ''}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.c_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Thương hiệu</InputLabel>
                <Select
                  name="b_id"
                  value={editedProduct.b_id || ''}
                  onChange={handleInputChange}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>{brand.b_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mô tả"
                name="p_description"
                multiline
                rows={4}
                value={editedProduct.p_description || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Khuyến mãi</InputLabel>
                <Select
                  name="s_id"
                  value={editedProduct.s_id || ''}
                  onChange={handleInputChange}
                >
                  {saleOffs.map((saleOff) => (
                    <MenuItem key={saleOff.id} value={saleOff.id}>{saleOff.s_percent}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" fullWidth>
                    Tải lên hình ảnh sản phẩm
                  </Button>
                </label>
              </Box>
              {previewImage && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <img src={previewImage} alt="Xem trước" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Box>
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Lưu thay đổi
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
