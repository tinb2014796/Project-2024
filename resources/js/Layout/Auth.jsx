import React, { useEffect } from 'react';
import { Link, usePage, router } from "@inertiajs/react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Menu, MenuItem, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Main({ children }) {
    const {customer} = usePage().props;
    const [productAnchorEl, setProductAnchorEl] = React.useState(null);
    const [userAnchorEl, setUserAnchorEl] = React.useState(null);

    useEffect(() => {
        console.log(customer);
        if(customer){
            localStorage.setItem('customer', JSON.stringify(customer));
        }
    }, []);

    const handleProductClick = (event) => {
        setProductAnchorEl(event.currentTarget);
    };

    const handleProductClose = () => {
        setProductAnchorEl(null);
    };

    const handleUserClick = (event) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setUserAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('customer');
        router.post('/user/logout');
        handleUserClose();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar 
                position="static" 
                elevation={0} 
                sx={{ 
                    backgroundColor: '#CC9933', 
                    borderBottom: '1px solid #e0e0e0' 
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div">
                            {/* <img src="/images/1727972789_3.jpg" alt="MIXISHOP" height="40" /> */}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button color="inherit" component={Link} href="/user/home">Trang chủ</Button>
                            <Button color="inherit" component={Link} href="/gioi-thieu">Giới thiệu</Button>
                            <Button
                                color="inherit"
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={handleProductClick}
                            >
                                Sản phẩm
                            </Button>
                            <Menu
                                anchorEl={productAnchorEl}
                                open={Boolean(productAnchorEl)}
                                onClose={handleProductClose}
                            >
                                <MenuItem onClick={handleProductClose}>Sản phẩm 1</MenuItem>
                                <MenuItem onClick={handleProductClose}>Sản phẩm 2</MenuItem>
                            </Menu>
                            <Button color="inherit" component={Link} href="/blog">Blog</Button>
                            <Button color="inherit" component={Link} href="/lien-he">Liên hệ</Button>
                            <Button color="inherit" component={Link} href="/kiem-tra-don-hang">Kiểm tra đơn hàng</Button>
                            <IconButton color="inherit">
                                <SearchIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={handleUserClick}
                                aria-controls="user-menu"
                                aria-haspopup="true"
                            >
                                <PersonIcon />
                            </IconButton>
                            <Menu
                                id="user-menu"
                                anchorEl={userAnchorEl}
                                keepMounted
                                open={Boolean(userAnchorEl)}
                                onClose={handleUserClose}
                            >
                                {customer ? (
                                    <>
                                        <MenuItem onClick={handleUserClose}>Thông tin cá nhân</MenuItem>
                                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem component={Link} href="/user/signin" onClick={handleUserClose}>Đăng nhập</MenuItem>
                                        <MenuItem component={Link} href="/user/signup" onClick={handleUserClose}>Đăng ký</MenuItem>
                                    </>
                                )}
                            </Menu>
                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <FavoriteIcon />
                                </Badge>
                            </IconButton>
                            <IconButton >
                                <Badge badgeContent={0} sx={{ color: 'white' }} component={Link} href="/user/cart">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                            {customer ? (
                                <Typography variant="h6" component="div">{customer.cus_name}</Typography>
                            ) : (
                                <Typography variant="h6" component="div"> </Typography>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    );
}