import React from 'react';
import { Link } from "@inertiajs/react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Menu, MenuItem, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Main({ children }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div">
                            <img src="/path-to-your-logo.png" alt="MIXISHOP" height="40" />
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button color="inherit" component={Link} href="/">Trang chủ</Button>
                            <Button color="inherit" component={Link} href="/gioi-thieu">Giới thiệu</Button>
                            <Button
                                color="inherit"
                                endIcon={<KeyboardArrowDownIcon />}
                                onClick={handleClick}
                            >
                                Sản phẩm
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Sản phẩm 1</MenuItem>
                                <MenuItem onClick={handleClose}>Sản phẩm 2</MenuItem>
                            </Menu>
                            <Button color="inherit" component={Link} href="/blog">Blog</Button>
                            <Button color="inherit" component={Link} href="/lien-he">Liên hệ</Button>
                            <Button color="inherit" component={Link} href="/kiem-tra-don-hang">Kiểm tra đơn hàng</Button>
                            <IconButton color="inherit">
                                <SearchIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <PersonIcon />
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <FavoriteIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
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