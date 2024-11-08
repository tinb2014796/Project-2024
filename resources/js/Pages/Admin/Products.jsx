import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar
} from '@mui/material';
import { router, usePage, Link } from "@inertiajs/react";
import AddProductModal from '../../Components/AddProductModal';

export default function Products() {
  const { products: initialProducts, categories, brands, saleOffs } = usePage().props;
  console.log(initialProducts);
  const [products, setProducts] = useState(initialProducts);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    p_name: '',
    p_selling: '',
    p_quantity: '',
    p_purchase: '',
    c_id: '',
    b_id: '',
    p_description: '',
    s_id: '',
    p_image: null
  });

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleOpenAddProductModal = () => setOpenAddProductModal(true);
  const handleCloseAddProductModal = () => setOpenAddProductModal(false);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }
    router.post('/admin/products/create', formData, {
      forceFormData: true,
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        handleCloseAddProductModal();
        setNewProduct({
          p_name: '',
          p_selling: '',
          p_quantity: '',
          p_purchase: '',
          c_id: '',
          b_id: '',
          p_description: '',
          s_id: '',
          p_image: null
        });
      },
    });
  };

  // Thêm hàm handleInputChange
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Button variant="contained" color="secondary" onClick={() => router.visit('/admin/categories')} sx={{ mr: 1 }}>Quản lý danh mục</Button>
          <Button variant="contained" color="primary" onClick={handleOpenAddProductModal}>Thêm sản phẩm</Button>
        </Box>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>Bộ lọc</Button>
          <Button variant="outlined">Tải xung tất cả</Button>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} onClick={() => router.visit(`/admin/detail-product/${product.id}`)}>
                <TableCell>
                  <Avatar src={product.images && product.images.length > 0 && product.images[0].ip_image ? product.images[0].ip_image : 'https://via.placeholder.com/150'} />
                </TableCell>
                <TableCell>{product.p_name}</TableCell>
                <TableCell>{formatCurrency(product.p_selling)}</TableCell>
                <TableCell>{product.p_quantity}</TableCell>
                <TableCell>{product.p_description}</TableCell>
                <TableCell>{formatCurrency(product.p_purchase)}</TableCell>
                <TableCell>{product.c_id}</TableCell>
                <TableCell>{product.b_id}</TableCell>
                <TableCell>{product.s_id}</TableCell>
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
        open={openAddProductModal}
        onClose={handleCloseAddProductModal}
        newProduct={newProduct}
        onInputChange={handleInputChange}
        onSubmit={handleAddProduct}
        categories={categories}
        brands={brands}
        saleOffs={saleOffs}
      />
    </Box>
  );
}
