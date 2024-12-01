import React, { useState } from "react"
import { Grid, Box, Typography, Paper, Button, Select, MenuItem, FormControl, TextField } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleIcon from '@mui/icons-material/People'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DashboardCharts from '../../Components/DashboardCharts.jsx'
import { usePage } from '@inertiajs/react'

function StatCard({ bgcolor, icon, value, label }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
                p: 2, 
                bgcolor: bgcolor, 
                color: 'white', 
                position: 'relative', 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 1
            }}>
                <Box sx={{ position: 'absolute', right: 10, top: 10, opacity: 0.3, fontSize: 60 }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold">{value}</Typography>
                    <Typography variant="body2">{label}</Typography>
                </Box>
                <Button 
                    variant="text" 
                    sx={{ color: 'white', p: 0, textTransform: 'none', justifyContent: 'flex-start' }}
                    endIcon={<ArrowForwardIcon />}
                >
                    Xem thêm
                </Button>
            </Paper>
        </Grid>
    );
}

function Home({ title }) {
    const { orders, customers, details, products } = usePage().props;
    const [timeRange, setTimeRange] = useState('all'); // all, today, yesterday, month, year, custom
    const [customDate, setCustomDate] = useState('');

    // Lọc đơn hàng theo thời gian
    const filterOrdersByTime = (orders) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        return orders.filter(order => {
            const orderDate = new Date(order.created_at);
            switch(timeRange) {
                case 'today':
                    return orderDate.toDateString() === today.toDateString() && order.status == 5;
                case 'yesterday':
                    return orderDate.toDateString() === yesterday.toDateString() && order.status == 5;
                case 'month':
                    return orderDate.getMonth() === today.getMonth() && 
                           orderDate.getFullYear() === today.getFullYear() && order.status == 5;
                case 'year':
                    return orderDate.getFullYear() === today.getFullYear() && order.status == 5;
                case 'custom':
                    if (!customDate) return order.status == 5;
                    const selectedDate = new Date(customDate);
                    return orderDate.toDateString() === selectedDate.toDateString() && order.status == 5;
                default:
                    return order.status == 5;
            }
        });
    };

    const filteredOrders = filterOrdersByTime(orders);

    // Tính tổng lợi nhuận
    const totalProfit = filteredOrders.reduce((sum, order) => {
        // Tính doanh thu của đơn hàng (đã trừ giảm giá)
        const orderDetails = details.filter(detail => detail.or_id === order.id);
        const detailsDiscount = orderDetails.reduce((discountSum, detail) => discountSum + (Number(detail.discount) || 0), 0);
        const revenue = order.or_total - order.or_discount - detailsDiscount;

        // Tính chi phí của đơn hàng
        const cost = orderDetails.reduce((costSum, detail) => {
            const product = products.find(p => p.id === detail.p_id);
            return costSum + (Number(product?.p_purchase || 0) * detail.quantity);
        }, 0);

        // Cộng dồn lợi nhuận (doanh thu - chi phí)
        return sum + (revenue - cost);
    }, 0);

    return (
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <div>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>Quản lý doanh thu</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Sơ đồ và thống kê doanh thu
                        </Typography>
                    </div>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                size="small"
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="today">Hôm nay</MenuItem>
                                <MenuItem value="yesterday">Hôm qua</MenuItem>
                                <MenuItem value="month">Tháng này</MenuItem>
                                <MenuItem value="year">Năm nay</MenuItem>
                                <MenuItem value="custom">Khác</MenuItem>
                            </Select>
                        </FormControl>
                        {timeRange === 'custom' && (
                            <TextField
                                type="date"
                                size="small"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                            />
                        )}
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    <StatCard 
                        bgcolor="#17a2b8" 
                        icon={<ShoppingBagIcon />} 
                        value={filteredOrders.length} 
                        label="Tổng số đơn hàng" 
                    />
                    <StatCard 
                        bgcolor="#28a745" 
                        icon={<TrendingUpIcon />} 
                        value={`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalProfit)}`}
                        label="Tổng lợi nhuận" 
                    />
                    <StatCard 
                        bgcolor="#ffc107" 
                        icon={<PersonAddIcon />} 
                        value={customers.length} 
                        label="Tổng số khách hàng" 
                    />
                    {/* <StatCard 
                        bgcolor="#dc3545" 
                        icon={<PeopleIcon />} 
                        value="65" 
                        label="Lượt truy cập" 
                    /> */}
                </Grid>
                <Box sx={{ mt: 6 }}>
                    <DashboardCharts />
                </Box>
            </Box>
    );
}

export default Home
