import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, Paper,
  Modal, Fade, Backdrop, IconButton
} from '@mui/material';
import { router } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

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
    setNewCategory({ c_name: '', c_image: null });
    handleClose();
  };

  const handleBack = () => {
    router.visit('/admin/products');
  };
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      router.delete(`/admin/categories/delete/${id}`);
    }
    alert('Xóa danh mục thành công');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          bgcolor: '#fff',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Quản lý danh mục
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              bgcolor: '#00bcd4',
              '&:hover': {
                bgcolor: '#00acc1'
              }
            }}
          >
            Thêm danh mục
          </Button>
        </Box>
        
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          {categories.length > 0 ? (
            <List>
              {categories.map((category, index) => (
                <ListItem 
                  key={index}
                  sx={{
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    },
                    borderBottom: '1px solid #eee'
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" sx={{ color: '#f44336' }} onClick={() => handleDelete(category.id)}> 
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={category.c_image || 'https://via.placeholder.com/40'} 
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={category.c_name}
                    primaryTypographyProps={{
                      sx: { fontWeight: 500 }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Chưa có danh mục nào được thêm.
              </Typography>
            </Box>
          )}
        </Paper>

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
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                Thêm danh mục mới
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên danh mục"
                      name="c_name"
                      value={newCategory.c_name}
                      onChange={handleChange}
                      required
                      variant="outlined"
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
                      <Button 
                        variant="outlined"
                        component="span"
                        fullWidth
                        sx={{
                          color: '#00bcd4',
                          borderColor: '#00bcd4',
                          '&:hover': {
                            borderColor: '#00acc1'
                          }
                        }}
                      >
                        Chọn ảnh danh mục
                      </Button>
                    </label>
                    {newCategory.c_image && (
                      <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                        Đã chọn: {newCategory.c_image.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button 
                      type="submit" 
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: '#00bcd4',
                        '&:hover': {
                          bgcolor: '#00acc1'
                        }
                      }}
                    >
                      Thêm danh mục
                    </Button>
                    <Button 
                      onClick={handleClose}
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: '#757575',
                        borderColor: '#757575',
                        '&:hover': {
                          borderColor: '#616161'
                        }
                      }}
                    >
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
