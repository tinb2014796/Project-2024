import React, { useState, useEffect } from 'react';
import { 
  Box, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Container
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import CancelOrder from '@/Components/CancelOrder';

const OrderSuccess = () => {
  const { orders } = usePage().props;
  const customer = JSON.parse(localStorage.getItem('customer'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  console.log(orders);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
            'Content-Type': 'application/json'
          }
        });
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
            'Content-Type': 'application/json'
          }
        });
        setDistricts(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
            'Content-Type': 'application/json'
          }
        });
        setWards(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
      }
    };
    fetchWards();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      const fetchDistrictsForProvince = async () => {
        try {
          const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            params: {
              province_id: selectedOrder.customer.province_id
            },
            headers: {
              'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
              'Content-Type': 'application/json'
            }
          });
          setDistricts(response.data.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách quận/huyện:', error);
        }
      };

      const fetchWardsForDistrict = async () => {
        try {
          const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
            params: {
              district_id: selectedOrder.customer.district_id
            },
            headers: {
              'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
              'Content-Type': 'application/json'
            }
          });
          setWards(response.data.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách phường/xã:', error);
        }
      };

      fetchDistrictsForProvince();
      fetchWardsForDistrict();
    }
  }, [selectedOrder]);

  if (!orders) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">Không có đơn hàng nào</Typography>
      </Container>
    );
  }


  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId) => {
    setCancelOrderId(orderId);
    setOpenCancelModal(true);
  };

  const handleSubmitCancel = ({ orderId }) => {
    router.post(`/user/order/${orderId}`, {
      data: { or_note: '' }
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const renderOrderTable = (orders) => {
    if (orders.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Không có đơn hàng nào trong trạng thái này</Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#FF4500' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ngày đặt</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên khách hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tổng tiền</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phương thức thanh toán</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng thái đơn hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>{order.customer?.cus_name}</TableCell>
                <TableCell>{formatCurrency(order.or_total)}</TableCell>
                <TableCell>{order.payment?.pa_type}</TableCell>
                <TableCell>
                  <Box sx={{
                    backgroundColor: order.or_status == 1 ? '#4CAF50' : 
                                   order.or_status == -1 ? '#f44336' : '#FFA726',
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                    textAlign: 'center'
                  }}>
                    {order.or_status[6] ? order.or_status[6] : 
                     order.or_status == -1 ? 'Đã hủy' : 'Chưa xác nhận'}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      size="small"
                      onClick={() => handleOpenDialog(order)}
                      sx={{ borderRadius: 2 }}
                    >
                      XEM CHI TIẾT
                    </Button>
                    {order.or_status == 0 && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleCancelOrder(order.id)}
                        sx={{ borderRadius: 2 }}
                      >
                        HỦY ĐƠN
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getProvinceName = (province_id) => {
    const province = provinces.find(p => p.ProvinceID == province_id);
    return province ? province.ProvinceName : '';
  };

  const getDistrictName = (district_id) => {
    const district = districts.find(d => d.DistrictID == district_id);
    return district ? district.DistrictName : '';
  };

  const getWardName = (ward_code) => {
    const ward = wards.find(w => w.WardCode == ward_code);
    return ward ? ward.WardName : '';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FF4500', fontWeight: 'bold', mb: 4 }}>
        Tất cả đơn hàng
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleChangeTab}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: '1rem'
            }
          }}
        >
          <Tab label={`Đơn hàng chưa xác nhận (${pendingOrders.length})`} />
          <Tab label={`Đơn hàng đã xác nhận (${confirmedOrders.length})`} />
          <Tab label={`Đơn hàng đã hủy (${canceledOrders.length})`} />
        </Tabs>
      </Box>

      {tabValue === 0 && renderOrderTable(pendingOrders)}
      {tabValue === 1 && renderOrderTable(confirmedOrders)}
      {tabValue === 2 && renderOrderTable(canceledOrders)}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#FF4500', color: 'white' }}>
          Chi tiết đơn hàng #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {selectedOrder && (
            <>
              <Typography variant="h6" gutterBottom sx={{ color: '#FF4500', fontWeight: 'bold' }}>
                Thông tin khách hàng
              </Typography>
              <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography><strong>Tên:</strong> {selectedOrder.customer?.cus_familyname} {selectedOrder.customer?.cus_name}</Typography>
                    <Typography><strong>Email:</strong> {selectedOrder.customer?.cus_email}</Typography>
                    <Typography><strong>SĐT:</strong> {selectedOrder.customer?.cus_sdt}</Typography>
                    <Typography><strong>Địa chỉ:</strong> {selectedOrder.customer?.cus_address}, {getWardName(selectedOrder.customer?.ward_code)}, {getDistrictName(selectedOrder.customer?.district_id)}, {getProvinceName(selectedOrder.customer?.province_id)}</Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Typography variant="h6" gutterBottom sx={{ color: '#FF4500', fontWeight: 'bold' }}>
                Chi tiết sản phẩm
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Tên sản phẩm</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.order_details?.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{detail.product?.p_name}</TableCell>
                        <TableCell align="right">{detail.quantity}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(detail.product?.p_selling)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(detail.quantity * detail.product?.p_selling)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                        Tổng cộng:
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#FF4500' }}>
                        {formatCurrency(selectedOrder.or_total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" gutterBottom sx={{ color: '#FF4500', fontWeight: 'bold' }}>
                Thông tin thanh toán
              </Typography>
              <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                <Typography><strong>Phương thức:</strong> {selectedOrder.payment?.pa_type}</Typography>
                <Typography><strong>Trạng thái:</strong> {selectedOrder.or_status == 1 ? 'Đã xác nhận' : 
                                                        selectedOrder.or_status == -1 ? 'Đã hủy' : 'Chưa xác nhận'}</Typography>
                <Typography><strong>Ghi chú:</strong> {selectedOrder.or_note || 'Không có ghi chú'}</Typography>
              </Paper>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CancelOrder
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
        onSubmit={handleSubmitCancel}
        orderId={cancelOrderId}
      />
    </Container>
  );
};

export default OrderSuccess;