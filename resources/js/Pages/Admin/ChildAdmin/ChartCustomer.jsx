import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';

const ChartCustomer = () => {
    const { customers } = usePage().props;
    console.log(customers)
    const [viewType, setViewType] = useState('orders'); // 'orders' hoặc 'revenue'

    const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

    const chartData = customers.map(customer => {
        const totalRevenue = customer.total_spent;
            
        return {
            name: `${customer.name}`,
            'Số đơn hàng': customer.orders ? customer.orders.length : 0,
            'Tổng tiền': totalRevenue || 0
        };
    });

    const handleViewTypeChange = (event, newValue) => {
        if (newValue !== null) {
            setViewType(newValue);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Thống kê khách hàng
                    </Typography>
                    <ToggleButtonGroup
                        value={viewType}
                        exclusive
                        onChange={handleViewTypeChange}
                        aria-label="view type"
                    >
                        <ToggleButton value="orders" aria-label="orders">
                            Số đơn hàng
                        </ToggleButton>
                        <ToggleButton value="revenue" aria-label="revenue">
                            Tổng tiền
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" scale="linear" />
                        <YAxis type="category" dataKey="name" width={150} />
                        <Tooltip formatter={(value) => viewType === 'revenue' ? `${value.toLocaleString('vi-VN')} ₫` : value} />
                        <Legend />
                        <Bar dataKey={viewType === 'orders' ? 'Số đơn hàng' : 'Tổng tiền'}>
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
