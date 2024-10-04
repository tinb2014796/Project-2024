import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import { usePage } from '@inertiajs/react';

export default function AddProductModal({ open, onClose, newProduct, onInputChange, onSubmit, categories, brands, saleOffs }) {
  const [previewImage, setPreviewImage] = useState(null);
  const { errors } = usePage().props;
  const [formErrors, setFormErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onInputChange({
      target: {
        name: 'p_image',
        value: file
      }
    });

    // Tạo URL cho hình ảnh xem trước
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newProduct.p_name) errors.p_name = 'Vui lòng nhập tên sản phẩm';
    if (!newProduct.p_selling) errors.p_selling = 'Vui lòng nhập giá bán';
    if (!newProduct.p_quantity) errors.p_quantity = 'Vui lòng nhập số lượng';
    if (!newProduct.p_purchase) errors.p_purchase = 'Vui lòng nhập giá mua';
    //if (!newProduct.c_id) errors.c_id = 'Vui lòng chọn danh mục';
    //if (!newProduct.b_id) errors.b_id = 'Vui lòng chọn thương hiệu';
    if (!newProduct.p_description) errors.p_description = 'Vui lòng nhập mô tả';
    //if (!newProduct.s_id) errors.s_id = 'Vui lòng chọn khuyến mãi';
    if (!newProduct.p_image) errors.p_image = 'Vui lòng chọn hình ảnh sản phẩm';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(event);
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    // Xóa thông báo lỗi khi người dùng điền dữ liệu
    const newErrors = { ...formErrors };
    Object.keys(newProduct).forEach(key => {
      if (newProduct[key] && newErrors[key]) {
        delete newErrors[key];
      }
    });
    setFormErrors(newErrors);
  }, [newProduct]);

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
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Thêm sản phẩm mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="p_name"
                value={newProduct.p_name}
                onChange={onInputChange}
                error={!!formErrors.p_name}
                helperText={formErrors.p_name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Giá bán"
                name="p_selling"
                type="number"
                value={newProduct.p_selling}
                onChange={onInputChange}
                error={!!formErrors.p_selling}
                helperText={formErrors.p_selling}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Số lượng"
                name="p_quantity"
                type="number"
                value={newProduct.p_quantity}
                onChange={onInputChange}
                error={!!formErrors.p_quantity}
                helperText={formErrors.p_quantity}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Giá mua"
                name="p_purchase"
                type="number"
                value={newProduct.p_purchase}
                onChange={onInputChange}
                error={!!formErrors.p_purchase}
                helperText={formErrors.p_purchase}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }} error={!!formErrors.c_id}>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  name="c_id"
                  value={newProduct.c_id}
                  onChange={onInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.c_name}</MenuItem>
                  ))}
                </Select>
                {formErrors.c_id && <Typography color="error">{formErrors.c_id}</Typography>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }} error={!!formErrors.b_id}>
                <InputLabel>Thương hiệu</InputLabel>
                <Select
                  name="b_id"
                  value={newProduct.b_id}
                  onChange={onInputChange}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>{brand.b_name}</MenuItem>
                  ))}
                </Select>
                {formErrors.b_id && <Typography color="error">{formErrors.b_id}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mô tả"
                name="p_description"
                multiline
                rows={4}
                value={newProduct.p_description}
                onChange={onInputChange}
                error={!!formErrors.p_description}
                helperText={formErrors.p_description}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }} error={!!formErrors.s_id}>
                <InputLabel>Khuyến mãi</InputLabel>
                <Select
                  name="s_id"
                  value={newProduct.s_id}
                  onChange={onInputChange}
                >
                  {saleOffs.map((saleOff) => (
                    <MenuItem key={saleOff.id} value={saleOff.id}>{saleOff.s_percent}</MenuItem>
                  ))}
                </Select>
                {formErrors.s_id && <Typography color="error">{formErrors.s_id}</Typography>}
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
                {formErrors.p_image && <Typography color="error">{formErrors.p_image}</Typography>}
              </Box>
              {previewImage && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <img src={previewImage} alt="Xem trước" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Box>
              )}
              {newProduct.p_image && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Đã chọn file: {newProduct.p_image.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Thêm sản phẩm
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
