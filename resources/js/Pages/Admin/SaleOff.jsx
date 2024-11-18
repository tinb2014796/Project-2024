import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton,
    TextField, Select, MenuItem, Container, Tabs, Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, usePage, router } from '@inertiajs/react';
import DetailSaleOff from '../../Components/DetailSaleOff';

export default function SaleOff() {
    const { saleOffs, customers } = usePage().props;
    const { success: successMessage } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedSaleOff, setSelectedSaleOff] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState('sale'); // 'sale' hoặc 'voucher'

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
            
            const matchesType = saleOff.s_type === tabValue;
        
            if (filterType === 'active') {
                return matchesSearch && !isExpired(saleOff.s_end) && matchesType;
            }
            
            return matchesSearch && matchesType;
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

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4, minHeight: '100vh' }}>
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography variant="h4" sx={{ 
                            color: '#1976d2',
                            fontWeight: 600,
                            letterSpacing: 0.5
                        }}>
                            Quản Lý Khuyến Mại & Voucher
                        </Typography>
                        <Link href="/admin/sale-off/create">
                            <Button 
                                variant="contained" 
                                startIcon={<AddIcon />}
                                sx={{ 
                                    bgcolor: '#1976d2',
                                    fontWeight: 500,
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: '#1565c0'
                                    }
                                }}
                            >
                                Tạo Mới
                            </Button>
                        </Link>
                    </Box>

                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab 
                            label="Khuyến Mại" 
                            value="sale"
                            sx={{ 
                                fontWeight: 600,
                                '&.Mui-selected': { color: '#1976d2' }
                            }}
                        />
                        <Tab 
                            label="Voucher" 
                            value="voucher"
                            sx={{ 
                                fontWeight: 600,
                                '&.Mui-selected': { color: '#1976d2' }
                            }}
                        />
                    </Tabs>

                    <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 4,
                        alignItems: 'center'
                    }}>
                        <Select
                            size="small"
                            value={filterType}
                            onChange={handleFilterChange}
                            sx={{ 
                                minWidth: 250,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#1976d2'
                                }
                            }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="active">Đang áp dụng</MenuItem>
                            <MenuItem value="expired">Đã hết hạn</MenuItem>
                        </Select>

                        <TextField
                            size="small"
                            placeholder={`Tìm kiếm ${tabValue === 'sale' ? 'khuyến mại' : 'voucher'}...`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fullWidth
                            sx={{ 
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2',
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: '#1976d2', mr: 1 }} />
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2,
                            color: '#1976d2',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Box component="span" sx={{
                                width: 4,
                                height: 24,
                                bgcolor: '#1976d2',
                                display: 'inline-block',
                                borderRadius: 1,
                                mr: 1
                            }}/>
                            {tabValue === 'sale' ? 'Khuyến Mại Đang Áp Dụng' : 'Voucher Đang Áp Dụng'}
                        </Typography>
                        
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>Tên Chương Trình</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Giảm Giá</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Giá Trị Tối Thiểu</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Ngày Bắt Đầu</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Ngày Kết Thúc</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Thao Tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activeSaleOffs.map((saleOff) => (
                                        <TableRow 
                                            key={saleOff.id} 
                                            hover
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    bgcolor: '#f5f5f5'
                                                }
                                            }}
                                            onClick={() => handleOpenModal(saleOff)}
                                        >
                                            <TableCell>
                                                <Box>
                                                    <Typography sx={{ 
                                                        color: '#1976d2',
                                                        fontWeight: 500,
                                                        mb: 0.5
                                                    }}>
                                                        {saleOff.s_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {tabValue === 'sale' ? 'Giảm giá theo phần trăm' : 'Mã voucher'}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{
                                                    color: '#2e7d32',
                                                    fontWeight: 600
                                                }}>
                                                    -{saleOff.s_percent}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                            <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                            <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="small" 
                                                    variant="contained"
                                                    sx={{ 
                                                        bgcolor: '#e8f5e9',
                                                        color: '#2e7d32',
                                                        '&:hover': { bgcolor: '#e8f5e9' }
                                                    }}
                                                >
                                                    Đang áp dụng
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(saleOff.id);
                                                    }}
                                                    sx={{ 
                                                        color: '#d32f2f',
                                                        '&:hover': {
                                                            bgcolor: '#ffebee'
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
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ 
                            mb: 2,
                            color: '#d32f2f',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Box component="span" sx={{
                                width: 4,
                                height: 24,
                                bgcolor: '#d32f2f',
                                display: 'inline-block',
                                borderRadius: 1,
                                mr: 1
                            }}/>
                            {tabValue === 'sale' ? 'Khuyến Mại Đã Hết Hạn' : 'Voucher Đã Hết Hạn'}
                        </Typography>
                        
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>Tên Chương Trình</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Giảm Giá</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Giá Trị Tối Thiểu</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Ngày Bắt Đầu</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Ngày Kết Thúc</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Thao Tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expiredSaleOffs.map((saleOff) => (
                                        <TableRow 
                                            key={saleOff.id} 
                                            hover
                                            sx={{
                                                opacity: 0.7,
                                                '&:hover': {
                                                    bgcolor: '#f5f5f5'
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                <Box>
                                                    <Typography sx={{ 
                                                        color: '#d32f2f',
                                                        fontWeight: 500,
                                                        mb: 0.5
                                                    }}>
                                                        {saleOff.s_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {tabValue === 'sale' ? 'Giảm giá theo phần trăm' : 'Mã voucher'}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{
                                                    color: '#d32f2f',
                                                    fontWeight: 600
                                                }}>
                                                    -{saleOff.s_percent}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{formatVND(saleOff.s_value_min)}</TableCell>
                                            <TableCell>{saleOff.s_start.split('T')[0]}</TableCell>
                                            <TableCell>{saleOff.s_end.split('T')[0]}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="small" 
                                                    variant="contained"
                                                    sx={{ 
                                                        bgcolor: '#ffebee',
                                                        color: '#d32f2f',
                                                        '&:hover': { bgcolor: '#ffebee' }
                                                    }}
                                                >
                                                    Hết hạn
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton 
                                                    onClick={() => handleDelete(saleOff.id)}
                                                    sx={{ 
                                                        color: '#d32f2f',
                                                        '&:hover': {
                                                            bgcolor: '#ffebee'
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
                    </Box>

                    <Box sx={{ 
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Hiển thị {activeSaleOffs.length + expiredSaleOffs.length} {tabValue === 'sale' ? 'khuyến mại' : 'voucher'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                                variant="outlined" 
                                disabled
                                sx={{
                                    borderColor: '#1976d2',
                                    color: '#1976d2',
                                    minWidth: 40,
                                    '&.Mui-disabled': {
                                        borderColor: '#bdbdbd'
                                    }
                                }}
                            >
                                &lt;
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{
                                    bgcolor: '#1976d2',
                                    minWidth: 40,
                                    '&:hover': {
                                        bgcolor: '#1565c0'
                                    }
                                }}
                            >
                                1
                            </Button>
                            <Button 
                                variant="outlined"
                                sx={{
                                    borderColor: '#1976d2',
                                    color: '#1976d2',
                                    minWidth: 40,
                                    '&:hover': {
                                        borderColor: '#1565c0',
                                        bgcolor: 'rgba(25, 118, 210, 0.04)'
                                    }
                                }}
                            >
                                &gt;
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <DetailSaleOff 
                open={isModalOpen} 
                handleClose={handleCloseModal} 
                saleOff={selectedSaleOff} 
            />
        </Container>
    );
}
