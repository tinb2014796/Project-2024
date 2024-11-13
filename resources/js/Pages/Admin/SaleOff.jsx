import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton,
    TextField, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, usePage, router } from '@inertiajs/react';
import DetailSaleOff from '../../Components/DetailSaleOff';

export default function SaleOff() {
    const { saleOffs } = usePage().props;
    const { success: successMessage } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedSaleOff, setSelectedSaleOff] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
            router.delete(`/admin/sale-off/delete/${id}`);
            alert('Xóa khuyến mãi thành công');
            router.reload();
        }
        else {
            alert('Xóa khuyến mãi thất bại');
        }
    };

    const filterSaleOffs = (saleOffs) => {
        return saleOffs.filter(saleOff => {
            const matchesSearch = saleOff.s_name.toLowerCase().includes(searchTerm.toLowerCase()) 
            || saleOff.s_percent.toString().includes(searchTerm.toLowerCase())
            || saleOff.s_value_min.toString().includes(searchTerm.toLowerCase())
            || saleOff.s_start.includes(searchTerm.toLowerCase())
            || saleOff.s_end.includes(searchTerm.toLowerCase());
        
            if (filterType === 'active') {
                return matchesSearch && !isExpired(saleOff.s_end);
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

    const handleOpenModal = (saleOff) => {
        setSelectedSaleOff(saleOff);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSaleOff(null);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 3,
                bgcolor: 'white',
                p: 2,
                borderRadius: 2,
                boxShadow: '0 1px 2px 0 rgba(0,0,0,.13)'
            }}>
                <Typography variant="h5" sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                    Chương trình khuyến mại
                </Typography>
                <Link href="/admin/sale-off/create">
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        sx={{ 
                            bgcolor: '#00bcd4',
                            '&:hover': {
                                bgcolor: '#008c9e'
                            }
                        }}
                    >
                        Tạo khuyến mại
                    </Button>
                </Link>
            </Box>

            <Box sx={{ 
                bgcolor: 'white', 
                p: 3, 
                borderRadius: 2,
                boxShadow: '0 1px 2px 0 rgba(0,0,0,.13)'
            }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Tất cả khuyến mại
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Select
                        size="small"
                        value={filterType}
                        onChange={handleFilterChange}
                        sx={{ 
                            minWidth: 200,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#00bcd4'
                            }
                        }}
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
                        sx={{ 
                            flexGrow: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#00bcd4',
                                }
                            }
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: '#00bcd4', mr: 1 }} />
                        }}
                    />

                    <Button 
                        variant="outlined"
                        sx={{
                            borderColor: '#00bcd4',
                            color: '#00bcd4',
                            '&:hover': {
                                borderColor: '#008c9e',
                                bgcolor: 'rgba(0, 188, 212, 0.04)'
                            }
                        }}
                    >
                        Lưu bộ lọc
                    </Button>
                </Box>

                <Typography variant="h6" sx={{ mb: 2, mt: 3, color: '#00bcd4' }}>
                    Khuyến mại đang áp dụng
                </Typography>
                
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid rgba(0,0,0,.09)' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Chương trình khuyến mại</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Giá trị giảm</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Giá trị tối thiểu</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Bắt đầu</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Kết thúc</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeSaleOffs.map((saleOff) => (
                                <TableRow key={saleOff.id} hover onClick={() => handleOpenModal(saleOff)}>
                                    <TableCell>
                                        <Box>
                                            <Typography sx={{ color: '#00bcd4', fontWeight: 500 }}>
                                                {saleOff.s_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Giảm giá theo phần trăm
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#00bcd4', fontWeight: 500 }}>
                                        {saleOff.s_percent}%
                                    </TableCell>
                                    <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                    <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                    <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            sx={{ 
                                                bgcolor: '#e0f7fa', 
                                                color: '#00bcd4',
                                                '&:hover': { bgcolor: '#e0f7fa' }
                                            }}
                                        >
                                            Đang áp dụng
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            onClick={() => handleDelete(saleOff.id)}
                                            sx={{ 
                                                color: '#00bcd4',
                                                '&:hover': {
                                                    bgcolor: 'rgba(0, 188, 212, 0.04)'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ mb: 2, mt: 4, color: '#00bcd4' }}>
                    Khuyến mại đã hết hạn
                </Typography>
                
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid rgba(0,0,0,.09)' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Chương trình khuyến mại</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Giá trị giảm</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Giá trị tối thiểu</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Bắt đầu</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Kết thúc</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expiredSaleOffs.map((saleOff) => (
                                <TableRow key={saleOff.id} hover>
                                    <TableCell>
                                        <Box>
                                            <Typography sx={{ color: '#00bcd4', fontWeight: 500 }}>
                                                {saleOff.s_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Giảm giá theo phần trăm
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: '#00bcd4', fontWeight: 500 }}>
                                        {saleOff.s_percent}%
                                    </TableCell>
                                    <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                    <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                    <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            sx={{ 
                                                bgcolor: '#ffeaea', 
                                                color: '#00bcd4',
                                                '&:hover': { bgcolor: '#ffeaea' }
                                            }}
                                        >
                                            Hết hạn
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton 
                                            onClick={() => handleDelete(saleOff.id)}
                                            sx={{ 
                                                color: '#00bcd4',
                                                '&:hover': {
                                                    bgcolor: 'rgba(0, 188, 212, 0.04)'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        Hiển thị từ 1 đến {saleOffs.length} trên tổng {saleOffs.length}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            variant="outlined" 
                            disabled
                            sx={{
                                borderColor: '#00bcd4',
                                color: '#00bcd4',
                                '&.Mui-disabled': {
                                    borderColor: '#00000042'
                                }
                            }}
                        >
                            &lt;
                        </Button>
                        <Button 
                            variant="contained"
                            sx={{
                                bgcolor: '#00bcd4',
                                '&:hover': {
                                    bgcolor: '#008c9e'
                                }
                            }}
                        >
                            1
                        </Button>
                        <Button 
                            variant="outlined"
                            sx={{
                                borderColor: '#00bcd4',
                                color: '#00bcd4',
                                '&:hover': {
                                    borderColor: '#008c9e',
                                    bgcolor: 'rgba(0, 188, 212, 0.04)'
                                }
                            }}
                        >
                            &gt;
                        </Button>
                    </Box>
                </Box>
            </Box>
            <DetailSaleOff 
                open={isModalOpen} 
                handleClose={handleCloseModal} 
                saleOff={selectedSaleOff} 
            />
        </Box>
    );
}
