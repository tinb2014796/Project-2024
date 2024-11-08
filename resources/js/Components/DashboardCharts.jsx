import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesPurchaseData = {
  daily: [
    { name: 'T2', Purchase: 5500, Sales: 4900 },
    { name: 'T3', Purchase: 5800, Sales: 4800 },
    { name: 'T4', Purchase: 4500, Sales: 5300 },
    { name: 'T5', Purchase: 3600, Sales: 4300 },
    { name: 'T6', Purchase: 4300, Sales: 4600 },
    { name: 'T7', Purchase: 2800, Sales: 4100 },
    { name: 'CN', Purchase: 5500, Sales: 4900 },
  ],
  weekly: [
    { name: 'Tuần 1', Purchase: 25000, Sales: 22000 },
    { name: 'Tuần 2', Purchase: 28000, Sales: 24000 },
    { name: 'Tuần 3', Purchase: 22000, Sales: 26000 },
    { name: 'Tuần 4', Purchase: 20000, Sales: 23000 },
  ],
  monthly: [
    { name: 'T1', Purchase: 55000, Sales: 49000 },
    { name: 'T2', Purchase: 58000, Sales: 48000 },
    { name: 'T3', Purchase: 45000, Sales: 53000 },
    { name: 'T4', Purchase: 36000, Sales: 43000 },
    { name: 'T5', Purchase: 43000, Sales: 46000 },
    { name: 'T6', Purchase: 28000, Sales: 41000 },
  ],
};

const orderSummaryData = {
  daily: [
    { name: 'T2', Ordered: 380, Delivered: 320 },
    { name: 'T3', Ordered: 180, Delivered: 380 },
    { name: 'T4', Ordered: 280, Delivered: 360 },
    { name: 'T5', Ordered: 260, Delivered: 380 },
    { name: 'T6', Ordered: 220, Delivered: 340 },
    { name: 'T7', Ordered: 300, Delivered: 350 },
    { name: 'CN', Ordered: 240, Delivered: 330 },
  ],
  weekly: [
    { name: 'Tuần 1', Ordered: 1800, Delivered: 1600 },
    { name: 'Tuần 2', Ordered: 1200, Delivered: 1800 },
    { name: 'Tuần 3', Ordered: 1400, Delivered: 1700 },
    { name: 'Tuần 4', Ordered: 1300, Delivered: 1900 },
  ],
  monthly: [
    { name: 'T1', Ordered: 3800, Delivered: 3200 },
    { name: 'T2', Ordered: 1800, Delivered: 3800 },
    { name: 'T3', Ordered: 2800, Delivered: 3600 },
    { name: 'T4', Ordered: 2600, Delivered: 3800 },
    { name: 'T5', Ordered: 2200, Delivered: 3400 },
    { name: 'T6', Ordered: 3000, Delivered: 3500 },
  ],
};

function DashboardCharts() {
  const [timeRange, setTimeRange] = useState('daily');

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ 
          p: 3, 
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: 2 
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Doanh thu & Mua hàng
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            mb: 2 
          }}>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
              sx={{ '& .MuiToggleButton-root': { px: 3 } }}
            >
              <ToggleButton value="daily" aria-label="daily">
                Ngày
              </ToggleButton>
              <ToggleButton value="weekly" aria-label="weekly">
                Tuần
              </ToggleButton>
              <ToggleButton value="monthly" aria-label="monthly">
                Tháng
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesPurchaseData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar dataKey="Purchase" fill="#4dabf5" name="Mua hàng" />
              <Bar dataKey="Sales" fill="#ff6b6b" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Tổng quan đơn hàng</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              aria-label="time range"
            >
              <ToggleButton value="daily" aria-label="daily">
                Ngày
              </ToggleButton>
              <ToggleButton value="weekly" aria-label="weekly">
                Tuần
              </ToggleButton>
              <ToggleButton value="monthly" aria-label="monthly">
                Tháng
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderSummaryData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Ordered" stroke="#8884d8" name="Đã đặt" />
              <Line type="monotone" dataKey="Delivered" stroke="#82ca9d" name="Đã giao" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardCharts;
