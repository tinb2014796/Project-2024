import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { router } from '@inertiajs/react';

const StyledPaper = styled(Paper)({
  maxWidth: 400,
  margin: '50px auto',
  padding: '30px',
  textAlign: 'center',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
  borderRadius: '12px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '25px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#00CED1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00CED1',
    },
  },
});

const StyledButton = styled(Button)({
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '8px',
  textTransform: 'none',
});

const Signin = () => {
  const [cus_email, setCusEmail] = useState('');
  const [cus_password, setCusPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = router.post('/signin', { cus_email, cus_password });
    console.log(response);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          ĐĂNG NHẬP TÀI KHOẢN
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Bạn chưa có tài khoản? <Link href="/signup" sx={{ color: '#00CED1', textDecoration: 'none', fontWeight: 'bold' }}>Đăng ký tại đây</Link>
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            placeholder="Nhập địa chỉ email của bạn"
            value={cus_email}
            onChange={(e) => setCusEmail(e.target.value)}
          />
          <StyledTextField
            label="Mật khẩu" 
            variant="outlined"
            type="password"
            fullWidth
            required
            placeholder="Nhập mật khẩu của bạn"
            value={cus_password}
            onChange={(e) => setCusPassword(e.target.value)}
          />
          <Typography variant="body2" align="left" gutterBottom sx={{ mb: 3 }}>
            Quên mật khẩu? <Link href="/forgot-password" sx={{ color: '#00CED1', textDecoration: 'none', fontWeight: 'bold' }}>Nhấn vào đây</Link>
          </Typography>
          <StyledButton 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              backgroundColor: '#00CED1',
              '&:hover': {
                backgroundColor: '#008B8B'
              },
              mb: 2
            }}
          >
            Đăng nhập
          </StyledButton>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default Signin;
