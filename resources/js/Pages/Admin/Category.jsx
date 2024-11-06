import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, Paper,
  Modal, Fade, Backdrop
} from '@mui/material';
import { router } from '@inertiajs/react';

export default function Category({ categories }) {
  const [newCategory, setNewCategory] = useState({ c_name: '', c_image: null });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (e.target.name === 'c_image') {
      setNewCategory({ ...newCategory, c_image: e.target.files[0] });
    } else {
      setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/admin/categories/create', newCategory);
    // Xử lý logic thêm danh mục ở đây
    console.log('Danh mục mới:', newCategory);
    setNewCategory({ c_name: '', c_image: null });
    handleClose();
  };

  const handleBack = () => {
    router.visit('/admin/products');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Quản lý danh mục
          </Typography>
          <Button variant="outlined" onClick={handleBack}>
            Quay lại
          </Button>
        </Box>
        
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          {categories.length > 0 ? (
            <List>
              {categories.map((category, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={category.c_image || 'https://via.placeholder.com/40'} />
                  </ListItemAvatar>
                  <ListItemText primary={category.c_name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" align="center">
              Chưa có danh mục nào được thêm.
            </Typography>
          )}
        </Paper>

        <Button onClick={handleOpen} variant="contained" color="primary">
          Thêm danh mục
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Thêm danh mục mới
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên danh mục"
                      name="c_name"
                      value={newCategory.c_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      type="file"
                      id="c_image"
                      name="c_image"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="c_image">
                      <Button variant="contained" component="span">
                        Chọn ảnh danh mục
                      </Button>
                    </label>
                    {newCategory.c_image && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Đã chọn: {newCategory.c_image.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Thêm danh mục
                    </Button>
                    <Button onClick={handleClose} sx={{ ml: 2 }}>
                      Hủy
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Container>
  );
}
