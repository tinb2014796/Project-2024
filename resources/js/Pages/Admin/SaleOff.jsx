import React, { useState } from 'react';
import { 
    Box, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton,
    TextField, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';


export default function SaleOff() {
    const { saleOffs } = usePage().props;
    const { success: successMessage } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        if (successMessage) {
            alert(successMessage);
        }
    }, [successMessage]);

    const isExpired = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        return end < today;
    };

    const formatVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const filterSaleOffs = (saleOffs) => {
        return saleOffs.filter(saleOff => {
            const matchesSearch = saleOff.s_name.toLowerCase().includes(searchTerm.toLowerCase()) 
            || saleOff.s_percent.toString().includes(searchTerm.toLowerCase())
            || saleOff.s_value_min.toString().includes(searchTerm.toLowerCase())
            || saleOff.s_start.includes(searchTerm.toLowerCase())
            || saleOff.s_end.includes(searchTerm.toLowerCase());
        
            if (filterType === 'active') {
                return matchesSearch  && !isExpired(saleOff.s_end);
            }
            
            return matchesSearch;
        });
    };

    const activeSaleOffs = filterSaleOffs(saleOffs).filter(saleOff => !isExpired(saleOff.s_end));
    const expiredSaleOffs = filterSaleOffs(saleOffs).filter(saleOff => isExpired(saleOff.s_end));

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Chương trình khuyến mại</Typography>
                <Link href="/admin/sale-off/create">
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: '#0d6efd' }}
                    >
                        Tạo khuyến mại
                    </Button>
                </Link>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Tất cả khuyến mại</Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Select
                        size="small"
                        value={filterType}
                        onChange={handleFilterChange}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">Tất cả khuyến mại</MenuItem>
                        <MenuItem value="active">Đang áp dụng</MenuItem>
                        <MenuItem value="expired">Đã hết hạn</MenuItem>
                    </Select>

                    <TextField
                        size="small"
                        placeholder="Tìm kiếm theo tên"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                        }}
                    />


                    <Button variant="outlined">Lưu bộ lọc</Button>
                </Box>

                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>Khuyến mại đang áp dụng</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell>Chương trình khuyến mại</TableCell>
                                <TableCell>Giá trị giảm</TableCell>
                                <TableCell>Giá trị tối thiểu</TableCell>
                                <TableCell>Bắt đầu</TableCell>
                                <TableCell>Kết thúc</TableCell>
                                <TableCell>Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeSaleOffs.map((saleOff) => (
                                <TableRow key={saleOff.id}>
                                    <TableCell padding="checkbox">
                                        <input type="checkbox" />
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography>{saleOff.s_name}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Giảm giá theo phần trăm
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{saleOff.s_percent}%</TableCell>
                                    <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                    <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                    <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            sx={{ 
                                                bgcolor: '#d7f5e5', 
                                                color: '#1dc37a',
                                                '&:hover': { bgcolor: '#d7f5e5' }
                                            }}
                                        >
                                            Đang áp dụng
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Khuyến mại đã hết hạn</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <input type="checkbox" />
                                </TableCell>
                                <TableCell>Chương trình khuyến mại</TableCell>
                                <TableCell>Giá trị giảm</TableCell>
                                <TableCell>Giá trị tối thiểu</TableCell>
                                <TableCell>Bắt đầu</TableCell>
                                <TableCell>Kết thúc</TableCell>
                                <TableCell>Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expiredSaleOffs.map((saleOff) => (
                                <TableRow key={saleOff.id}>
                                    <TableCell padding="checkbox">
                                        <input type="checkbox" />
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography>{saleOff.s_name}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Giảm giá theo phần trăm
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{saleOff.s_percent}%</TableCell>
                                    <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                    <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                    <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            sx={{ 
                                                bgcolor: '#ffeaea', 
                                                color: '#dc3545',
                                                '&:hover': { bgcolor: '#ffeaea' }
                                            }}
                                        >
                                            Hết hạn
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Hiển thị từ 1 đến {saleOffs.length} trên tổng {saleOffs.length}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" disabled>&lt;</Button>
                        <Button variant="contained">1</Button>
                        <Button variant="outlined">&gt;</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
