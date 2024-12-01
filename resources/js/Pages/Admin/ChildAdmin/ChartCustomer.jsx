import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const ChartCustomer = () => {
    const { customers } = usePage().props;
    const [viewType, setViewType] = useState('orders');

    const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0'];

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
        <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AssessmentIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                        <Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold', 
                                color: '#1976d2',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}>
                                Thống kê đơn hàng khách hàng
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Phân tích chi tiết theo từng khách hàng
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
                            '& .MuiToggleButton-root': {
                                border: '1px solid #e0e0e0',
                                '&.Mui-selected': {
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#1565c0'
                                    }
                                }
                            }
                        }}
                    >
                        <ToggleButton value="orders" aria-label="orders">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AssessmentIcon />
                                Số đơn hàng
                            </Box>
                        </ToggleButton>
                        <ToggleButton value="revenue" aria-label="revenue">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MonetizationOnIcon />
                                Tổng tiền
                            </Box>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
                }}>
                    <BarChart
                        width={1000}
                        height={500}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: -50,
                            bottom: 20,
                        }}
                        layout="vertical"
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis type="number" scale="linear" stroke="#666" />
                        <YAxis type="category" dataKey="name" width={150} stroke="#666" />
                        <Tooltip 
                            formatter={(value) => viewType === 'revenue' ? `${value.toLocaleString('vi-VN')} ₫` : value}
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Legend />
                        <Bar dataKey={viewType === 'orders' ? 'Số đơn hàng' : 'Tổng tiền'} radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % 5]} />
                            ))}
                        </Bar>
                    </BarChart>
                </Box>
            </Paper>
        </Box>
    );
}

export default ChartCustomer;
