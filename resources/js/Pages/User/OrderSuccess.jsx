import React, { useState } from 'react';
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
  Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, usePage } from '@inertiajs/react';

const OrderSuccess = () => {
  const { orders } = usePage().props;
  const customer = JSON.parse(localStorage.getItem('customer'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Kiểm tra xem orders có tồn tại không
  if (!orders) {
    return <div>Không có đơn hàng nào</div>;
  }

  console.log('Orders:', orders); // Kiểm tra dữ liệu orders
  console.log('Customer:', customer); // Kiểm tra dữ liệu customer

  // Lọc đơn hàng theo customer id nếu customer tồn tại
  const filteredOrders = orders;
  const pendingOrders = filteredOrders.filter(order => order.or_status == 0);
  const confirmedOrders = filteredOrders.filter(order => order.or_status == 1);

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

  const renderOrderTable = (orders) => {
    if (orders.length === 0) {
      return <div>Không có đơn hàng nào trong trạng thái này</div>;
    }
    console.log(orders);
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#CC9933' }}>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Phương thức thanh toán</TableCell>
              <TableCell>Trạng thái đơn hàng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.customer?.cus_name}</TableCell>
                <TableCell>{order.or_total?.toLocaleString('vi-VN')} VND</TableCell>
                <TableCell>{order.payment?.pa_type}</TableCell>
                <TableCell>{order.or_status == 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    size="small"
                    onClick={() => handleOpenDialog(order)}
                  >
                    XEM CHI TIẾT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <h1>Tất cả đơn hàng</h1>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label={`Đơn hàng chưa xác nhận (${pendingOrders.length})`} />
          <Tab label={`Đơn hàng đã xác nhận (${confirmedOrders.length})`} />
        </Tabs>
      </Box>

      {tabValue === 0 && renderOrderTable(pendingOrders)}
      {tabValue === 1 && renderOrderTable(confirmedOrders)}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6" gutterBottom>Thông tin khách hàng</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Tên: {selectedOrder.customer?.cus_name}</Typography>
                  <Typography>Email: {selectedOrder.customer?.cus_email}</Typography>
                  <Typography>SĐT: {selectedOrder.customer?.cus_phone}</Typography>
                  <Typography>Địa chỉ: {selectedOrder.customer?.cus_address}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Chi tiết sản phẩm</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên sản phẩm</TableCell>
                          <TableCell align="right">Số lượng</TableCell>
                          <TableCell align="right">Đơn giá</TableCell>
                          <TableCell align="right">Thành tiền</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedOrder.order_details?.map((detail, index) => (
                          <TableRow key={index}>
                            <TableCell>{detail.p_name}</TableCell>
                            <TableCell align="right">{detail.quantity}</TableCell>
                            <TableCell align="right">
                              {parseInt(detail.p_selling).toLocaleString('vi-VN')} VND
                            </TableCell>
                            <TableCell align="right">
                              {parseInt(detail.quantity * detail.p_selling).toLocaleString('vi-VN')} VND
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} align="right">
                            <strong>Tổng cộng:</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>{selectedOrder.or_total?.toLocaleString('vi-VN')} VND</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Thông tin thanh toán</Typography>
                  <Typography>Phương thức: {selectedOrder.payment?.pa_type}</Typography>
                  <Typography>Trạng thái: {selectedOrder.or_status == 1 ? 'Đã xác nhận' : 'Chưa xác nhận'}</Typography>
                  <Typography>Ghi chú: {selectedOrder.or_note || 'Không có ghi chú'}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderSuccess;