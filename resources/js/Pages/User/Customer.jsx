import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup, ToggleButton, Select, MenuItem, Avatar, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit, Lock, VpnKey, Delete, PhotoCamera, CardGiftcard } from '@mui/icons-material';
import UpdateUserInfoModal from './Update';
import CustomerUpdate from '../../Components/CustomerUpdate';
import { router ,usePage} from '@inertiajs/react';
import axios from 'axios';

const User = () => {
  const { customer } = usePage().props;
  console.log(customer);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateType, setUpdateType] = useState('');
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: customer.cus_familyname,
    nickname: customer.cus_name,
    phone: customer.cus_sdt,
    email: customer.cus_email,
    birth: customer.cus_birthday,
    sex: customer.cus_sex,
    image: customer.cus_image,
    province_id: customer.province_id,
    district_id: customer.district_id,
    ward_code: customer.ward_code
  });
  console.log(currentUser);
  const [openCustomerUpdate, setOpenCustomerUpdate] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(currentUser.image);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: 'Giảm giá 50.000đ',
      points: 25,
      value_max: 50000,
      value_min: 100000,
      description: 'Áp dụng cho đơn hàng từ 200.000đ',
      isOwned: false
    },
    {
      id: 2, 
      name: 'Giảm giá 100.000đ',
      points: 40,
      value_max: 100000,
      value_min: 1500000,
      description: 'Áp dụng cho đơn hàng từ 1.500.000đ',
      isOwned: false
    },
    {
      id: 3,
      name: 'Giảm giá 200.000đ',
      points: 50,
      value_max: 200000,
      value_min: 1800000, 
      description: 'Áp dụng cho đơn hàng từ 1.800.000đ',
      isOwned: false
    }
  ]);

  useEffect(() => {
    if (customer.sale_offs) {
      setVouchers(prev => prev.map(voucher => ({
        ...voucher,
        isOwned: customer.sale_offs.some(so => so.s_name === voucher.name)
      })));
    }
  }, [customer.sale_offs]);

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
        const selectedProvince = response.data.data.find(p => p.ProvinceID == customer.province_id);
        if (selectedProvince) {
          const districtResponse = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            headers: {
              'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
              'Content-Type': 'application/json'
            },
            params: {
              province_id: selectedProvince.ProvinceID
            }
          });
          setDistricts(districtResponse.data.data);
          const selectedDistrict = districtResponse.data.data.find(d => d.DistrictID == customer.district_id);
          if (selectedDistrict) {
            const wardResponse = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
              headers: {
                'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                'Content-Type': 'application/json'
              },
              params: {
                district_id: selectedDistrict.DistrictID
              }
            });
            setWards(wardResponse.data.data);
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
      }
    };
    fetchProvinces();
  }, [customer]);

  const handleOpenUpdateModal = (type) => {
    setUpdateType(type);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(prevUser => ({...prevUser, ...updatedUser}));
    handleCloseUpdateModal();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc GIF');
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('cus_image', file);

    try {
      await router.post(`/user/customer/update/image/${customer.id}`, formData);
      setSelectedImage(URL.createObjectURL(file));
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
      alert('Có lỗi xảy ra khi tải ảnh lên');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const translateGender = (gender) => {
    switch(gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return 'Khác';
    }
  };

  const getProvinceName = (provinceId) => {
    const province = provinces.find(p => p.ProvinceID == provinceId);
    return province ? province.ProvinceName : '';
  };

  const getDistrictName = (districtId) => {
    const district = districts.find(d => d.DistrictID == districtId);
    return district ? district.DistrictName : '';
  };
 
  const getWardName = (wardCode) => {
    const ward = wards.find(w => w.WardCode == wardCode);
    return ward ? ward.WardName : '';
  };
 
  const handleTradePoints = (voucher) => {
    router.post('/user/trade-point', {
      name: voucher.name,
      points: voucher.points,
      description: voucher.description,
      value_max: voucher.value_max,
      value_min: voucher.value_min
    });
    alert('Đã đổi voucher thành công!');
  };

  return (
    <>
      <Box sx={{ maxWidth: 1400, mx: 'auto', marginTop: 3, marginBottom: 15, padding: '0 20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 4, position: 'relative'}}>
              <Button 
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<Edit />}
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20,
                  borderRadius: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onClick={() => setOpenCustomerUpdate(true)}
              >
                Cập nhật thông tin
              </Button>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                    Thông tin cá nhân
                  </Typography>
                  <Box sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: '8px' }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ minWidth: 100, color: '#666' }}>Họ:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{customer.cus_familyname}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ minWidth: 100, color: '#666' }}>Tên:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{customer.cus_name}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ minWidth: 100, color: '#666' }}>Ngày sinh:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{formatDate(customer.cus_birthday)}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ minWidth: 100, color: '#666' }}>Giới tính:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{translateGender(customer.cus_sex)}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" sx={{ minWidth: 100, color: '#666' }}>Điểm tích lũy: </Typography>
                      <Typography sx={{ fontWeight: 500, color: '#00BCD4', marginRight: 2 }}> { customer.cus_points || 0} điểm</Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#00BCD4',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#00ACC1'
                          },
                          borderRadius: '20px',
                          padding: '4px 16px'
                        }}
                        onClick={() => setOpenVoucherModal(true)}
                      >
                        Kho Voucher
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box display="flex" flexDirection="column" alignItems="center" position="relative">
                    <Avatar 
                      sx={{ 
                        width: 200, 
                        height: 200, 
                        mb: 2,
                        opacity: loading ? 0.5 : 1,
                        border: '3px solid #f5f5f5'
                      }} 
                      src={previewImage || selectedImage} 
                    />
                    <input
                      accept="image/jpeg,image/png,image/gif"
                      style={{ display: 'none' }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                    <label htmlFor="avatar-upload">
                      <IconButton 
                        color="primary" 
                        aria-label="upload picture"
                        component="span"
                        disabled={loading}
                        sx={{
                          position: 'absolute',
                          bottom: 60,
                          right: 30,
                          backgroundColor: 'white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {loading && (
                      <Typography variant="caption" color="text.secondary">
                        Đang tải ảnh lên...
                      </Typography>
                    )}
                    <Typography variant="h6" align="center" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {customer.cus_familyname} {customer.cus_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                    Thông tin liên hệ
                  </Typography>
                  <Box sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: '8px', mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="body1" sx={{ minWidth: 140, color: '#666' }}>Số điện thoại:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{customer.cus_sdt}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" sx={{ minWidth: 140, color: '#666' }}>Email:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{customer.cus_email}</Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                    Địa chỉ
                  </Typography>
                  <Box sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: '8px' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                      {customer.cus_address} 
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog 
        open={openVoucherModal}
        onClose={() => setOpenVoucherModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#00BCD4', color: 'white' }}>
          <Box display="flex" alignItems="center">
            <CardGiftcard sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Kho Voucher</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Điểm tích lũy hiện tại: <span style={{ color: '#00BCD4', fontWeight: 'bold' }}>{customer.cus_points || 0} điểm</span>
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {vouchers.map((voucher) => (
                <Grid item xs={12} sm={6} md={4} key={voucher.id}>
                  <Paper 
                    elevation={3}
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '8px',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                        {voucher.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {voucher.description}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#00BCD4', fontWeight: 'bold' }}>
                        {voucher.points} điểm
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: voucher.isOwned ? '#888' : '#00BCD4',
                        '&:hover': {
                          backgroundColor: voucher.isOwned ? '#888' : '#00ACC1'
                        },
                        borderRadius: '20px'
                      }}
                      disabled={customer.cus_points < voucher.points || voucher.isOwned}
                      onClick={() => handleTradePoints(voucher)}
                    >
                      {voucher.isOwned ? 'Đã sở hữu' : 'Đổi ngay'}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVoucherModal(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <CustomerUpdate 
        open={openCustomerUpdate}
        onClose={() => setOpenCustomerUpdate(false)}
        customer={customer}
        provinces={provinces}
        districts={districts}
        wards={wards}
      />
      <UpdateUserInfoModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateUser}
        type={updateType}
        currentUser={currentUser}
      />
    </>
  );
};

export default User;
