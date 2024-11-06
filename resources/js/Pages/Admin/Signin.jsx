import React from 'react';
import { useForm } from '@inertiajs/react';
import { 
    Box, Typography, TextField, Button, Link,
    Paper
} from '@mui/material';
import { router } from '@inertiajs/react';

export default function Signin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = router.post('/admin/signin', {
            email: data.email,
            password: data.password,
        });
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
        }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    ĐĂNG NHẬP TÀI KHOẢN
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        required
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    />

                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        margin="normal"
                        required
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        error={errors.password ? true : false}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 3, 
                            mb: 2, 
                            bgcolor: '#33CCFF',
                            '&:hover': {
                                bgcolor: '#33CCFF'
                            }
                        }}
                        disabled={processing}
                    >
                        ĐĂNG NHẬP
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
