import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { usePage } from '@inertiajs/react';

function DashboardCharts() {
  const [timeRange, setTimeRange] = useState('daily');
  const { orders, details } = usePage().props;

  // Tìm giá trị or_total cao nhất
  const maxTotal = Math.max(...orders.map(order => order.or_total));

  // Tính tổng doanh thu theo giờ trong ngày
  const calculateDailyRevenue = () => {
    const hours = Array.from({length: 24}, (_, i) => `${i}h`);
    const dailyRevenue = {};
    
    // Khởi tạo giá trị 0 cho tất cả các giờ
    hours.forEach(hour => {
      dailyRevenue[hour] = 0;
    });

    // Cộng dồn doanh thu cho các giờ có đơn hàng
    orders.forEach(order => {
      const date = new Date(order.created_at);
      const hour = `${date.getHours()}h`;
      dailyRevenue[hour] += order.or_total;
    });

    return hours.map(hour => ({
      name: hour,
      Sales: dailyRevenue[hour]
    }));
  };

  // Tính tổng doanh thu theo 7 ngày gần nhất
  const calculateWeeklyRevenue = () => {
    const days = Array.from({length: 7}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('vi-VN', {weekday: 'short'});
    }).reverse();
    
    const weeklyRevenue = {};
    days.forEach(day => {
      weeklyRevenue[day] = 0;
    });

    orders.forEach(order => {
      const date = new Date(order.created_at);
      const day = date.toLocaleDateString('vi-VN', {weekday: 'short'});
      if (weeklyRevenue[day] !== undefined) {
        weeklyRevenue[day] += order.or_total;
      }
    });

    return days.map(day => ({
      name: day,
      Sales: weeklyRevenue[day]
    }));
  };

  // Tính tổng doanh thu theo tuần trong tháng
  const calculateMonthlyRevenue = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const weeksInMonth = [];
    let currentWeek = 1;

    // Tạo mảng các tuần trong tháng
    const firstDay = new Date(currentDate.getFullYear(), currentMonth, 1);
    const lastDay = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 7)) {
      weeksInMonth.push(`Tuần ${currentWeek++}`);
    }

    const monthlyRevenue = {};
    weeksInMonth.forEach(week => {
      monthlyRevenue[week] = 0;
    });

    orders.forEach(order => {
      const date = new Date(order.created_at);
      if (date.getMonth() === currentMonth) {
        const weekNumber = Math.ceil(date.getDate() / 7);
        const weekName = `Tuần ${weekNumber}`;
        monthlyRevenue[weekName] = (monthlyRevenue[weekName] || 0) + order.or_total;
      }
    });

    return weeksInMonth.map(week => ({
      name: week,
      Sales: monthlyRevenue[week]
    }));
  };

  const revenueData = {
    daily: calculateDailyRevenue(),
    weekly: calculateWeeklyRevenue(),
    monthly: calculateMonthlyRevenue()
  };

  const orderSummaryData = {
    daily: (() => {
      const hours = Array.from({length: 24}, (_, i) => `${i}h`);
      const initialData = hours.map(hour => ({
        name: hour,
        Ordered: 0,
        Delivered: 0,
        Difference: 0
      }));

      orders.forEach(order => {
        const date = new Date(order.created_at);
        const hour = date.getHours();
        const status = order.or_status;
        
        if (status === 'pending') initialData[hour].Ordered++;
        if (status === 'delivered') initialData[hour].Delivered++;
      });

      initialData.forEach(data => {
        data.Difference = data.Ordered - data.Delivered;
      });

      return initialData;
    })(),
    weekly: (() => {
      const days = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('vi-VN', {weekday: 'short'});
      }).reverse();

      return days.map(day => {
        const dayData = {
          name: day,
          Ordered: 0,
          Delivered: 0,
          Difference: 0
        };

        orders.forEach(order => {
          const orderDate = new Date(order.created_at);
          const orderDay = orderDate.toLocaleDateString('vi-VN', {weekday: 'short'});
          if (orderDay === day) {
            if (order.or_status === 'pending') dayData.Ordered++;
            if (order.or_status === 'delivered') dayData.Delivered++;
          }
        });

        dayData.Difference = dayData.Ordered - dayData.Delivered;
        return dayData;
      });
    })(),
    monthly: (() => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const weeksInMonth = [];
      let currentWeek = 1;

      const firstDay = new Date(currentDate.getFullYear(), currentMonth, 1);
      const lastDay = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
      
      for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 7)) {
        weeksInMonth.push(`Tuần ${currentWeek++}`);
      }

      return weeksInMonth.map(week => {
        const weekData = {
          name: week,
          Ordered: 0,
          Delivered: 0,
          Difference: 0
        };

        orders.forEach(order => {
          const orderDate = new Date(order.created_at);
          if (orderDate.getMonth() === currentMonth) {
            const orderWeek = `Tuần ${Math.ceil(orderDate.getDate() / 7)}`;
            if (orderWeek === week) {
              if (order.or_status === 'pending') weekData.Ordered++;
              if (order.or_status === 'delivered') weekData.Delivered++;
            }
          }
        });

        weekData.Difference = weekData.Ordered - weekData.Delivered;
        return weekData;
      });
    })()
  };

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
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 'bold',
            color: '#2c3e50',
            borderBottom: '2px solid #e9ecef',
            pb: 1
          }}>
            Doanh thu
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
              sx={{ 
                '& .MuiToggleButton-root': { 
                  px: 3,
                  color: '#6c757d',
                  '&.Mui-selected': {
                    backgroundColor: '#4dabf5',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3d8bd4'
                    }
                  }
                }
              }}
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
            <BarChart data={revenueData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#6c757d" />
              <YAxis 
                stroke="#6c757d"
                domain={[0, maxTotal]}
                tickFormatter={(value) => {
                  if (value === 0) return '0';
                  if (value >= 1000000) {
                    return `${(value / 1000000).toLocaleString('vi-VN')}M`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toLocaleString('vi-VN')}K`;
                  }
                  return value.toLocaleString('vi-VN');
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  padding: '10px'
                }}
                formatter={(value) => `${parseInt(value).toLocaleString('vi-VN')} VNĐ`}
              />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              <Bar dataKey="Sales" fill="#ff6b6b" name="Doanh thu" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ 
          p: 3,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)'
        }}>
          <Typography variant="h6" gutterBottom sx={{
            fontWeight: 'bold',
            color: '#2c3e50',
            borderBottom: '2px solid #e9ecef',
            pb: 1
          }}>
            Tổng quan đơn hàng
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
              sx={{ 
                '& .MuiToggleButton-root': { 
                  px: 3,
                  color: '#6c757d',
                  '&.Mui-selected': {
                    backgroundColor: '#4dabf5',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#3d8bd4'
                    }
                  }
                }
              }}
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
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#6c757d" />
              <YAxis stroke="#6c757d" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  padding: '10px'
                }}
                formatter={(value, name) => {
                  if (name === 'Difference') {
                    return value > 0 ? `+${value}` : value;
                  }
                  return value;
                }}
              />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              <Line type="monotone" dataKey="Ordered" stroke="#8884d8" name="Đã đặt" strokeWidth={2} dot={{r: 4}} />
              <Line type="monotone" dataKey="Delivered" stroke="#82ca9d" name="Đã giao" strokeWidth={2} dot={{r: 4}} />
              <Line type="monotone" dataKey="Difference" stroke="#ff6b6b" name="Chênh lệch" strokeWidth={2} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardCharts;
