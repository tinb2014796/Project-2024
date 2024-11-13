import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup, ToggleButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import { usePage, router } from "@inertiajs/react";
import axios from 'axios';

const Pays = () => {
    const { cart, products, customer } = usePage().props;
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

    useEffect(() => {
        if (!customer || !customer.cus_address || !customer.cus_sdt) {
            setOpenAddressDialog(true);
        }
        fetchProvinces();
        fetchShopInfo();
    }, []);

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
      return cart.products.reduce((total, product) => {
        const productInfo = products.find(p => p.id === product.id);
        const saleOffPercent = productInfo?.sale_off?.[0]?.s_percent || 0;
        const discountedPrice = product.price * (1 - saleOffPercent/100);
        return total + discountedPrice * product.quantity;
      }, 0);
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
        total: calculateTotal() + shippingFee,
      }
      router.post('/user/create-order', data);
    };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon color="error" />
          <Typography variant="h6" sx={{ ml: 1 }}>Địa Chỉ Nhận Hàng</Typography>
        </Box>
        {customer && customer.cus_address && customer.cus_sdt ? (
            <>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {customer.cus_name} (+84) {customer.cus_sdt}
                </Typography>
                <Typography variant="body2">
                    {customer.cus_address}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Chip label="Mặc Định" size="small" sx={{ mr: 1 }} />
                    <Button variant="text" color="primary" size="small" onClick={() => setOpenAddressDialog(true)}>Thay Đổi</Button>
                </Box>
            </>
        ) : (
            <Typography variant="body1" color="error">
                Vui lòng thêm địa chỉ nhận hàng và số điện thoại
            </Typography>
        )}
      </Paper>

      {/* Phần còn lại của component giữ nguyên */}

      <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thêm Địa Chỉ Mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Tỉnh/Thành phố</InputLabel>
                <Select
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  label="Tỉnh/Thành phố"
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
              <FormControl fullWidth margin="normal">
                <InputLabel>Quận/Huyện</InputLabel>
                <Select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  label="Quận/Huyện"
                  disabled={!selectedProvince}
                >
                  {districts.map((district) => (
                    <MenuItem key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Phường/Xã</InputLabel>
                <Select
                  value={selectedWard}
                  onChange={handleWardChange}
                  label="Phường/Xã"
                  disabled={!selectedDistrict}
                >
                  {wards.map((ward) => (
                    <MenuItem key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ chi tiết"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ maxLength: 10 }}
                helperText="Nhập số điện thoại 10 chữ số"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddressDialog(false)}>Hủy</Button>
          <Button onClick={handleAddressSubmit} variant="contained" color="primary">Lưu</Button>
        </DialogActions>
      </Dialog>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Sản phẩm</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Đơn giá</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1">Số lượng</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1">Khuyến mãi</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Thành tiền</Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FavoriteIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">Phụ Kiện - Đồ Dùng - Siêu Rẻ</Typography>
          <Button startIcon={<ChatIcon />} variant="outlined" size="small" sx={{ ml: 2 }}>
            Chat ngay
          </Button>
        </Box>

        {cart.products.map((product) => {
          const productInfo = products.find(p => p.id === product.id);
          const saleOffPercent = productInfo?.sale_off?.[0]?.s_percent || 0;
          const discountedPrice = product.price * (1 - saleOffPercent/100);
          return (
            <Grid container spacing={2} sx={{ mb: 2 }} key={product.id}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={getProductImage(product.id)}
                  alt={getProductName(product.id)}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box>
                  <Typography variant="body2">{getProductName(product.id)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">đ{product.price.toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2">{product.quantity}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" color="error">
                  {saleOffPercent}%
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">đ{(discountedPrice * product.quantity).toLocaleString()}</Typography>
              </Grid>
            </Grid>
          );
        })}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Lưu ý cho Người bán..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">Đơn vị vận chuyển:</Typography>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Nhanh</Typography>
            <Typography variant="caption">Nhan hang vao ngay</Typography>
            <Typography variant="body2" color="primary">
              Phí vận chuyển: đ{shippingFee.toLocaleString()}
            </Typography>
          </Box>
          <Button variant="text" color="primary" size="small">Thay Đổi</Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>Được đồng kiểm.</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1">Tổng số tiền ({cart.products.length} sản phẩm):</Typography>
          <Typography variant="h6" color="error">đ{(calculateTotal() + shippingFee).toLocaleString()}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Phương thức thanh toán:</Typography>
          <ToggleButtonGroup
            value={paymentMethod}
            exclusive
            onChange={handlePaymentChange}
            aria-label="payment method"
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

        <Button onClick={handlePaymentSubmit} variant="contained" sx={{ backgroundColor: '#FFCC33', color: 'black', marginLeft: 130, width: '250px', mt: 2 }}> Thanh Toán</Button>
      </Paper>
    </Box>
    
  );
  
};

export default Pays;
