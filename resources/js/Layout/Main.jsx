import React, { useState } from 'react';
import { Link, usePage } from "@inertiajs/react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, InputBase, IconButton, Avatar, Collapse } from '@mui/material';
import { Dashboard as DashboardIcon, Widgets as WidgetsIcon, ViewQuilt as LayoutIcon, BarChart as ChartIcon, Brush as UIElementsIcon, Assignment as FormsIcon, TableChart as TablesIcon, Event as CalendarIcon, Photo as GalleryIcon, ViewKanban as KanbanIcon, Mail as MailboxIcon, Pages as PagesIcon, Search as SearchIcon, Discount as DiscountIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Category as CategoryIcon, ShoppingCart as ShoppingCartIcon, Receipt as ReceiptIcon, Person as PersonIcon, DeliveryDining as DeliveryDiningIcon, LocalOffer as LocalOfferIcon, PeopleAlt as CustomersIcon, Assessment as StatsIcon } from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/admin/home', active: true },
    { text: 'Sản phẩm', icon: <ShoppingCartIcon />, link: '/admin/products', active: false },
    { text: 'Đơn hàng', icon: <ReceiptIcon />, link: '/admin/orders', active: false },
    {
        text: 'Khách hàng',
        icon: <PersonIcon />,
        subItems: [
            { text: 'Danh sách khách hàng', icon: <CustomersIcon />, link: '/admin/customers' },
            { text: 'Thống kê khách hàng', icon: <StatsIcon />, link: '/admin/customer-chart' }
        ]
    },
    { text: 'Khuyến mãi', icon: <DiscountIcon />, link: '/admin/sale-off', active: false },
    { text: 'Nhập hàng', icon: <ReceiptIcon />, link: '/admin/goods-receipt', active: false },
];

export default function Main({ children }) {
    const { url } = usePage();
    const [openCustomer, setOpenCustomer] = useState(false);

    const handleCustomerClick = () => {
        setOpenCustomer(!openCustomer);
    };

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
                        item.subItems ? (
                            <React.Fragment key={item.text}>
                                <ListItem 
                                    button
                                    onClick={handleCustomerClick}
                                    sx={{ 
                                        color: 'white',
                                        '&:hover': {
                                            color: 'white',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                    {openCustomer ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openCustomer} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => (
                                            <ListItem
                                                button
                                                key={subItem.text}
                                                component={Link}
                                                href={subItem.link}
                                                sx={{
                                                    pl: 4,
                                                    bgcolor: url === subItem.link ? 'white' : 'transparent',
                                                    color: url === subItem.link ? 'black' : 'white',
                                                    '&:hover': {
                                                        color: url === subItem.link ? 'black' : 'white',
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ color: url === subItem.link ? 'black' : 'white' }}>
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={subItem.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ) : (
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
                        )
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                {children}
            </Box>
        </Box>
    );
}