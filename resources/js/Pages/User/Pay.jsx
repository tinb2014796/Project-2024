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

    useEffect(() => {
        if (!customer.cus_address || !customer.cus_sdt) {
            setOpenAddressDialog(true);
        }
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await axios.get('https://vapi.vnappmob.com/api/province/');
            console.log(response.data);
            if (response.data && response.data.results) {
                setProvinces(response.data.results);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
        }
    };

    const fetchDistricts = async (provinceCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceCode}`);
            console.log(response.data.results);
            if (response.data.results) {
                setDistricts(response.data.results);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách quận/huyện:', error);
        }
    };

    const fetchWards = async (districtCode) => {
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtCode}`);
            console.log(response.data.results);
            if (response.data.results) {
                setWards(response.data.results);
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
    };

    const handlePaymentChange = (event, newPaymentMethod) => {
      if (newPaymentMethod !== null) {
        setPaymentMethod(newPaymentMethod);
      }
    };

    const calculateTotal = () => {
      return cart.products.reduce((total, product) => {
        return total + product.price * product.quantity;
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
            const fullAddress = `${address}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
            const provinceName = provinces.find(p => p.province_id === selectedProvince)?.province_name;
            const districtName = districts.find(d => d.district_id === selectedDistrict)?.district_name;
            const wardName = wards.find(w => w.ward_id === selectedWard)?.ward_name;
            const formattedAddress = `${address}, ${wardName}, ${districtName}, ${provinceName}`;
            router.post('/user/update-address', { address: formattedAddress, phone, customer_id: customerId });
            setOpenAddressDialog(false);
        }
    };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon color="error" />
          <Typography variant="h6" sx={{ ml: 1 }}>Địa Chỉ Nhận Hàng</Typography>
        </Box>
        {customer.cus_address && customer.cus_sdt ? (
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
                    <MenuItem key={province.province_id} value={province.province_id}>
                        {province.province_name}
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
                    <MenuItem key={district.district_id} value={district.district_id}>{district.district_name}</MenuItem>
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
                    <MenuItem key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</MenuItem>
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
          <Grid item xs={2}>
            <Typography variant="subtitle1">Số lượng</Typography>
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

        {cart.products.map((product) => (
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
            <Grid item xs={2}>
              <Typography variant="body2">{product.quantity}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">đ{(product.price * product.quantity).toLocaleString()}</Typography>
            </Grid>
          </Grid>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Lưu ý cho Người bán..."
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">Đơn vị vận chuyển:</Typography>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Nhanh</Typography>
            <Typography variant="caption">Nhận hàng vào 18 Tháng 9 - 19 Tháng 9</Typography>
          </Box>
          <Button variant="text" color="primary" size="small">Thay Đổi</Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>Được đồng kiểm.</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="subtitle1">Tổng số tiền ({cart.products.length} sản phẩm):</Typography>
          <Typography variant="h6" color="error">đ{calculateTotal().toLocaleString()}</Typography>
        </Box>
        <Button variant="contained" sx={{ backgroundColor: '#FFCC33', color: 'black', marginLeft: 163, width: '250px', mt: 2 }}>Thanh Toán</Button>
      </Paper>
    </Box>
    
  );
  
};

export default Pays;
