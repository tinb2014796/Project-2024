import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { usePage, router } from '@inertiajs/react';

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
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Danh sách khách hàng</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Họ</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Giới tính</TableCell>
                            <TableCell>Ngày sinh</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Điểm tích lũy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow 
                                key={customer.id}
                                onClick={() => handleRowClick(customer.id)}
                                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                            >
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.cus_familyname}</TableCell>
                                <TableCell>{customer.cus_name}</TableCell>
                                <TableCell>{customer.cus_email}</TableCell>
                                <TableCell>{customer.cus_sdt}</TableCell>
                                <TableCell>{formatGender(customer.cus_sex)}</TableCell>
                                <TableCell>{formatDate(customer.cus_birthday)}</TableCell>
                                <TableCell>{customer.cus_address}</TableCell>
                                <TableCell>{customer.cus_points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}