import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Avatar,
  Container, Pagination, Card, CardContent, Grid, IconButton,
  InputBase, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { router, usePage, Link } from "@inertiajs/react";
import AddProductModal from '../../Components/AddProductModal';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';

export default function Products() {
  const { products: initialProducts, categories, brands, saleOffs } = usePage().props;
  const [products, setProducts] = useState(initialProducts);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low', 'out'
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    
    let filteredProducts = initialProducts.filter(product => {
      const matchName = product.p_name.toLowerCase().includes(searchValue);
      const matchPrice = product.p_selling.toString().includes(searchValue);
      return matchName || matchPrice;
    });

    if (stockFilter === 'low') {
      filteredProducts = filteredProducts.filter(product => product.p_quantity < 4 && product.p_quantity > 0);
    } else if (stockFilter === 'out') {
      filteredProducts = filteredProducts.filter(product => product.p_quantity === 0);
    }
    
    setProducts(filteredProducts);
    setPage(1);
  };

  const handleFilterStock = (event, newFilter) => {
    if (newFilter !== null) {
      setStockFilter(newFilter);
      let filteredProducts = [...initialProducts];

      if (newFilter === 'low') {
        filteredProducts = filteredProducts.filter(product => product.p_quantity < 4 && product.p_quantity > 0);
      } else if (newFilter === 'out') {
        filteredProducts = filteredProducts.filter(product => product.p_quantity === 0);
      }

      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => {
          const matchName = product.p_name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchPrice = product.p_selling.toString().includes(searchTerm);
          return matchName || matchPrice;
        });
      }

      setProducts(filteredProducts);
      setPage(1);
    }
  };

  const currentProducts = products.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
    <Container maxWidth="xl" sx={{ bgcolor: '#e0f7fa', minHeight: '100vh', py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ 
          color: '#00bcd4',
          fontWeight: 'bold',
          mb: 3
        }}>
          Quản lý sản phẩm
        </Typography>

        <Box sx={{ 
          display: 'flex',
          gap: 2,
          mb: 3 
        }}>
          <Paper sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: 2
          }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm theo tên hoặc giá..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <IconButton sx={{ p: '10px', color: '#00bcd4' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Button
            variant="contained"
            startIcon={<CategoryIcon />}
            onClick={() => router.visit('/admin/categories')}
            sx={{
              bgcolor: '#00bcd4',
              '&:hover': {
                bgcolor: '#00acc1'
              }
            }}
          >
            Danh mục
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddProductModal}
            sx={{
              bgcolor: '#00bcd4',
              '&:hover': {
                bgcolor: '#00acc1'
              }
            }}
          >
            Thêm sản phẩm
          </Button>

          <ToggleButtonGroup
            value={stockFilter}
            exclusive
            onChange={handleFilterStock}
            aria-label="stock filter"
          >
            <ToggleButton 
              value="all" 
              aria-label="all products"
              sx={{
                color: stockFilter === 'all' ? 'white' : '#00bcd4',
                bgcolor: stockFilter === 'all' ? '#00bcd4' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: '#00bcd4',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#00acc1'
                  }
                }
              }}
            >
              Tất cả
            </ToggleButton>
            <ToggleButton 
              value="low" 
              aria-label="low stock"
              sx={{
                color: stockFilter === 'low' ? 'white' : '#00bcd4',
                bgcolor: stockFilter === 'low' ? '#00bcd4' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: '#00bcd4',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#00acc1'
                  }
                }
              }}
            >
              Sắp hết hàng
            </ToggleButton>
            <ToggleButton 
              value="out" 
              aria-label="out of stock"
              sx={{
                color: stockFilter === 'out' ? 'white' : '#00bcd4',
                bgcolor: stockFilter === 'out' ? '#00bcd4' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: '#00bcd4',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#00acc1'
                  }
                }
              }}
            >
              Hết hàng
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={2}>
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                onClick={() => router.visit(`/admin/detail-product/${product.id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s'
                  }
                }}
              >
                <Box sx={{ position: 'relative', pt: '100%' }}>
                  <Box
                    component="img"
                    src={product.images && product.images.length > 0 ? 
                      product.images[0].ip_image : 'https://via.placeholder.com/150'}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography 
                    noWrap 
                    sx={{ 
                      fontSize: '0.9rem',
                      mb: 1
                    }}
                  >
                    {product.p_name}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#00bcd4',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatCurrency(product.p_selling)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={product.p_quantity === 0 ? 'error' : (product.p_quantity < 4 ? 'warning.main' : 'text.secondary')}
                    sx={{ mt: 1 }}
                  >
                    {product.p_quantity === 0 ? 'Hết hàng' : `Còn lại: ${product.p_quantity}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(products.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#00bcd4'
              },
              '& .Mui-selected': {
                bgcolor: '#00bcd4 !important',
                color: 'white'
              }
            }}
          />
        </Box>
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
    </Container>
  );
}
