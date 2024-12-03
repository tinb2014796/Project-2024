import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, ToggleButton, ToggleButtonGroup, TextField } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { usePage } from '@inertiajs/react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

function DashboardCharts() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [viewType, setViewType] = useState('revenue');
  const { orders, details, products } = usePage().props;
  const maxTotal = Math.max(...orders.filter(order => order.status == 5).map(order => order.or_total - order.or_discount - details.map(detail => detail.discount)));
 console.log(orders,details)
  // Thêm state cho từng biểu đồ
  const [paymentChartDate, setPaymentChartDate] = useState({
    year: dayjs(),
    month: dayjs()
  });
  const [topProductsDate, setTopProductsDate] = useState({
    year: dayjs(),
    month: dayjs()
  });

  // Tính tổng doanh thu theo tháng trong năm
  const calculateMonthlyRevenue = () => {
    const months = Array.from({length: 12}, (_, i) => dayjs().month(i).format('MMMM'));
    const monthlyRevenue = {};
    const monthlyCost = {};

    months.forEach(month => {
      monthlyRevenue[month] = 0;
      monthlyCost[month] = 0;
    });

    orders.filter(order => order.status == 5).forEach(order => {
      const date = dayjs(order.updated_at);
      const month = date.format('MMMM');
      if (date.year() === selectedDate.year() && date.month() === selectedMonth.month()) {
        const orderDetails = details.filter(detail => detail.or_id === order.id);
        const detailsDiscount = orderDetails.reduce((sum, detail) => sum + (Number(detail.discount) || 0), 0);
        
        const totalPurchase = orderDetails.reduce((sum, detail) => {
          const product = products.find(p => p.id === detail.p_id);
          return sum + (Number(product?.p_purchase || 0) * detail.quantity);
        }, 0);

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (order.or_total - order.or_discount - detailsDiscount);
        monthlyCost[month] = (monthlyCost[month] || 0) + totalPurchase;
      }
    });

    return months.map(month => ({
      name: month,
      Sales: monthlyRevenue[month],
      Cost: monthlyCost[month]
    }));
  };

  // Tính tổng doanh thu theo năm
  const calculateYearlyRevenue = () => {
    const currentYear = selectedDate.year();
    const years = Array.from({length: 5}, (_, i) => currentYear - i).reverse();
    const yearlyRevenue = {};
    const yearlyCost = {};

    years.forEach(year => {
      yearlyRevenue[year] = 0;
      yearlyCost[year] = 0;
    });

    orders.filter(order => order.status == 5).forEach(order => {
      const date = dayjs(order.updated_at);
      const year = date.year();
      if (yearlyRevenue[year] !== undefined) {
        const orderDetails = details.filter(detail => detail.or_id === order.id);
        const detailsDiscount = orderDetails.reduce((sum, detail) => sum + (Number(detail.discount) || 0), 0);
        
        const totalPurchase = orderDetails.reduce((sum, detail) => {
          const product = products.find(p => p.id === detail.p_id);
          return sum + (Number(product?.p_purchase || 0) * detail.quantity);
        }, 0);

        yearlyRevenue[year] += (order.or_total - order.or_discount - detailsDiscount );
        yearlyCost[year] += totalPurchase;
      }
    });

    return years.map(year => ({
      name: year.toString(),
      Sales: yearlyRevenue[year],
      Cost: yearlyCost[year]
    }));
  };

  const revenueData = {
    monthly: calculateMonthlyRevenue(),
    yearly: calculateYearlyRevenue()
  };

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  // Thêm hàm tính toán dữ liệu cho biểu đồ tròn
  const calculatePaymentMethods = () => {
    const paymentSummary = {
      cash: { count: 0, total: 0 },
      transfer: { count: 0, total: 0 }
    };

    orders.filter(order => order.status == 5).forEach(order => {
      const orderDate = dayjs(order.updated_at);
      if (orderDate.year() === paymentChartDate.year.year() && 
          orderDate.month() === paymentChartDate.month.month()) {
        const orderDetails = details.filter(detail => detail.or_id === order.id);
        const detailsDiscount = orderDetails.reduce((sum, detail) => sum + (Number(detail.discount) || 0), 0);
        const total = order.or_total - order.or_discount - detailsDiscount;

        if (order.pa_id === 2) {
          paymentSummary.transfer.count++;
          paymentSummary.transfer.total += total;
        } else if (order.pa_id === 1) {
          paymentSummary.cash.count++;
          paymentSummary.cash.total += total;
        }
      }
    });

    const totalCount = paymentSummary.cash.count + paymentSummary.transfer.count;
    
    return [
      { 
        name: 'Tiền mặt',
        value: paymentSummary.cash.count,
        count: paymentSummary.cash.count,
        total: paymentSummary.cash.total,
        percentage: ((paymentSummary.cash.count / totalCount) * 100).toFixed(2)
      },
      { 
        name: 'Chuyển khoản',
        value: paymentSummary.transfer.count,
        count: paymentSummary.transfer.count,
        total: paymentSummary.transfer.total,
        percentage: ((paymentSummary.transfer.count / totalCount) * 100).toFixed(2)
      }
    ];
  };

  const paymentData = calculatePaymentMethods();
  const COLORS = ['#0088FE', '#FF6B6B'];

  // Thêm hàm tính toán dữ liệu cho biểu đồ top sản phẩm bán chạy
  const calculateTopProducts = () => {
    const productSummary = {};
    
    orders.filter(order => order.status == 5 && order.status !== -1).forEach(order => {
      const orderDetails = details.filter(detail => detail.or_id === order.id);
      const orderDate = dayjs(order.updated_at);
      
      if (orderDate.year() === topProductsDate.year.year() && 
          orderDate.month() === topProductsDate.month.month()) {
        orderDetails.forEach(detail => {
          const product = products.find(p => p.id === detail.p_id);
          if (product) {
            if (!productSummary[product.p_name]) {
              productSummary[product.p_name] = {
                revenue: 0,
                quantity: 0
              };
            }
            productSummary[product.p_name].revenue += (detail.total - detail.discount);
            productSummary[product.p_name].quantity += detail.quantity;
          }
        });
      }
    });

    const sortedProducts = Object.entries(productSummary)
      .map(([name, data]) => ({
        name: name,
        value: viewType === 'revenue' ? data.revenue : data.quantity,
        quantity: data.quantity,
        revenue: data.revenue.toLocaleString('vi-VN') + ' ₫'
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const total = sortedProducts.reduce((sum, item) => sum + item.value, 0);
    
    return sortedProducts.map(item => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(2)
    }));
  };

  const PRODUCT_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ 
          p: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 600,
            color: '#1a237e',
            borderBottom: '2px solid #e3f2fd',
            pb: 1,
            mb: 3
          }}>
            Biểu Đồ Doanh Thu
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Chọn năm"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  views={['year']}
                  sx={{ mr: 2 }}
                />
                <DatePicker
                  label="Chọn tháng"
                  value={selectedMonth}
                  onChange={(newValue) => setSelectedMonth(newValue)}
                  views={['month']}
                  sx={{ mr: 2 }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              size="small"
              sx={{ 
                '& .MuiToggleButton-root': { 
                  px: 3,
                  py: 1,
                  color: '#455a64',
                  fontWeight: 500,
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976d2, #1565c0)'
                    }
                  }
                }
              }}
            >
              <ToggleButton value="monthly">Tháng</ToggleButton>
              <ToggleButton value="yearly">Năm</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceff1" />
              <XAxis 
                dataKey="name" 
                stroke="#455a64"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#455a64"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value/1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value/1000).toFixed(0)}K`;
                  return value;
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  padding: '12px'
                }}
                formatter={(value) => [`${value.toLocaleString('vi-VN')} ₫`]}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Bar 
                dataKey="Sales" 
                name="Doanh Thu"
                fill="#2196f3"
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="Cost" 
                name="Chi Phí"
                fill="#ff5722"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ 
          p: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
        }}>
          <Typography variant="h6" gutterBottom sx={{
            fontWeight: 600,
            color: '#1a237e',
            borderBottom: '2px solid #e3f2fd',
            pb: 1,
            mb: 3
          }}>
            Tổng doanh thu theo phương thức thanh toán
          </Typography>
          
          <Box sx={{ 
            mb: 3,
            '& .MuiTextField-root': {
              width: '100%',
              mb: 2
            }
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Chọn năm"
                  value={paymentChartDate.year}
                  onChange={(newValue) => setPaymentChartDate(prev => ({...prev, year: newValue}))}
                  views={['year']}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& > fieldset': { borderColor: '#2196f3' }
                      }
                    }
                  }}
                />
                <DatePicker
                  label="Chọn tháng" 
                  value={paymentChartDate.month}
                  onChange={(newValue) => setPaymentChartDate(prev => ({...prev, month: newValue}))}
                  views={['month']}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& > fieldset': { borderColor: '#2196f3' }
                      }
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${props.payload.count} đơn (${props.payload.percentage}%)`,
                  name
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ mt: 2, width: '100%' }}>
            {paymentData.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="textSecondary">{item.name}</Typography>
                <Box>
                  <Typography fontWeight="bold">
                    {item.count} đơn ({item.total.toLocaleString('vi-VN')} ₫)
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ 
          p: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{
              fontWeight: 600,
              color: '#1a237e',
              borderBottom: '2px solid #e3f2fd',
              pb: 1
            }}>
              MẶT HÀNG BÁN CHẠY
            </Typography>
            <ToggleButtonGroup
              value={viewType}
              exclusive
              onChange={(e, newValue) => newValue && setViewType(newValue)}
              size="small"
            >
              <ToggleButton value="revenue">Doanh Thu</ToggleButton>
              <ToggleButton value="quantity">Số Lượng</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Chọn năm"
                    value={topProductsDate.year}
                    onChange={(newValue) => setTopProductsDate(prev => ({...prev, year: newValue}))}
                    views={['year']}
                    sx={{ mr: 2 }}
                  />
                  <DatePicker
                    label="Chọn tháng"
                    value={topProductsDate.month}
                    onChange={(newValue) => setTopProductsDate(prev => ({...prev, month: newValue}))}
                    views={['month']}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={calculateTopProducts()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {calculateTopProducts().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRODUCT_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    viewType === 'revenue' 
                      ? `${props.payload.revenue} (${props.payload.percentage}%)`
                      : `${props.payload.quantity} sản phẩm (${props.payload.percentage}%)`,
                    name
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2, width: '100%' }}>
              {calculateTopProducts().map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="textSecondary" sx={{ color: PRODUCT_COLORS[index] }}>
                    {item.name}
                  </Typography>
                  <Typography fontWeight="bold">
                    {viewType === 'revenue' ? item.revenue : `${item.quantity} sản phẩm`}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardCharts;
