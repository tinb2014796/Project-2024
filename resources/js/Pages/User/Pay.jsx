import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup, ToggleButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import { usePage, router } from "@inertiajs/react";
import axios from 'axios';
import { getAddressDetails, getProvinces, getDistricts, getWards } from './Function';

const Pays = () => {
    const { cart, products, customer, saleOffs } = usePage().props;

    const [paymentMethod, setPaymentMethod] = React.useState('cod');
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [note, setNote] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [shopInfo, setShopInfo] = useState(null);
    const [cusAddressId, setCusAddressId] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState('');
    const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
    const [appliedVoucher, setAppliedVoucher] = useState(null);


    useEffect(() => {
        if (!customer || !customer.cus_address || !customer.cus_sdt) {
            setOpenAddressDialog(true);
        }
        fetchProvinces();
        fetchShopInfo();
    }, []);

    const handleApplyVoucher = async () => {
        try {
            if (!saleOffs) {
                console.error('saleOffs is undefined');
                return;
            }

            const saleOff = saleOffs.find(so => so.s_code === voucherCode);
            if (saleOff) {
                if (saleOff.s_catalory === '1') {
                    setDiscount(saleOff.s_percent / 100 * calculateTotal());
                } else {
                    setDiscount(saleOff.s_value_max);
                }
                setAppliedVoucher(saleOff);
                setOpenVoucherDialog(false);
            } else {
                alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
            }
        } catch (error) {
            console.error('Lỗi khi áp dụng voucher:', error);
        }
    };

    const handleRemoveVoucher = () => {
        setDiscount(0);
        setAppliedVoucher(null);
        setVoucherCode('');
    };

    const fetchShopInfo = async () => {
        try {
            const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shop/all', {
                headers: {
                    'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                    'ShopId': '195215',
                    'Content-Type': 'application/json'
                }
            });

            if(response.data.code === 200) {
                setShopInfo(response.data.data);
                console.log("Shop info:", response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin shop:', error);
        }
    };

    useEffect(() => {
        if(customer && customer.ward_code && shopInfo) {
            calculateShippingFee();
        }
    }, [customer, shopInfo]);

    const calculateShippingFee = async () => {
        try {
            const toDistrictId = parseInt(customer.district_id);
            const toProvinceId = parseInt(customer.province_id);
            
            if (!toDistrictId || !toProvinceId || !customer.ward_code) {
                console.error('Thiếu thông tin địa chỉ giao hàng');
                return;
            }

            const response = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
                service_type_id: 2,
                insurance_value: calculateTotal(),
                to_ward_code: String(customer.ward_code),
                to_district_id: toDistrictId,
                to_province_id: toProvinceId,
                weight: 200,
                length: 20,
                width: 20,
                height: 10
            }, {
                headers: {
                    'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                    'ShopId': '195215',
                    'Content-Type': 'application/json'
                }
            });

            if(response.data.code === 200) {
                setShippingFee(response.data.data.total);
            }
        } catch (error) {
            console.error('Lỗi khi tính phí vận chuyển:', error?.response?.data || error);
            setShippingFee(0);
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.data) {
                setProvinces(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                headers: {
                    'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                    'Content-Type': 'application/json'
                },
                params: {
                    province_id: provinceId
                }
            });
            if (response.data.data) {
                setDistricts(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quận/huyện:', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                headers: {
                    'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                    'Content-Type': 'application/json'
                },
                params: {
                    district_id: districtId
                }
            });
            if (response.data.data) {
                setWards(response.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phường/xã:', error);
        }
    };

    const handleProvinceChange = (event) => {
        const provinceId = event.target.value;
        setSelectedProvince(provinceId);
        setSelectedDistrict('');
        setSelectedWard('');
        fetchDistricts(provinceId);
    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard('');
        fetchWards(districtId);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
        setCusAddressId(event.target.value);
    };

    const handlePaymentChange = (event, newPaymentMethod) => {
      if (newPaymentMethod !== null) {
        
        setPaymentMethod(newPaymentMethod);
      }
    };

    const calculateTotal = () => {
      const subtotal = cart.products.reduce((total, product) => {
        const productInfo = products.find(p => p.id === product.id);
        const saleOffPercent = productInfo?.sale_off?.[0]?.s_percent || 0;
        const discountedPrice = product.price * (1 - saleOffPercent/100);
        return total + discountedPrice * product.quantity;
      }, 0);
      return subtotal - discount;
    };

    const getProductImage = (productId) => {
      const product = products.find(p => p.id === productId);
      return product && product.images.length > 0 ? product.images[0].ip_image : '';
    };
    
    const getProductName = (productId) => {
      const product = products.find(p => p.id === productId);
      return product ? product.p_name : '';
    };

    const handleAddressSubmit = () => {
        const customerId = customer.id;
        if (address && phone && selectedProvince && selectedDistrict && selectedWard) {
            const selectedProvinceData = provinces.find(p => p.ProvinceID === selectedProvince);
            const selectedDistrictData = districts.find(d => d.DistrictID === selectedDistrict);
            const selectedWardData = wards.find(w => w.WardCode === selectedWard);
            
            const formattedAddress = `${address}, ${selectedWardData.WardName}, ${selectedDistrictData.DistrictName}, ${selectedProvinceData.ProvinceName}`;
            router.post('/user/update-address', { 
                address: formattedAddress, 
                phone, 
                customer_id: customerId,
                province_id: selectedProvince,
                district_id: selectedDistrict,
                ward_code: selectedWard,
            });
            setOpenAddressDialog(false);
        }
    };

    const handlePaymentSubmit = () => {
      const data = {
        paymentMethod: paymentMethod,
        // payment_id: paymentMethod == 'vnpay' ? '1' : '2',
        customer_id: customer.id,
        products: cart.products.map(product => {
          const productInfo = products.find(p => p.id === product.id);
          const saleOffPercent = productInfo?.sale_off?.[0]?.s_percent || 0;
          const discountAmount = (product.price * saleOffPercent/100) * product.quantity;
          return {
            ...product,
            discount: discountAmount
          }
        }),
        note: note,
        shippingFee: shippingFee,
        cus_address_id: cusAddressId,
        voucher_code: appliedVoucher?.s_code,
        discount: discount,
      }
      router.post('/user/create-order', data);
    };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon color="error" sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>Địa Chỉ Nhận Hàng</Typography>
        </Box>
        {customer && customer.cus_address && customer.cus_sdt ? (
            <Box sx={{ backgroundColor: '#f8f9fa', p: 2, borderRadius: '8px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {customer.cus_name} (+84) {customer.cus_sdt}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                    {customer.cus_address}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Chip label="Mặc Định" size="small" sx={{ mr: 1, backgroundColor: '#e3f2fd' }} />
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        onClick={() => setOpenAddressDialog(true)}
                        sx={{ borderRadius: '20px' }}
                    >
                        Thay Đổi
                    </Button>
                </Box>
            </Box>
        ) : (
            <Typography variant="body1" color="error" sx={{ p: 2, backgroundColor: '#fff3f3', borderRadius: '8px' }}>
                Vui lòng thêm địa chỉ nhận hàng và số điện thoại
            </Typography>
        )}
      </Paper>

      <Dialog 
        open={openAddressDialog} 
        onClose={() => setOpenAddressDialog(false)} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
          Thêm Địa Chỉ Mới
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tỉnh/Thành phố</InputLabel>
                <Select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  label="Tỉnh/Thành phố"
                  sx={{ borderRadius: '8px' }}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Quận/Huyện</InputLabel>
                <Select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  label="Quận/Huyện"
                  disabled={!selectedProvince}
                  sx={{ borderRadius: '8px' }}
                >
                  {districts.map((district) => (
                    <MenuItem key={district.DistrictID} value={district.DistrictID}>
                      {district.DistrictName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phường/Xã</InputLabel>
                <Select
                  value={selectedWard}
                  onChange={handleWardChange}
                  label="Phường/Xã"
                  disabled={!selectedDistrict}
                  sx={{ borderRadius: '8px' }}
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ chi tiết"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText="Nhập số điện thoại 10 chữ số"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenAddressDialog(false)}
            sx={{ borderRadius: '20px' }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleAddressSubmit} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: '20px' }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={openVoucherDialog} 
        onClose={() => setOpenVoucherDialog(false)} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
          Nhập Mã Giảm Giá
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Mã giảm giá"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setOpenVoucherDialog(false)}
            sx={{ borderRadius: '20px' }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleApplyVoucher} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: '20px' }}
          >
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
        <Grid container spacing={2} sx={{ mb: 3, borderBottom: '1px solid #eee', pb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Sản phẩm</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Đơn giá</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Số lượng</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Khuyến mãi</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Thành tiền</Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, backgroundColor: '#f8f9fa', p: 2, borderRadius: '8px' }}>
          <FavoriteIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Thiết bị gia dụng - Chất lượng</Typography>
        </Box>

        {cart.products.map((product) => {
          const productInfo = products.find(p => p.id === product.id);
          const saleOffPercent = productInfo?.sale_off?.[0]?.s_percent || 0;
          const discountedPrice = product.price * (1 - saleOffPercent/100);
          return (
            <Grid container spacing={2} sx={{ mb: 2, p: 2, backgroundColor: '#fff', borderRadius: '8px' }} key={product.id}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={getProductImage(product.id)}
                  alt={getProductName(product.id)}
                  sx={{ width: 60, height: 60, mr: 2, borderRadius: '8px' }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{getProductName(product.id)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">{product.price.toLocaleString()} đ</Typography>
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">{product.quantity}</Typography>
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                  {saleOffPercent}%
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {(discountedPrice * product.quantity).toLocaleString()} đ
                </Typography>
              </Grid>
            </Grid>
          );
        })}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Lưu ý cho Người bán..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              } 
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3,
          p: 2,
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <Typography variant="body2">Đơn vị vận chuyển:</Typography>
          <Box marginRight={90}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}> Giao hàng nhanh</Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>Nhận hàng trong 3 4 ngày</Typography>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
              Phí vận chuyển: {shippingFee.toLocaleString()} đ
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 3,
          p: 2,
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <Typography variant="body2">Mã giảm giá của bạn:</Typography>
          {appliedVoucher ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip 
                label={`Mã ${appliedVoucher.s_code} - Giảm ${discount ? discount.toLocaleString() : 0} đ`}
                onDelete={handleRemoveVoucher}
                color="primary"
                sx={{ borderRadius: '16px' }}
              />
            </Box>
          ) : (
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              onClick={() => setOpenVoucherDialog(true)}
              sx={{ borderRadius: '20px' }}
            >
              Chọn/Nhập mã
            </Button>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3,
          p: 2,
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Tổng số tiền ({cart.products.length} sản phẩm):
          </Typography>
          <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
            {(calculateTotal() + shippingFee).toLocaleString()} đ
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Phương thức thanh toán:
          </Typography>
          <ToggleButtonGroup
            value={paymentMethod}
            exclusive
            onChange={handlePaymentChange}
            aria-label="payment method"
            sx={{ 
              '& .MuiToggleButton-root': {
                borderRadius: '8px',
                mx: 1,
                p: 2,
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  fontWeight: 600
                }
              }
            }}
          >
            <ToggleButton value="cod" aria-label="COD">
              Thanh toán khi nhận hàng
            </ToggleButton>
            <ToggleButton value="bank" aria-label="Bank transfer">
              Chuyển khoản ngân hàng
            </ToggleButton>
            <ToggleButton value="momo" aria-label="Momo">
              Ví MoMo
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button 
            onClick={handlePaymentSubmit} 
            variant="contained" 
            sx={{ 
              backgroundColor: '#FFCC33', 
              color: 'black',
              width: '250px',
              height: '48px',
              borderRadius: '24px',
              fontWeight: 600,
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#E6B800'
              }
            }}
          >
            Thanh Toán
          </Button>
        </Box>
      </Paper>
      
    </Box>
  );
};

export default Pays;
