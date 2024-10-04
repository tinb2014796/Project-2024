import React from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, InputBase, IconButton, Avatar } from '@mui/material';
import { Dashboard as DashboardIcon, Widgets as WidgetsIcon, ViewQuilt as LayoutIcon, BarChart as ChartIcon, Brush as UIElementsIcon, Assignment as FormsIcon, TableChart as TablesIcon, Event as CalendarIcon, Photo as GalleryIcon, ViewKanban as KanbanIcon, Mail as MailboxIcon, Pages as PagesIcon, Search as SearchIcon } from '@mui/icons-material';
import { Category as CategoryIcon, ShoppingCart as ShoppingCartIcon, Receipt as ReceiptIcon, Person as PersonIcon } from '@mui/icons-material';
const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/', active: true },
    { text: 'Sản phẩm', icon: <ShoppingCartIcon />, link: '/products', active: false },
    { text: 'Đơn hàng', icon: <ReceiptIcon />, link: '/orders', active: false },
    { text: 'Người dùng', icon: <PersonIcon />, link: '/user', active: false },
];


export default function Main({ children }) {
    const { url } = usePage();
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#14B8B9',
                        color: 'white',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>N</Avatar>
                    <Typography variant="h6" sx={{ color: 'white' }}>Nghệ shop</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 1 }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'black' }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton type="button" sx={{ p: '10px', color: 'black' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItem 
                            button 
                            key={item.text} 
                            component={Link} 
                            href={item.link}
                            sx={{ 
                                bgcolor: url === item.link ? 'white' : 'transparent',
                                '&:hover': { bgcolor: url === item.link ? 'white' : 'rgba(255, 255, 255, 0.1)' },
                                color: url === item.link ? 'black' : 'white',
                                '&:hover': {
                                    color: url === item.link ? 'black' : 'white',
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: url === item.link ? 'black' : 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.badge && (
                                <Box 
                                    component="span" 
                                    sx={{ 
                                        bgcolor: item.badge === 'New' ? 'red' : '#17a2b8',
                                        color: 'white',
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {item.badge}
                                </Box>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                {children}
            </Box>
        </Box>
    );
}