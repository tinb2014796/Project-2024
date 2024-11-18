import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Container, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link } from '@inertiajs/react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function CategoryProduct() {
    const { products: initialProducts = [], category = {}, brands = [] } = usePage().props;
    const [products, setProducts] = useState(initialProducts);
    const [sortOrder, setSortOrder] = useState('none');
    const [selectedBrand, setSelectedBrand] = useState(null);
    console.log(products);
    console.log(brands);
    if (!category || !products) {
        return <Typography>Đang tải...</Typography>;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleSort = (event, newSort) => {
        if (newSort !== null) {
            setSortOrder(newSort);
            let sortedProducts = [...products];
            
            if (newSort === 'asc') {
                sortedProducts.sort((a, b) => a.p_selling - b.p_selling);
            } else if (newSort === 'desc') {
                sortedProducts.sort((a, b) => b.p_selling - a.p_selling);
            }
            
            setProducts(sortedProducts);
        }
    };

    const handleBrandFilter = (brandId) => {
        setSelectedBrand(brandId);
        if (brandId === null) {
            setProducts(initialProducts);
        } else {
            const filteredProducts = initialProducts.filter(product => product.b_id === brandId);
            setProducts(filteredProducts);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#e0f7fa', minHeight: '100vh' }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                    textAlign: 'center',
                    mb: 4,
                    color: '#00838f',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                }}
            >
               {category.c_name}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant={selectedBrand === null ? "contained" : "outlined"}
                        onClick={() => handleBrandFilter(null)}
                        sx={{
                            color: selectedBrand === null ? '#fff' : '#00838f',
                            bgcolor: selectedBrand === null ? '#00838f' : 'transparent',
                            '&:hover': {
                                bgcolor: selectedBrand === null ? '#006064' : '#e0f7fa'
                            }
                        }}
                    >
                        Tất cả
                    </Button>
                    {brands.map((brand) => (
                        <Button
                            key={brand.id}
                            variant={selectedBrand === brand.id ? "contained" : "outlined"}
                            onClick={() => handleBrandFilter(brand.id)}
                            sx={{
                                color: selectedBrand === brand.id ? '#fff' : '#00838f',
                                bgcolor: selectedBrand === brand.id ? '#00838f' : 'transparent',
                                '&:hover': {
                                    bgcolor: selectedBrand === brand.id ? '#006064' : '#e0f7fa'
                                }
                            }}
                        >
                            {brand.b_name}
                        </Button>
                    ))}
                </Box>

                <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={handleSort}
                    aria-label="price sorting"
                >
                    <ToggleButton 
                        value="asc" 
                        aria-label="sort ascending"
                        sx={{
                            color: '#00838f',
                            '&.Mui-selected': {
                                bgcolor: '#b2ebf2',
                                color: '#00838f',
                            }
                        }}
                    >
                        <ArrowUpwardIcon sx={{ mr: 1 }} /> Giá thấp đến cao
                    </ToggleButton>
                    <ToggleButton 
                        value="desc" 
                        aria-label="sort descending"
                        sx={{
                            color: '#00838f',
                            '&.Mui-selected': {
                                bgcolor: '#b2ebf2',
                                color: '#00838f',
                            }
                        }}
                    >
                        <ArrowDownwardIcon sx={{ mr: 1 }} /> Giá cao đến thấp
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 3
                                },
                                border: '1px solid #b2ebf2',
                                borderRadius: '8px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="240"
                                image={product.images[0].ip_image}
                                alt={product.p_name}
                                sx={{ 
                                    objectFit: 'contain',
                                    p: 2,
                                    bgcolor: '#fff',
                                    borderBottom: '1px solid #e0e0e0',
                                }}
                            />
                            <CardContent sx={{ 
                                flexGrow: 1, 
                                bgcolor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{
                                        fontWeight: 500,
                                        mb: 1,
                                        minHeight: '2.4em',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        color: '#006064'
                                    }}
                                >
                                    {product.p_name}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontWeight: 600, 
                                        mb: 1,
                                        color: '#00acc1'
                                    }}
                                >
                                    {formatPrice(product.p_selling)}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        mb: 1,
                                        color: '#0097a7'
                                    }}
                                >
                                    Còn lại: {product.p_quantity} sản phẩm
                                </Typography>
                                <Link href={`/detail-product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ 
                                            mt: 1,
                                            bgcolor: '#00bcd4',
                                            '&:hover': {
                                                bgcolor: '#00acc1'
                                            }
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CategoryProduct;
