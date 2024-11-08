import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, TablePagination, Stepper, Step, StepLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';

const OrderSuccess = () => {
  const { orders } = usePage().props;
  console.log(orders);
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [addressDetails, setAddressDetails] = useState({});
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    province: null,
    district: null,
    ward: null
  });

  const donHangGoc = orders.map(order => ({
    id: order.id,
    ngayDat: order.or_date,
    customer: order.customer,
    payment: order.payment,   
    tongTien: order.or_total,
    ghiChu: order.or_note,
    status: order.or_status,
    orderDetails: order.order_details?.map(detail => ({
      p_name: detail.product?.p_name,
      quantity: detail.quantity,
      p_selling: detail.product?.p_selling,
      total: detail.total
    })),
  }));

  useEffect(() => {
    const getAddressDetails = async (address) => {
      try {
        const response = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
          headers: {
            'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897',
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching address:', error);
        return null;
      }
    };

    if (selectedOrder?.customer?.cus_address) {
      getAddressDetails(selectedOrder.customer.cus_address)
        .then(details => {
          if (details) {
            setAddressDetails(details);
          }
        });
    }
  }, [selectedOrder]);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
          }
        });
        setProvinceList(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const getDistricts = async () => {
      if (!selectedOrder?.customer?.province_id) return;
      
      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
          headers: {
            'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
          },
          params: {
            province_id: selectedOrder.customer.province_id
          }
        });
        setDistrictList(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      }
    };
    getDistricts();
  }, [selectedOrder?.customer?.province_id]);

  useEffect(() => {
    const getWards = async () => {
      if (!selectedOrder?.customer?.district_id) return;

      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
          headers: {
            'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
          },
          params: {
            district_id: selectedOrder.customer.district_id
          }
        });
        setWardList(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
      }
    };
    getWards();
  }, [selectedOrder?.customer?.district_id]);

  useEffect(() => {
    if (selectedOrder?.customer) {
      setSelectedAddress({
        province: selectedOrder.customer.province_id,
        district: selectedOrder.customer.district_id,
        ward: selectedOrder.customer.ward_code
      });
    }
  }, [selectedOrder]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterOrdersByStatus = (status) => {
    return donHangGoc.filter(order => {
      const orderStatus = Object.entries(order.status);
      const latestStatus = orderStatus[orderStatus.length - 1];
      return latestStatus[0] === status.toString();
    });
  };

  const handleOpenDetailDialog = (order) => {
    setSelectedOrder(order);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedOrder(null);
  };

  const getProvinceName = (provinceId) => {
    const province = provinceList.find(p => p.ProvinceID === parseInt(provinceId));
    return province ? province.ProvinceName : '';
  };

  const getDistrictName = (districtId) => {
    const district = districtList.find(d => d.DistrictID === parseInt(districtId));
    return district ? district.DistrictName : '';
  };

  const getWardName = (wardCode) => {
    const ward = wardList.find(w => w.WardCode === wardCode);
    return ward ? ward.WardName : '';
  };

  const getOrderStatusSteps = (status) => {
    const steps = [
      { label: 'Chờ xử lý', completed: false },
      { label: 'Đã xác nhận', completed: false },
      { label: 'Đang giao', completed: false },
      { label: 'Đã giao', completed: false }
    ];

    const currentStatus = parseInt(Object.keys(status)[Object.keys(status).length - 1]);
    
    for (let i = 0; i < currentStatus; i++) {
      steps[i].completed = true;
    }
    
    return steps;
  };

  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Quản lý đơn hàng
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                fontWeight: 'bold'
              }
            }}
          >
            <Tab label="Chờ xử lý" />
            <Tab label="Đã xác nhận" />
            <Tab label="Đang giao" />
            <Tab label="Đã giao" />
            <Tab label="Đã hủy" />
          </Tabs>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Mã đơn</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterOrdersByStatus(tabValue + 1).map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customer?.cus_name}</TableCell>
                  <TableCell>{new Date(order.ngayDat).toLocaleDateString()}</TableCell>
                  <TableCell>{order.tongTien?.toLocaleString('vi-VN')}đ</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="info"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenDetailDialog(order)}
                      sx={{ mr: 1, borderRadius: 2 }}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={openDetailDialog} 
        onClose={handleCloseDetailDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2 }}>
          Chi tiết đơn hàng #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedOrder && (
            <Box>
              <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                  Trạng thái đơn hàng
                </Typography>
                <Stepper activeStep={parseInt(Object.keys(selectedOrder.status)[Object.keys(selectedOrder.status).length - 1]) - 1}>
                  {getOrderStatusSteps(selectedOrder.status).map((step, index) => (
                    <Step key={index} completed={step.completed}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                  Thông tin khách hàng
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Tên:</strong> {selectedOrder.customer?.cus_name} {selectedOrder.customer?.cus_familyname}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Địa chỉ:</strong> {selectedOrder.customer?.cus_address}, {' '}
                    {getWardName(selectedOrder.customer?.ward_code)}, {' '}
                    {getDistrictName(selectedOrder.customer?.district_id)}, {' '}
                    {getProvinceName(selectedOrder.customer?.province_id)}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Số điện thoại:</strong> {selectedOrder.customer?.cus_sdt}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {selectedOrder.customer?.cus_email}
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                  Thông tin đơn hàng
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Ngày đặt:</strong> {new Date(selectedOrder.ngayDat).toLocaleString()}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Phương thức thanh toán:</strong> {selectedOrder.payment?.pa_type}
                  </Typography>
                  <Typography>
                    <strong>Ghi chú:</strong> {selectedOrder.ghiChu || 'Không có'}
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                  Chi tiết sản phẩm
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.orderDetails?.map((detail, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{detail.p_name}</TableCell>
                          <TableCell align="right">{detail.quantity}</TableCell>
                          <TableCell align="right">{parseInt(detail.p_selling).toLocaleString('vi-VN')}đ</TableCell>
                          <TableCell align="right">{parseInt(detail.total).toLocaleString('vi-VN')}đ</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>Tổng cộng:</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {parseInt(selectedOrder.tongTien).toLocaleString('vi-VN')}đ
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDetailDialog}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderSuccess;