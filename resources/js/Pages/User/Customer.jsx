import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup, ToggleButton, Select, MenuItem, Avatar, IconButton } from '@mui/material';
import { Edit, Lock, VpnKey, Delete, PhotoCamera } from '@mui/icons-material';
import UpdateUserInfoModal from './Update';
import CustomerUpdate from '../../Components/CustomerUpdate';
import { router ,usePage} from '@inertiajs/react';
import axios from 'axios';

const User = () => {
  const { customer } = usePage().props;
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateType, setUpdateType] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: customer.cus_familyname,
    nickname: customer.cus_name,
    phone: customer.cus_sdt,
    email: customer.cus_email,
    birth: customer.cus_birthday,
    sex: customer.cus_sex,
    image: customer.cus_image
  });
  const [openCustomerUpdate, setOpenCustomerUpdate] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(currentUser.image);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        setProvinces(response.data);
        const selectedProvince = response.data.find(p => p.Id === customer.province_id);
        if (selectedProvince) {
          setDistricts(selectedProvince.Districts);
          const selectedDistrict = selectedProvince.Districts.find(d => d.Id === customer.district_id);
          if (selectedDistrict) {
            setWards(selectedDistrict.Wards);
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

  const getProvinceName = () => {
    const province = provinces.find(p => p.Id === customer.province_id);
    return province ? province.Name : '';
  };

  const getDistrictName = () => {
    const district = districts.find(d => d.Id === customer.district_id);
    return district ? district.Name : '';
  };

  const getWardName = () => {
    const ward = wards.find(w => w.Id === customer.ward_code);
    return ward ? ward.Name : '';
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: 13, marginTop: 3 }}>
        Thông tin tài khoản
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, maxWidth: 1400, mx: 'auto', marginTop: 3 }}>
        <Paper sx={{ p: 3, width: 250, height: 'fit-content' }}>
          <Box display="flex" flexDirection="column" alignItems="center" position="relative">
            <Avatar 
              sx={{ 
                width: 180, 
                height: 180, 
                mb: 2,
                opacity: loading ? 0.5 : 1 
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
                  bottom: 50,
                  right: 20,
                  backgroundColor: 'white',
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
            <Typography variant="h6" align="center">{customer.cus_familyname} {customer.cus_name}</Typography>
          </Box>
        </Paper>
        
        <Paper sx={{ p: 3, flexGrow: 1, position: 'relative'}}>
          <Button 
            variant="contained"
            size="small"
            color="primary"
            sx={{ position: 'absolute', top: 16, right: 16 }}
            onClick={() => setOpenCustomerUpdate(true)}
          >
            Cập nhật thông tin
          </Button>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Thông tin cá nhân</Typography>
              <Box flexGrow={1}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ minWidth: 100 }}>Họ:</Typography>
                  <Typography>{customer.cus_familyname}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="body1" sx={{ minWidth: 100 }}>Tên:</Typography>
                  <Typography>{customer.cus_name}</Typography>
                </Box>
              </Box>
              <Box display="flex" gap={3} mb={3} mt={3}>
                <Typography variant="body1" sx={{ minWidth: 80 }}>Ngày sinh: </Typography>
                <Typography>{formatDate(customer.cus_birthday)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Typography variant="body1" sx={{ minWidth: 80 }}>Giới tính:</Typography>
                <Typography>{translateGender(customer.cus_sex)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Số điện thoại và Email</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>Số điện thoại: {customer.cus_sdt}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>Địa chỉ email: {customer.cus_email}</Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>Địa chỉ</Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1">
                  {customer.cus_address}, {getWardName()}, {getDistrictName()}, {getProvinceName()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <CustomerUpdate 
        open={openCustomerUpdate}
        onClose={() => setOpenCustomerUpdate(false)}
        customer={customer}
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
