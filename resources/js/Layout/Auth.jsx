import React, { useEffect, useState } from 'react';
import { Link, usePage, router } from "@inertiajs/react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Menu, MenuItem, Badge, InputBase, List, ListItem, ListItemText, Paper, Grid, Card, CardMedia, CardContent, Divider, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Main({ children }) {
    const { customer, categories, products } = usePage().props;
    const [productAnchorEl, setProductAnchorEl] = useState(null);
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [auth, setAuth] = useState(null);
    
    useEffect(() => {
        const user = localStorage.getItem('customer');
        if(user){
            setAuth(JSON.parse(user));
        }
        if(customer){
            localStorage.setItem('customer', JSON.stringify(customer));
            setAuth(customer);
        }
    }, []);

    const handleProductClick = (event) => {
        setProductAnchorEl(event.currentTarget);
    };

    const handleProductClose = () => {
        setProductAnchorEl(null);
    };

    const handleUserClick = (event) => {
        if(auth){
            setUserAnchorEl(event.currentTarget);
        }else{
            router.get('/signin');
        }
    };

    const handleUserClose = () => {
        setUserAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('customer');
        router.post('/user/logout');
        handleUserClose();
    };

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            setSearchResult([]);
            setSearchValue('');
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 0) {
            const filteredProducts = products.filter(product => 
                product.p_name.toLowerCase().includes(value.toLowerCase()) ||
                product.p_description.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResult(filteredProducts);
        } else {
            setSearchResult([]);
        }
    };

    const handleSearchItemClick = (productId) => {
        setShowSearch(false);
        setSearchResult([]);
        setSearchValue('');
        router.get(`/user/detail-product/${productId}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header Top */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 1 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: 'black' }} />
                                <Typography variant="body2" sx={{ color: 'black' }}>ngheshop@gmail.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 16, color: 'black' }} />
                                <Typography variant="body2" sx={{ color: 'black' }}>0345 291 448</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon sx={{ fontSize: 16, color: 'black' }} />
                                <Typography variant="body2" sx={{ color: 'black' }}>Cần Thơ, Việt Nam</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {auth ? (
                                <Typography variant="body2" sx={{ color: 'black' }}>Xin chào, {auth.cus_name}</Typography>
                            ) : (
                                <>
                                    <Link href="/signin" style={{ textDecoration: 'none', color: 'black' }}>
                                        <Typography variant="body2">Đăng nhập</Typography>
                                    </Link>
                                    <Typography variant="body2" sx={{ color: 'black' }}>|</Typography>
                                    <Link href="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                                        <Typography variant="body2">Đăng ký</Typography>
                                    </Link>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Main AppBar */}
            <AppBar 
                position="sticky" 
                elevation={0} 
                sx={{ 
                    backgroundColor: '#00FFFF',
                    borderBottom: '1px solid #e0e0e0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/user/home" style={{ textDecoration: 'none', color: 'black' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="/images/9lc.jpg" alt="Nghệ Shop Logo" style={{ height: 50, borderRadius: '50%' }} />
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
                                        Nghệ Shop
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button 
                                sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                component={Link} 
                                href="/user/home"
                            >
                                Trang chủ
                            </Button>
                            <Button
                                sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={handleProductClick}
                            >
                                Sản phẩm
                            </Button>
                            <Menu
                                anchorEl={productAnchorEl}
                                open={Boolean(productAnchorEl)}
                                onClose={handleProductClose}
                                PaperProps={{
                                    elevation: 3,
                                    sx: { mt: 1 }
                                }}
                            >
                                {categories && categories.map((category) => (
                                    <MenuItem 
                                        key={category.id} 
                                        onClick={handleProductClose} 
                                        component={Link} 
                                        href={`/user/category-product/${category.id}`}
                                        sx={{ minWidth: 180, color: 'black' }}
                                    >
                                        {category.c_name}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button 
                                sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                component={Link} 
                                href="/user/order-success"
                            >
                                Đơn hàng
                            </Button>
                            <Button 
                                sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                component={Link} 
                                href="/lien-he"
                            >
                                Liên hệ
                            </Button>

                            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton 
                                    sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                    onClick={handleSearchClick}
                                >
                                    <SearchIcon />
                                </IconButton>
                                {showSearch && (
                                    <Box sx={{ position: 'relative' }}>
                                        <InputBase
                                            placeholder="Tìm kiếm sản phẩm..."
                                            value={searchValue}
                                            onChange={handleSearch}
                                            sx={{
                                                color: 'black',
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                                    width: '250px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                    borderRadius: '4px',
                                                    '&:focus': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                                    }
                                                },
                                            }}
                                        />
                                        {searchResult.length > 0 && (
                                            <Paper 
                                                sx={{ 
                                                    position: 'absolute', 
                                                    top: '100%', 
                                                    left: 0,
                                                    right: 0,
                                                    zIndex: 1000,
                                                    maxHeight: '400px',
                                                    overflow: 'auto',
                                                    mt: 1,
                                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                <List>
                                                    {searchResult.map((product) => (
                                                        <ListItem 
                                                            key={product.id} 
                                                            button 
                                                            onClick={() => handleSearchItemClick(product.id)}
                                                            sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <img 
                                                                    src={product.images[0].ip_image} 
                                                                    alt={product.p_name}
                                                                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                                                                />
                                                                <ListItemText 
                                                                    primary={product.p_name}
                                                                    secondary={`Giá: ${formatPrice(product.p_selling)}`}
                                                                    sx={{ color: 'black' }}
                                                                />
                                                            </Box>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Paper>
                                        )}
                                    </Box>
                                )}

                                <IconButton
                                    sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                    onClick={handleUserClick}
                                >
                                    <PersonIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={userAnchorEl}
                                    open={Boolean(userAnchorEl)}
                                    onClose={handleUserClose}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: { mt: 1 }
                                    }}
                                >
                                    <MenuItem 
                                        component={Link} 
                                        href="/user/customer"
                                        onClick={handleUserClose}
                                        sx={{ color: 'black' }}
                                    >
                                        Thông tin cá nhân
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout} sx={{ color: 'black' }}>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>

                                <IconButton 
                                    sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    <Badge badgeContent={0} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>

                                <IconButton 
                                    component={Link} 
                                    href="/user/cart"
                                    sx={{ color: 'black', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                                >
                                    <Badge badgeContent={0} sx={{ color: 'black' }}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ flexGrow: 1 }}>
                {searchResult.length > 0 ? (
                    <Container sx={{ bgcolor: '#f5f5f5', minHeight: '10vh', py: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: 'black' }}>
                            Kết quả tìm kiếm ({searchResult.length} sản phẩm)
                        </Typography>
                        <Grid container spacing={3}>
                            {searchResult.map((product) => {
                                const maxDiscount = product.sale_off ? Math.max(...product.sale_off.map(sale => sale.s_percent)) : 0;
                                
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Link href={`/user/detail-product/${product.id}`} style={{ textDecoration: 'none' }}>
                                            <Card 
                                                sx={{ 
                                                    position: 'relative',
                                                    transition: 'transform 0.2s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                    }
                                                }}
                                            >
                                                {maxDiscount > 0 && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 0,
                                                            bgcolor: '#ff4d4f',
                                                            color: 'white',
                                                            px: 1.5,
                                                            py: 0.75,
                                                            zIndex: 1,
                                                            borderBottomLeftRadius: 8,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        -{maxDiscount}%
                                                    </Box>
                                                )}
                                                
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={product.images[0].ip_image}
                                                    alt={product.p_name}
                                                    sx={{ objectFit: 'cover' }}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" noWrap sx={{ mb: 1, color: 'black' }}>{product.p_name}</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                        {maxDiscount > 0 ? (
                                                            <>
                                                                <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>
                                                                    {formatPrice(product.p_selling * (1 - maxDiscount / 100))}
                                                                </Typography>
                                                                <Typography 
                                                                    variant="body1" 
                                                                    sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                                                                >
                                                                    {formatPrice(product.p_selling)}
                                                                </Typography>
                                                            </>
                                                        ) : (
                                                            <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>
                                                                {formatPrice(product.p_selling)}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    <Divider sx={{ my: 1 }} />
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        Số lượng: {product.p_quantity}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" noWrap>
                                                        {product.p_description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>
                ) : (
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#00FFFF', color: 'black', py: 6 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                Về Nghệ Shop
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ color: 'black' }}>
                                Nghệ Shop là cửa hàng chuyên cung cấp các sản phẩm chất lượng cao, 
                                đảm bảo uy tín và giá cả hợp lý cho khách hàng.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <IconButton sx={{ color: 'black' }} href="https://www.facebook.com/NgheLWR">
                                        <FacebookIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'black' }} href="https://www.instagram.com/nghe.9lc.37/">
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'black' }} href="https://twitter.com/NgheLWR">
                                    <TwitterIcon />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                Liên hệ
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationOnIcon sx={{ color: 'black' }} />
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                      207 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon sx={{ color: 'black' }} />
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        0345 291 448
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EmailIcon sx={{ color: 'black' }} />
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        ngheshop@gmail.com
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                                Chính sách
                            </Typography>
                            <Stack spacing={1}>
                                <Link href="#" style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="body2">Chính sách bảo mật</Typography>
                                </Link>
                                <Link href="#" style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="body2">Điều khoản dịch vụ</Typography>
                                </Link>
                                <Link href="#" style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="body2">Chính sách đổi trả</Typography>
                                </Link>
                                <Link href="#" style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="body2">Hướng dẫn mua hàng</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.2)' }} />
                    <Typography variant="body2" align="center" sx={{ color: 'black' }}>
                        © {new Date().getFullYear()} Nghệ Shop. Tất cả các quyền được bảo lưu.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}