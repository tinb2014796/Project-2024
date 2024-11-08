import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';

const DonHang = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { orders } = usePage().props;
  const [ghnStatus, setGhnStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  console.log(orders);

  const donHangGoc = orders.map(order => ({
    id: order.id,
    ngayDat: order.or_date,
    customer: order.customer,
    payment: order.payment,   
    status: {               
      st_name: order.or_status === "0" ? "Chưa xác nhận" : 
               order.or_status === "1" ? "Đã xác nhận" :
               order.or_status === "2" ? "Đang giao hàng" : 
               order.or_status === "3" ? "Đã giao hàng" :
               order.or_status === "-1" ? "Đã hủy" : ""
               
    },
    isConfirmed: order.or_status === "1",
    isShipping: order.or_status === "2", 
    isDelivered: order.or_status === "3",
    isCancelled: order.or_status === "-1",
    tongTien: order.or_total,
    ghiChu: order.or_note,
    orderDetails: order.order_details.map(detail => ({
      p_name: detail.product.p_name,
      quantity: detail.quantity,
      p_selling: detail.product.p_selling
    })),
    tracking_id: order.tracking_id || null
  }));

  const donHangChuaXacNhan = donHangGoc.filter(don => !don.isConfirmed && !don.isCancelled);
  const donHangDaXacNhan = donHangGoc.filter(don => don.isConfirmed);
  const donHangDaHuy = donHangGoc.filter(don => don.isCancelled);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setOpenDetail(true);
    if(order.tracking_id) {
      handleCheckGHNStatus(order);
    }
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setGhnStatus('');
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleConfirmDelivery = (maDonHang) => {
    router.post(`/admin/orders/${maDonHang}`, {
      order_id: maDonHang,
      or_status: 1
    }, {
      onSuccess: () => {
        setTabValue(1);
      }
    });
  };

  const handleShipOrder = async (order) => {
    try {
      const response = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', {
        payment_type_id: 2,
        required_note: 'KHONGCHOXEMHANG',
        to_name: order.customer.cus_name,
        to_phone: order.customer.cus_sdt,
        to_address: order.customer.cus_address,
        to_ward_code: order.customer.ward_code,
        to_district_id: order.customer.district_id,
        to_province_id: order.customer.province_id,
        cod_amount: parseInt(order.tongTien),
        weight: 200,
        length: 20,
        width: 20, 
        height: 10,
        service_id: 0,
        service_type_id: 2,
        items: order.orderDetails.map(item => ({
          name: item.p_name,
          quantity: item.quantity,
          price: parseInt(item.p_selling)
        }))
      }, {
        headers: {
          'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
          'ShopId': '195215',
          'Content-Type': 'application/json'
        }
      });

      if(response.data.code === 200) {
        router.post(`/admin/orders/${order.id}/ship`, {
          order_id: order.id,
          or_status: 2,
          tracking_id: response.data.data.order_code
        });
      }

    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng GHN:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng vận chuyển');
    }
  };
  console.log(orders);
  const handleCheckGHNStatus = async (order) => {
    try {
      const response = await axios.post(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
        {
          order_code: order.tracking_id
        },
        {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694', 
            'ShopId': '195215',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.code === 200) {
        setGhnStatus(response.data.data.status);
        
        let orderStatus;
        switch(response.data.data.status) {
          case 'ready_to_pick':
            orderStatus = 2;
            break;
          case 'picked':
            orderStatus = 2;
            break;  
          case 'delivering':
            orderStatus = 2;
            break;
          case 'delivered':
            orderStatus = 3;
            break;
          case 'cancel':
            orderStatus = 4;
            break;
          default:
            orderStatus = 2;
        }
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái GHN:', error);
      alert('Có lỗi xảy ra khi kiểm tra trạng thái vận chuyển');
    }
  };

  const handleUpdateGHNStatus = async (order, newStatus) => {
    try {
      const response = await axios.post(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/update',
        {
          order_code: order.tracking_id,
          status: newStatus
        },
        {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
            'ShopId': '195215',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.code === 200) {
        setGhnStatus(newStatus);
        alert('Cập nhật trạng thái GHN thành công!');
        handleCheckGHNStatus(order);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái GHN:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái vận chuyển');
    }
  };

  const renderOrderTable = (orders) => (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ngày đặt</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên khách hàng</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tổng tiền</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phương thức thanh toán</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((don, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{don.id}</TableCell>
                <TableCell>{don.ngayDat}</TableCell>
                <TableCell>{don.customer.cus_name}</TableCell>
                <TableCell>
                  {parseInt(don.tongTien).toLocaleString('vi-VN')} VNĐ
                </TableCell>
                <TableCell>{don.payment.pa_type}</TableCell>
                <TableCell>
                  <Typography 
                    sx={{
                      color: don.isDelivered ? 'green' : 
                             don.isShipping ? 'blue' :
                             don.isConfirmed ? 'orange' :
                             don.isCancelled ? 'red' : '#666',
                      fontWeight: 'bold'
                    }}
                  >
                    {don.status.st_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleOpenDetail(don)}
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': { backgroundColor: '#e3f2fd' }
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    {!don.isConfirmed && !don.isCancelled && (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => handleConfirmDelivery(don.id)}
                        sx={{ 
                          borderRadius: 2,
                          '&:hover': { backgroundColor: '#2e7d32' }
                        }}
                      >
                        Xác nhận
                      </Button>
                    )}
                    {don.isConfirmed && !don.isShipping && (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<LocalShippingIcon />}
                        onClick={() => handleShipOrder(don)}
                        sx={{ 
                          borderRadius: 2,
                          '&:hover': { backgroundColor: '#1565c0' }
                        }}
                      >
                        Tạo đơn GHN
                      </Button>
                    )}
                    {don.isShipping && !don.isDelivered && (
                      <Button
                        variant="contained"
                        size="small"
                        color="info"
                        onClick={() => handleCheckGHNStatus(don)}
                        sx={{ 
                          borderRadius: 2,
                          '&:hover': { backgroundColor: '#0288d1' }
                        }}
                      >
                        Kiểm tra GHN
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số dòng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
      />
    </>
  );

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const provinceResponse = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          headers: {
            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694'
          }
        });
        setProvinces(provinceResponse.data.data);

        // Fetch districts and wards based on selected province/district
        if (selectedOrder) {
          const districtResponse = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedOrder.customer.province_id}`, {
            headers: {
              'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694'
            }
          });
          setDistricts(districtResponse.data.data);

          const wardResponse = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedOrder.customer.district_id}`, {
            headers: {
              'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694'
            }
          });
          setWards(wardResponse.data.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu địa chỉ:', error);
      }
    };
    fetchAddressData();
  }, [selectedOrder]);

  const getProvinceName = (provinceId) => {
    const province = provinces.find(p => p.ProvinceID === parseInt(provinceId));
    return province ? province.ProvinceName : 'Không xác định';
  };

  const getDistrictName = (districtId) => {
    const district = districts.find(d => d.DistrictID === parseInt(districtId));
    return district ? district.DistrictName : 'Không xác định';
  };

  const getWardName = (wardCode) => {
    const ward = wards.find(w => w.WardCode === wardCode);
    return ward ? ward.WardName : 'Không xác định';
  };

  const renderCustomerInfo = (selectedOrder) => (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f8f9fa' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
        Thông tin khách hàng
      </Typography>
      <Typography><strong>Tên:</strong> {selectedOrder.customer.cus_name}</Typography>
      <Typography><strong>Email:</strong> {selectedOrder.customer.cus_email}</Typography>
      <Typography><strong>SĐT:</strong> {selectedOrder.customer.cus_sdt}</Typography>
      <Typography><strong>Địa chỉ:</strong> {selectedOrder.customer.cus_address}</Typography>
      <Typography><strong>Phường/Xã:</strong> {getWardName(selectedOrder.customer.ward_code)}</Typography>
      <Typography><strong>Quận/Huyện:</strong> {getDistrictName(selectedOrder.customer.district_id)}</Typography>
      <Typography><strong>Tỉnh/Thành:</strong> {getProvinceName(selectedOrder.customer.province_id)}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
          Quản lý đơn hàng
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
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
            <Tab label={`Đơn hàng chưa xác nhận (${donHangChuaXacNhan.length})`} />
            <Tab label={`Đơn hàng đã xác nhận (${donHangDaXacNhan.length})`} />
            <Tab label={`Đơn hàng đã hủy (${donHangDaHuy.length})`} />
          </Tabs>
        </Box>

        {tabValue === 0 && renderOrderTable(donHangChuaXacNhan)}
        {tabValue === 1 && renderOrderTable(donHangDaXacNhan)}
        {tabValue === 2 && renderOrderTable(donHangDaHuy)}
      </Paper>

      <Dialog 
        open={openDetail} 
        onClose={handleCloseDetail} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24
          }
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
          Chi tiết đơn hàng #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedOrder && (
            <Box>
              {renderCustomerInfo(selectedOrder)}

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#1976d2' }}>
                Chi tiết sản phẩm
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ color: 'white' }}>Tên sản phẩm</TableCell>
                      <TableCell align="right" sx={{ color: 'white' }}>Số lượng</TableCell>
                      <TableCell align="right" sx={{ color: 'white' }}>Đơn giá</TableCell>
                      <TableCell align="right" sx={{ color: 'white' }}>Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.orderDetails?.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{detail.p_name}</TableCell>
                        <TableCell align="right">{detail.quantity}</TableCell>
                        <TableCell align="right">
                          {parseInt(detail.p_selling).toLocaleString('vi-VN')} VNĐ
                        </TableCell>
                        <TableCell align="right">
                          {parseInt(detail.quantity * detail.p_selling).toLocaleString('vi-VN')} VNĐ
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell colSpan={3} align="right">
                        <strong>Tổng cộng:</strong>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {parseInt(selectedOrder.tongTien).toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                  Thông tin thanh toán
                </Typography>
                <Typography><strong>Phương thức:</strong> {selectedOrder.payment.pa_type}</Typography>
                <Typography><strong>Trạng thái:</strong> {selectedOrder.status.st_name}</Typography>
                {selectedOrder.tracking_id && (
                  <>
                    <Typography><strong>Mã vận đơn GHN:</strong> {selectedOrder.tracking_id}</Typography>
                    <Typography><strong>Trạng thái GHN:</strong> {ghnStatus}</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel>Cập nhật trạng thái GHN</InputLabel>
                      <Select
                        value={ghnStatus}
                        label="Cập nhật trạng thái GHN"
                        onChange={(e) => handleUpdateGHNStatus(selectedOrder, e.target.value)}
                      >
                        <MenuItem value="ready_to_pick">Sẵn sàng lấy hàng</MenuItem>
                        <MenuItem value="picked">Đã lấy hàng</MenuItem>
                        <MenuItem value="delivering">Đang giao hàng</MenuItem>
                        <MenuItem value="delivered">Đã giao hàng</MenuItem>
                        <MenuItem value="cancel">Hủy đơn hàng</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
                {selectedOrder.ghiChu && (
                  <Typography sx={{ mt: 1 }}><strong>Ghi chú:</strong> {selectedOrder.ghiChu}</Typography>
                )}
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDetail}
            variant="contained"
            sx={{ 
              borderRadius: 2,
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DonHang;
