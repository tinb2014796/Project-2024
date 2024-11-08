import React from 'react';
import { usePage } from '@inertiajs/react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Link } from '@inertiajs/react';

function CategoryProduct() {
    const { products = [], category = {} } = usePage().props;
    
    if (!category || !products) {
        return <Typography>Đang tải...</Typography>;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                    textAlign: 'center',
                    mb: 4,
                    color: '#CC9933',
                    fontWeight: 'bold',
                    fontFamily: 'cursive'
                }}
            >
               {category.c_name}
            </Typography>
            
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.images[0].ip_image}
                                alt={product.p_name}
                            />
                            <CardContent>
                                <Typography variant="body2" noWrap>Tên sản phẩm: {product.p_name}</Typography>
                                <Typography variant="subtitle1" color="error">
                                    Giá bán: {formatPrice(product.p_selling)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Số lượng còn lại: {product.p_quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    Mô tả: {product.p_description}
                                </Typography>
                                <Link href={`/user/detail-product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
                                        Xem chi tiết
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CategoryProduct;
