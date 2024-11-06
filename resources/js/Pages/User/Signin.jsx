import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { router } from '@inertiajs/react';

const StyledPaper = styled(Paper)({
  maxWidth: 400,
  marginTop: '100px',
  marginLeft: 'auto',
  marginRight: 'auto',  
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: '#333',
  },
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
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom>
        ĐĂNG NHẬP TÀI KHOẢN
      </Typography>
      <Typography variant="body1" gutterBottom>
        Bạn chưa có tài khoản? <Link href="/signup" color="primary">Đăng ký tại đây</Link>
      </Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          placeholder="Email"
          value={cus_email}
          onChange={(e) => setCusEmail(e.target.value)}
        />
        <StyledTextField
          label="Mật khẩu"
          variant="outlined"
          type="password"
          fullWidth
          required
          placeholder="Mật khẩu"
          value={cus_password}
          onChange={(e) => setCusPassword(e.target.value)}
        />
        <Typography variant="body2" align="left" gutterBottom>
          Quên mật khẩu? <Link href="/forgot-password" color="primary">Nhấn vào đây</Link>
        </Typography>
        <StyledButton type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#E6B800' } }} >
          Đăng nhập
        </StyledButton>
      </form>
    </StyledPaper>
  );
};

export default Signin;
