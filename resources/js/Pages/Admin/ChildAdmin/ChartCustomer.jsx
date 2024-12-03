import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton, Container } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';

const ChartCustomer = () => {
    const { customers } = usePage().props;
    const [viewType, setViewType] = useState('orders');

    const COLORS = ['#2196F3', '#4CAF50', '#FF9800', '#E91E63', '#673AB7', '#00BCD4'];

    const chartData = customers.map(customer => {
        const totalRevenue = customer.total_spent;
        const completedOrders = customer.orders.filter(order => order.status == 5).length;
            
        return {
            name: `${customer.name}`,
            'Số đơn hàng': completedOrders,
            'Tổng tiền': totalRevenue || 0
        };
    });

    const handleViewTypeChange = (event, newValue) => {
        if (newValue !== null) {
            setViewType(newValue);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper 
                elevation={4}
                sx={{ 
                    p: { xs: 2, md: 4 },
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', md: 'center' },
                    mb: 5,
                    gap: 3
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <BarChartIcon sx={{ 
                            fontSize: 48, 
                            color: '#1976d2',
                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))'
                        }} />
                        <Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '0.5px',
                                mb: 1
                            }}>
                                Thống Kê Khách Hàng
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500
                                }}
                            >
                                Phân tích chi tiết đơn hàng và doanh thu theo khách hàng
                            </Typography>
                        </Box>
                    </Box>
                    
                    <ToggleButtonGroup
                        value={viewType}
                        exclusive
                        onChange={handleViewTypeChange}
                        aria-label="view type"
                        sx={{ 
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            borderRadius: 3,
                            '& .MuiToggleButton-root': {
                                px: 3,
                                py: 1.5,
                                border: 'none',
                                borderRadius: '12px !important',
                                color: 'text.secondary',
                                '&.Mui-selected': {
                                    background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                                }
                            }
                        }}
                    >
                        <ToggleButton value="orders">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AssessmentIcon />
                                Số đơn hàng
                            </Box>
                        </ToggleButton>
                        <ToggleButton value="revenue">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MonetizationOnIcon />
                                Tổng tiền
                            </Box>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ 
                    backgroundColor: '#fff',
                    p: { xs: 2, md: 4 },
                    borderRadius: 4,
                    boxShadow: 'inset 0 2px 16px rgba(0,0,0,0.06)',
                    overflow: 'auto'
                }}>
                    <BarChart
                        width={1000}
                        height={600}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: -30,
                            bottom: 20,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis 
                            type="number" 
                            scale="linear" 
                            stroke="#666"
                            tickFormatter={(value) => value.toLocaleString('vi-VN')}
                        />
                        <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={150} 
                            stroke="#666"
                            tick={{ fill: '#333', fontSize: 14 }}
                        />
                        <Tooltip 
                            formatter={(value) => [
                                viewType === 'revenue' 
                                    ? `${value.toLocaleString('vi-VN')} ₫` 
                                    : `${value.toLocaleString('vi-VN')} đơn hàng`,
                                viewType === 'revenue' ? 'Doanh thu' : 'Số đơn hàng'
                            ]}
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.98)',
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                border: 'none',
                                padding: '12px 16px'
                            }}
                        />
                        <Legend 
                            wrapperStyle={{
                                paddingTop: '20px'
                            }}
                        />
                        <Bar 
                            dataKey={viewType === 'orders' ? 'Số đơn hàng' : 'Tổng tiền'} 
                            radius={[0, 8, 8, 0]}
                            label={{ 
                                position: 'right',
                                formatter: (value) => value.toLocaleString('vi-VN')
                            }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]}
                                    style={{
                                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                                    }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </Box>
            </Paper>
        </Container>
    );
}

export default ChartCustomer;
