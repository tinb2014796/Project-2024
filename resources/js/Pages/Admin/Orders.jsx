import React, { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
  console.log(orders);

  const donHangGoc = orders.map(order => ({
    id: order.id,
    ngayDat: order.or_date,
    customer: order.customer,
    payment: order.payment,   
    status: {               
      st_name: order.or_status === "0" ? "Chưa xác nhận" : 
               order.or_status === "1" ? "Đã xác nhận" :
               order.or_status === "2" ? "Đang giao hàng" : "Đã giao hàng"
    },
    isConfirmed: order.or_status === "1",
    isShipping: order.or_status === "2", 
    isDelivered: order.or_status === "3",
    tongTien: order.or_total,
    ghiChu: order.or_note,
    orderDetails: order.order_details,
    tracking_id: order.tracking_id ? order.tracking_id : null
  }));

  const donHangChuaXacNhan = donHangGoc.filter(don => !don.isConfirmed);
  const donHangDaXacNhan = donHangGoc.filter(don => don.isConfirmed);

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
        to_ward_code: '21012',
        to_district_id: 1572,
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
        
        // Cập nhật trạng thái đơn hàng dựa trên trạng thái GHN
        let orderStatus;
        switch(response.data.data.status) {
          case 'ready_to_pick':
            orderStatus = 2; // Đang giao hàng
            break;
          case 'picked':
            orderStatus = 2;
            break;  
          case 'delivering':
            orderStatus = 2;
            break;
          case 'delivered':
            orderStatus = 3; // Đã giao hàng
            break;
          case 'cancel':
            orderStatus = 4; // Đã hủy
            break;
          default:
            orderStatus = 2;
        }

        // router.post(`/admin/orders/${order.id}/update-status`, {
        //   order_id: order.id,
        //   or_status: orderStatus
        // });
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#00FFFF' }}>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell>Ngày đặt</TableCell>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>Phương thức thanh toán</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((don, index) => (
            <TableRow key={index}>
              <TableCell>{don.id}</TableCell>
              <TableCell>{don.ngayDat}</TableCell>
              <TableCell>{don.customer.cus_name}</TableCell>
              <TableCell>
                {parseInt(don.tongTien).toLocaleString('vi-VN')} VNĐ
              </TableCell>
              <TableCell>{don.payment.pa_type}</TableCell>
              <TableCell>{don.status.st_name}</TableCell>
              <TableCell>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleOpenDetail(don)}
                  sx={{ mr: 1 }}
                >
                  Xem chi tiết
                </Button>
                {!don.isConfirmed && (
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => handleConfirmDelivery(don.id)}
                  >
                    Xác nhận đơn hàng
                  </Button>
                )}
                {don.isConfirmed && !don.isShipping && (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<LocalShippingIcon />}
                    onClick={() => handleShipOrder(don)}
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
                  >
                    Kiểm tra GHN
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Quản lý đơn hàng</Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label={`Đơn hàng chưa xác nhận (${donHangChuaXacNhan.length})`} />
          <Tab label={`Đơn hàng đã xác nhận (${donHangDaXacNhan.length})`} />
        </Tabs>
      </Box>

      {tabValue === 0 && renderOrderTable(donHangChuaXacNhan)}
      {tabValue === 1 && renderOrderTable(donHangDaXacNhan)}

      <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Thông tin khách hàng
              </Typography>
              <Typography>Tên: {selectedOrder.customer.cus_name}</Typography>
              <Typography>Email: {selectedOrder.customer.cus_email}</Typography>
              <Typography>SĐT: {selectedOrder.customer.cus_sdt}</Typography>
              <Typography>Địa chỉ: {selectedOrder.customer.cus_address}</Typography>

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Chi tiết sản phẩm
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên sản phẩm </TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Đơn giá</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
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
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <strong>Tổng cộng:</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>{parseInt(selectedOrder.tongTien).toLocaleString('vi-VN')} VNĐ</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Thông tin thanh toán
              </Typography>
              <Typography>Phương thức: {selectedOrder.payment.pa_type}</Typography>
              <Typography>Trạng thái: {selectedOrder.status.st_name}</Typography>
              {selectedOrder.tracking_id && (
                <>
                  <Typography>Mã vận đơn GHN: {selectedOrder.tracking_id}</Typography>
                  <Typography>Trạng thái GHN: {ghnStatus}</Typography>
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
                <Typography>Ghi chú: {selectedOrder.ghiChu}</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DonHang;
