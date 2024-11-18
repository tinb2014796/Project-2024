import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material';
import { usePage, router } from '@inertiajs/react';
import { Person, Email, Phone, Cake, LocationOn, Stars } from '@mui/icons-material';

export default function Customer() {
    const { customers } = usePage().props;

    const formatGender = (gender) => {
        return gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const handleRowClick = (customerId) => {
        router.visit(`/admin/customers/${customerId}`);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ p: 4 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            mb: 4,
                            fontWeight: 'bold',
                            color: '#1976d2',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Person sx={{ fontSize: 35 }} />
                        Danh sách khách hàng
                    </Typography>

                    <TableContainer sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Họ</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tên</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email fontSize="small" />
                                            Email
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Phone fontSize="small" />
                                            Số điện thoại
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Giới tính</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Cake fontSize="small" />
                                            Ngày sinh
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOn fontSize="small" />
                                            Địa chỉ
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Stars fontSize="small" />
                                            Điểm tích lũy
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow 
                                        key={customer.id}
                                        onClick={() => handleRowClick(customer.id)}
                                        sx={{ 
                                            cursor: 'pointer',
                                            '&:hover': { 
                                                backgroundColor: '#f5f5f5',
                                                transition: 'background-color 0.2s'
                                            },
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#fafafa'
                                            }
                                        }}
                                    >
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.cus_familyname}</TableCell>
                                        <TableCell>{customer.cus_name}</TableCell>
                                        <TableCell>{customer.cus_email}</TableCell>
                                        <TableCell>{customer.cus_sdt}</TableCell>
                                        <TableCell>{formatGender(customer.cus_sex)}</TableCell>
                                        <TableCell>{formatDate(customer.cus_birthday)}</TableCell>
                                        <TableCell>{customer.cus_address}</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                            {customer.cus_points}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Container>
    );
}