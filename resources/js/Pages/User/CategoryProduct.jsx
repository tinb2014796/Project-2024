import React from 'react';
import { usePage } from '@inertiajs/react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Container } from '@mui/material';
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
