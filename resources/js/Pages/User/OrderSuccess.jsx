import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, TablePagination, Stepper, Step, StepLabel, Rating, Avatar, Checkbox } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CancelIcon from '@mui/icons-material/Cancel';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';
import DetailOrders from './ChildPage/DetailOrders';
import { getAddressDetails, getProvinces, getDistricts, getWards } from './Function';

const OrderSuccess = () => {
  const { orders } = usePage().props;
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [addressDetails, setAddressDetails] = useState({});
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    province: null,
    district: null,
    ward: null
  });

  const donHangGoc = orders.map(order => {
    // Tính tổng discount từ order details
    const totalDetailDiscount = order.order_details?.reduce((sum, detail) => sum + (parseInt(detail.discount) || 0), 0);
    
    return {
      id: order.id,
      ngayDat: order.or_date,
      customer: order.customer,
      payment: order.payment,   
      tongTien: order.or_total - totalDetailDiscount - (order.or_discount || 0),
      ghiChu: order.or_note,
      status: order.or_status,
      orderDetails: order.order_details?.map(detail => ({
        p_id: detail.product?.id,
        p_name: detail.product?.p_name,
        quantity: detail.quantity,
        p_selling: detail.product?.p_selling,
        total: detail.total - (detail.discount || 0)
      })),
      totalDetailDiscount: totalDetailDiscount,
      orderDiscount: order.or_discount || 0
    }
  });


  useEffect(() => {
    if (selectedOrder?.customer?.cus_address) {
      getAddressDetails()
        .then(details => {
          if (details) {
            setAddressDetails(details);
          }
        });
    }
  }, [selectedOrder]);

  useEffect(() => {
    getProvinces()
      .then(provinces => {
        setProvinceList(provinces);
      });
  }, []);

  useEffect(() => {
    if (selectedOrder?.customer?.province_id) {
      getDistricts(selectedOrder.customer.province_id)
        .then(districts => {
          setDistrictList(districts);
        });
    }
  }, [selectedOrder?.customer?.province_id]);

  useEffect(() => {
    if (selectedOrder?.customer?.district_id) {
      getWards(selectedOrder.customer.district_id)
        .then(wards => {
          setWardList(wards); 
        });
    }
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
      if (!order.status) return false;
      
      const orderStatus = Object.entries(order.status);
      if (!orderStatus.length) return false;
      
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

  const handleOpenReviewDialog = (order) => {
    setSelectedOrder(order);
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
    setSelectedOrder(null);
    setRating(5);
    setComment('');
    setSelectedProducts([]);
  };

  const handleOpenCancelDialog = (order) => {
    setSelectedOrder(order);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
    setSelectedOrder(null);
    setCancelReason('');
  };

  const handleCancelOrder = () => {
    router.post(`/user/order/${selectedOrder.id}`, {
      or_note: cancelReason,
      or_status: 7
    });
    handleCloseCancelDialog();
  };

  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(p => p !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSubmitReview = () => {
    const data = {
      productIds: selectedProducts,
      ra_score: rating,
      ra_comment: comment,
    };
    console.log(data);
    router.post('/user/rating', data);
    handleCloseReviewDialog();
    alert('Cảm ơn bạn đã đánh giá sản phẩm!');
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
            <Tab label="Đã giao bên vận chuyển" />
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
                    {tabValue === 4 && (
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<RateReviewIcon />}
                        onClick={() => handleOpenReviewDialog(order)}
                        sx={{ borderRadius: 2, mr: 1 }}
                      >
                        Đánh giá
                      </Button>
                    )}
                    {(tabValue === 0 || tabValue === 1) && (
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => handleOpenCancelDialog(order)}
                        sx={{ borderRadius: 2 }}
                      >
                        Hủy đơn
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <DetailOrders
        openDetailDialog={openDetailDialog}
        handleCloseDetailDialog={handleCloseDetailDialog}
        selectedOrder={selectedOrder}
        addressDetails={addressDetails}
        provinceList={provinceList}
        districtList={districtList}
        wardList={wardList}
        selectedAddress={selectedAddress}
      />

      <Dialog
        open={openReviewDialog}
        onClose={handleCloseReviewDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#1976d2' }}>Đ</Avatar>
          <Box>
            <Typography variant="h6">Đánh giá đơn hàng #{selectedOrder?.id}</Typography>
            <Typography variant="caption" color="text.secondary">
              Hãy chia sẻ nhận xét của bạn về sản phẩm
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth variant="outlined" sx={{ fontWeight: 'bold', mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Chọn sản phẩm cần đánh giá</Typography>
              {selectedOrder?.orderDetails?.map((detail, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Checkbox
                    checked={selectedProducts.includes(detail.p_id)}
                    onChange={() => handleProductSelect(detail.p_id)}
                  />
                  <Avatar variant="rounded" sx={{ bgcolor: '#e3f2fd' }}>
                    {detail.p_name[0]}
                  </Avatar>
                  <Typography>{detail.p_name}</Typography>
                </Box>
              ))}
            </FormControl>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Bạn cảm thấy sản phẩm này như thế nào?</Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
                sx={{ fontSize: '2.5rem', color: '#f57c00' }}
              />
            </Box>

            <TextField
              label="Chia sẻ thêm về trải nghiệm của bạn"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Sản phẩm có tốt không? Chất lượng thế nào?"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleCloseReviewDialog}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            sx={{ borderRadius: 2, px: 3 }}
            disabled={selectedProducts.length === 0 || !rating || !comment}
          >
            Gửi đánh giá
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5', py: 2 }}>
          <Typography variant="h6">Hủy đơn hàng #{selectedOrder?.id}</Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            label="Lý do hủy đơn"
            multiline
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Vui lòng cho chúng tôi biết lý do bạn hủy đơn hàng này"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleCloseCancelDialog}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleCancelOrder}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, px: 3 }}
            disabled={!cancelReason}
          >
            Xác nhận hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderSuccess;