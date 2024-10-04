import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar,
  Modal, TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { router, usePage } from "@inertiajs/react";

import AddProductModal from '../../Components/AddProductModal.jsx';
import EditProductModal from '../../Components/EditProductModal.jsx';


export default function Products() {
  const { products: initialProducts, categories, brands, saleOffs } = usePage().props;
  const [products, setProducts] = useState(initialProducts);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    p_name: '',
    p_selling: '',
    p_quantity: '',
    p_image: '',
    p_description: '',
    p_purchase: '',
    c_id: '',
    b_id: '',
    s_id: ''
  });
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleOpenModal = () => setOpenAddModal(true);
  const handleCloseModal = () => setOpenAddModal(false);
  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setOpenEditModal(false);
  };
  const handleEditProduct = (editedProduct) => {
   
    console.log('Dữ liệu sản phẩm đã chỉnh sửa:', editedProduct);

    const formData = new FormData();
    Object.keys(editedProduct).forEach(key => {
      formData.append(key, editedProduct[key]);
    });

    router.post(`/products/edit/${editedProduct.id}`, formData, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        console.log('Phản hồi từ server:', page);
        setProducts(prevProducts => 
          prevProducts.map(p => p.id === editedProduct.id ? editedProduct : p)
        );
      },
      onError: (errors) => {
        console.error('Lỗi khi cập nhật:', errors);
      }
    });
    
    handleCloseEditModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });
    
    router.post('/products/create', formData);
    handleCloseModal();
    setNewProduct({
      p_name: '',
      p_selling: '',
      p_quantity: '',
      p_image: '',
      p_description: '',
      p_purchase: '',
      c_id: '',
      b_id: '',
    });
  };
  //xongg lam cai khac di

  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
    handleCloseCategoryModal();
  };

  const handleOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      router.delete(`/products/delete/${productToDelete}`, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== productToDelete));
          handleCloseDeleteDialog();
        },
        onError: (errors) => {
          console.error('Lỗi khi xóa sản phẩm:', errors);
        }
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mr: 1 }}>Thêm sản phẩm</Button>
          <Button variant="contained" color="secondary" onClick={handleOpenCategoryModal}>Quản lý danh mục</Button>
        </Box>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>Bộ lọc</Button>
          <Button variant="outlined">Tải xuống tất cả</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giá mua</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Khuyến mãi</TableCell>
              <TableCell>Chỉnh sửa</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar src={product.p_image} />
                </TableCell>
                <TableCell>{product.p_name}</TableCell>
                <TableCell>₫{product.p_selling}</TableCell>
                <TableCell>{product.p_quantity}</TableCell>
                <TableCell>{product.p_description}</TableCell>
                <TableCell>₫{product.p_purchase}</TableCell>
                <TableCell>{product.c_id}</TableCell>
                <TableCell>{product.b_id}</TableCell>
                <TableCell>{product.s_id}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditModal(product)}>Chỉnh sửa</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDeleteDialog(product.id)} color="error">Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined">Trước</Button>
        <Typography>Trang 1 / 10</Typography>
        <Button variant="outlined">Tiếp</Button>
      </Box>

      <AddProductModal
        open={openAddModal}
        onClose={handleCloseModal}
        newProduct={newProduct}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        categories={categories}
        brands={brands}
        saleOffs={saleOffs}
      />

      <EditProductModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        product={selectedProduct}
        onEdit={handleEditProduct}
        categories={categories}
        brands={brands}
        saleOffs={saleOffs}
      />

      <Modal
        open={openCategoryModal}
        onClose={handleCloseCategoryModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Quản lý danh mục
          </Typography>
          <Box sx={{ mb: 2 }}>
            {categories.map((category, index) => (
              <Typography key={index}>{category}</Typography>
            ))}
          </Box>
          <TextField
            fullWidth
            label="Danh mục mới"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleAddCategory} variant="contained" color="primary">
              Thêm danh mục
            </Button>
            <Button onClick={handleCloseCategoryModal} variant="contained" color="secondary">
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa sản phẩm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy</Button>
          <Button onClick={handleDeleteProduct} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
