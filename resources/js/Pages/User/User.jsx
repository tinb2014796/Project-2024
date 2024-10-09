import React, { useState } from 'react'
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Chip, ToggleButtonGroup, ToggleButton, Select, MenuItem, Avatar } from '@mui/material';
import { Edit, Lock, VpnKey, Delete } from '@mui/icons-material';
import UpdateUserInfoModal from './Update';

const User = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateType, setUpdateType] = useState('');
  const [currentUser, setCurrentUser] = useState({
    name: 'Trần Nghệ',
    nickname: 'Nghệ',
    phone: '0345291448',
    email: 'trantin179@gmail.com'
  });

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

  return (
    <>
      <Typography variant="h4" gutterBottom>Thông tin tài khoản</Typography>
      <Paper sx={{ p: 3, maxWidth: 1200, mx: 'auto', marginTop: 3}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Thông tin cá nhân</Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ width: 100, height: 100, mr: 3 }} />
              <Box flexGrow={1}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ minWidth: 100 }}>Họ & Tên:</Typography>
                  <TextField value={currentUser.name} fullWidth />
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="body1" sx={{ minWidth: 100 }}>Nickname:</Typography>
                  <TextField value={currentUser.nickname} fullWidth />
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap={3} mb={3}>
              <Typography variant="body1" sx={{ minWidth: 80 }}>Ngày sinh: </Typography>
              <Select defaultValue={1} size="small" sx={{ minWidth: 80 }}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
              <Select defaultValue={6} size="small" sx={{ minWidth: 80 }}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
              <Select defaultValue={2002} size="small" sx={{ minWidth: 100 }}>
                {Array.from({ length: 101 }, (_, i) => 2024 - i).map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Typography variant="body1" sx={{ minWidth: 80 }}>Giới tính:</Typography>
              <ToggleButtonGroup exclusive sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
                  <ToggleButton value="nam" sx={{ flex: 1, justifyContent: 'flex-start', border: 'none', fontWeight: 'bold', '&::before': { content: '""', width: '16px', height: '16px', borderRadius: '50%', marginRight: '12px', border: '2px solid currentColor', transition: 'background-color 0.3s' }, '&.Mui-selected::before': { backgroundColor: 'primary.main' }, '&:hover::before': { backgroundColor: 'primary.light' } }}>Nam</ToggleButton>
                  <ToggleButton value="nu" sx={{ flex: 1, justifyContent: 'flex-start', border: 'none', fontWeight: 'bold', '&::before': { content: '""', width: '16px', height: '16px', borderRadius: '50%', marginRight: '12px', border: '2px solid currentColor', transition: 'background-color 0.3s' }, '&.Mui-selected::before': { backgroundColor: 'primary.main' }, '&:hover::before': { backgroundColor: 'primary.light' } }}>Nữ</ToggleButton>
                  <ToggleButton value="khac" sx={{ flex: 1, justifyContent: 'flex-start', border: 'none', fontWeight: 'bold', '&::before': { content: '""', width: '16px', height: '16px', borderRadius: '50%', marginRight: '12px', border: '2px solid currentColor', transition: 'background-color 0.3s' }, '&.Mui-selected::before': { backgroundColor: 'primary.main' }, '&:hover::before': { backgroundColor: 'primary.light' } }}>Khác</ToggleButton>
                </Box>
              </ToggleButtonGroup>
            </Box>
            <Button variant="contained" sx={{ mt: 3 }}>Lưu thay đổi</Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Số điện thoại và Email</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>Số điện thoại: {currentUser.phone}</Typography>
              <Button variant="outlined" size="medium" onClick={() => handleOpenUpdateModal('phone')}>Cập nhật</Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>Địa chỉ email: {currentUser.email}</Typography>
              <Button variant="outlined" size="medium" onClick={() => handleOpenUpdateModal('email')}>Cập nhật</Button>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>Bảo mật</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                <Lock sx={{ mr: 2, fontSize: 28 }} />
                <Typography variant="body1">Thiết lập mật khẩu</Typography>
              </Box>
              <Button variant="outlined" size="medium">Cập nhật</Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                <VpnKey sx={{ mr: 2, fontSize: 28 }} />
                <Typography variant="body1">Thiết lập mã PIN</Typography>
              </Box>
              <Button variant="outlined" size="medium">Thiết lập</Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                <Delete sx={{ mr: 2, fontSize: 28 }} />
                <Typography variant="body1">Yêu cầu xóa tài khoản</Typography>
              </Box>
              <Button variant="outlined" size="medium" color="error">Yêu cầu</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <UpdateUserInfoModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        user={currentUser}
        onUpdate={handleUpdateUser}
        updateType={updateType}
      />
    </>
  );
};

export default User;
