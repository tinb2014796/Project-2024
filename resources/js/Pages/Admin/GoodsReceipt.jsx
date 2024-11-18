import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField, Divider, 
    Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { usePage, router } from '@inertiajs/react';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import DetailGoodsReceipt from './ChildAdmin/DetailGoodsReceipt';
import CreateGoodsReceipt from './ChildAdmin/CreateGoodsReceipt';

const GoodsReceipt = () => {
    const { goodsReceipts, products, brands } = usePage().props;
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingReceipt, setEditingReceipt] = useState(null);
    const [formData, setFormData] = useState({
        import_date: '',
        brand_id: '',
        products: [{
            product_id: '',
            quantity: 0,
            price: 0
        }]
    });
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [filterType, setFilterType] = useState('week'); // week, month, year
    const [filterDate, setFilterDate] = useState('');
    const [filteredReceipts, setFilteredReceipts] = useState(goodsReceipts);

    const handleFilter = () => {
        let filtered = [...goodsReceipts];
        
        if (filterDate) {
            switch(filterType) {
                case 'week':
                    const [yearWeek, weekNum] = filterDate.split('-W');
                    const weekStart = new Date(yearWeek, 0, 1 + (weekNum - 1) * 7);
                    
                    const day = weekStart.getDay();
                    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
                    weekStart.setDate(diff);
                    
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    
                    weekStart.setHours(0, 0, 0, 0);
                    weekEnd.setHours(23, 59, 59, 999);
                    
                    filtered = filtered.filter(receipt => {
                        const receiptDate = new Date(receipt.import_date);
                        return receiptDate >= weekStart && receiptDate <= weekEnd;
                    });
                    break;
                    
                case 'month':
                    const [yearMonth, monthNum] = filterDate.split('-');
                    filtered = filtered.filter(receipt => {
                        const receiptDate = new Date(receipt.import_date);
                        return receiptDate.getFullYear() === parseInt(yearMonth) && 
                               receiptDate.getMonth() + 1 === parseInt(monthNum);
                    });
                    break;
                    
                case 'year':
                    filtered = filtered.filter(receipt => {
                        const receiptDate = new Date(receipt.import_date);
                        return receiptDate.getFullYear() === parseInt(filterDate);
                    });
                    break;
            }
        }
        
        setFilteredReceipts(filtered);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            import_date: '',
            brand_id: '',
            products: [{
                product_id: '',
                quantity: 0,
                price: 0
            }]
        });
    };

    const handleOpenEditDialog = (receipt) => {
        setEditingReceipt(receipt);
        setFormData({
            import_date: receipt.import_date,
            brand_id: receipt.brand_id,
            products: receipt.goods_receipt_details.map(detail => ({
                product_id: detail.product_id,
                quantity: detail.quantity_import,
                price: detail.price
            }))
        });
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditingReceipt(null);
        setFormData({
            import_date: '',
            brand_id: '',
            products: [{
                product_id: '',
                quantity: 0,
                price: 0
            }]
        });
    };

    const handleSubmit = () => {
        const submitData = {
            import_date: formData.import_date,
            brand_id: formData.brand_id,
            products: formData.products.map(product => ({
                product_id: product.product_id,
                p_quantity: product.quantity,
                p_purchase: product.price
            }))
        };
        router.post('/admin/goods-receipt/create', submitData);
        alert('Tạo phiếu nhập hàng thành công');
        handleCloseDialog();
    };

    const handleUpdate = () => {
        const updateData = {
            import_date: formData.import_date,
            brand_id: formData.brand_id,
            products: formData.products.map(product => ({
                product_id: product.product_id,
                p_quantity: product.quantity,
                p_purchase: product.price
            }))
        };
        router.put(`/admin/goods-receipt/update/${editingReceipt.id}`, updateData);
        alert('Cập nhật phiếu nhập hàng thành công');
        handleCloseEditDialog();
    };

    const handleAddProduct = () => {
        setFormData({
            ...formData,
            products: [...formData.products, {
                product_id: '',
                quantity: 0,
                price: 0
            }]
        });
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...formData.products];
        updatedProducts[index][field] = value;
        setFormData({
            ...formData,
            products: updatedProducts
        });
    };

    const handleOpenDetailDialog = (receipt) => {
        setSelectedReceipt(receipt);
        setOpenDetailDialog(true);
    };

    const handleCloseDetailDialog = () => {
        setOpenDetailDialog(false);
        setSelectedReceipt(null);
    };
    const handleRemoveProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, products: updatedProducts });
    };

    return (
        <Box sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4,
                backgroundColor: '#fff',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: '#2c3e50',
                    borderLeft: '4px solid #14B8B9',
                    pl: 2
                }}>
                    Quản lý phiếu nhập hàng
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <Select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            size="small"
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#fff'
                            }}
                        >
                            <MenuItem value="week">Tuần</MenuItem>
                            <MenuItem value="month">Tháng</MenuItem>
                            <MenuItem value="year">Năm</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        type={filterType === 'week' ? 'week' : filterType === 'month' ? 'month' : 'number'}
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        size="small"
                        InputProps={{
                            inputProps: filterType === 'year' ? { min: 2000, max: 2100 } : {}
                        }}
                        sx={{
                            width: filterType === 'year' ? 100 : 150,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                            }
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={handleFilter}
                        sx={{
                            bgcolor: '#14B8B9',
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: '#0e8e8f'
                            }
                        }}
                    >
                        Xác nhận
                    </Button>

                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        sx={{ 
                            bgcolor: '#14B8B9',
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: '0 4px 6px rgba(20, 184, 185, 0.2)',
                            '&:hover': {
                                bgcolor: '#0e8e8f',
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        Tạo phiếu nhập
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor: '#fff'
            }}>
                <Box sx={{ minWidth: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr>
                                <th style={{ 
                                    padding: '16px', 
                                    textAlign: 'left', 
                                    fontWeight: 600, 
                                    color: '#2c3e50',
                                    borderBottom: '2px solid #14B8B9'
                                }}>ID</th>
                                <th style={{ 
                                    padding: '16px', 
                                    textAlign: 'left', 
                                    fontWeight: 600, 
                                    color: '#2c3e50',
                                    borderBottom: '2px solid #14B8B9'
                                }}>Ngày nhập</th>
                                <th style={{ 
                                    padding: '16px', 
                                    textAlign: 'left', 
                                    fontWeight: 600, 
                                    color: '#2c3e50',
                                    borderBottom: '2px solid #14B8B9'
                                }}>Nhà cung cấp</th>
                                <th style={{ 
                                    padding: '16px', 
                                    textAlign: 'left', 
                                    fontWeight: 600, 
                                    color: '#2c3e50',
                                    borderBottom: '2px solid #14B8B9'
                                }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReceipts?.map((receipt) => (
                                <tr key={receipt.id} style={{ 
                                    backgroundColor: '#fff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#f8f9fa',
                                        transform: 'translateY(-2px)'
                                    }
                                }}>
                                    <td style={{ padding: '20px', borderRadius: '8px 0 0 8px' }}>{receipt.id}</td>
                                    <td style={{ padding: '20px' }}>{receipt.import_date}</td>
                                    <td style={{ padding: '20px' }}>
                                        {receipt.brand ? receipt.brand.b_name : 'Không có thông tin'}
                                    </td>
                                    <td style={{ padding: '20px', borderRadius: '0 8px 8px 0' }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Button 
                                                variant="outlined"
                                                size="medium"
                                                onClick={() => handleOpenDetailDialog(receipt)}
                                                sx={{
                                                    color: '#14B8B9',
                                                    borderColor: '#14B8B9',
                                                    borderRadius: 2,
                                                    px: 3,
                                                    '&:hover': {
                                                        borderColor: '#0e8e8f',
                                                        backgroundColor: 'rgba(20, 184, 185, 0.1)',
                                                        transform: 'translateY(-2px)',
                                                        transition: 'all 0.3s ease'
                                                    }
                                                }}
                                            >
                                                Chi tiết
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleOpenEditDialog(receipt)}
                                                sx={{
                                                    bgcolor: '#14B8B9',
                                                    borderRadius: 2,
                                                    px: 3,
                                                    boxShadow: '0 4px 6px rgba(20, 184, 185, 0.2)',
                                                    '&:hover': {
                                                        bgcolor: '#0e8e8f',
                                                        transform: 'translateY(-2px)',
                                                        transition: 'all 0.3s ease'
                                                    }
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Paper>

            <CreateGoodsReceipt 
                openDialog={openDialog} 
                handleCloseDialog={handleCloseDialog} 
                brands={brands} 
                products={products} 
                formData={formData} 
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                handleAddProduct={handleAddProduct}
                handleProductChange={handleProductChange}
                handleRemoveProduct={handleRemoveProduct}
            />

            <Dialog 
                open={openEditDialog} 
                onClose={handleCloseEditDialog} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    bgcolor: '#14B8B9', 
                    color: '#fff', 
                    fontWeight: 700,
                    py: 2.5
                }}>
                    Chỉnh sửa phiếu nhập hàng #{editingReceipt?.id}
                </DialogTitle>
                <DialogContent sx={{ mt: 3 }}>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ngày nhập"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.import_date}
                                    onChange={(e) => setFormData({...formData, import_date: e.target.value})}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': { 
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#14B8B9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#14B8B9',
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Nhà cung cấp</InputLabel>
                                    <Select
                                        value={formData.brand_id}
                                        label="Nhà cung cấp"
                                        onChange={(e) => setFormData({...formData, brand_id: e.target.value})}
                                        sx={{ 
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#14B8B9',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#14B8B9',
                                            }
                                        }}
                                    >
                                        {brands?.map((brand) => (
                                            <MenuItem key={brand.id} value={brand.id}>{brand.b_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {formData.products.map((product, index) => (
                                <Grid container spacing={3} key={index} sx={{ mt: 1, ml: 0, position: 'relative' }}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Sản phẩm</InputLabel>
                                            <Select
                                                value={product.product_id}
                                                label="Sản phẩm"
                                                onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                                                sx={{ 
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#14B8B9',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#14B8B9',
                                                    }
                                                }}
                                            >
                                                {products?.map((p) => (
                                                    <MenuItem key={p.id} value={p.id}>{p.p_name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Số lượng"
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#14B8B9',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#14B8B9',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Giá nhập"
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                                            sx={{ 
                                                '& .MuiOutlinedInput-root': { 
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#14B8B9',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#14B8B9',
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    {formData.products.length > 1 && (
                                        <IconButton
                                            onClick={() => handleRemoveProduct(index)}
                                            sx={{
                                                position: 'absolute',
                                                right: -30,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#ff4444',
                                                '&:hover': {
                                                    bgcolor: 'rgba(255, 68, 68, 0.1)',
                                                    transform: 'translateY(-50%) scale(1.1)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                            ))}
                            
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button 
                                    onClick={handleAddProduct} 
                                    variant="outlined" 
                                    startIcon={<AddIcon />}
                                    sx={{
                                        color: '#14B8B9',
                                        borderColor: '#14B8B9',
                                        borderRadius: 2,
                                        px: 3,
                                        py: 1,
                                        '&:hover': {
                                            borderColor: '#0e8e8f',
                                            backgroundColor: 'rgba(20, 184, 185, 0.1)',
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    Thêm sản phẩm
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button 
                        onClick={handleCloseEditDialog}
                        sx={{
                            color: '#666',
                            px: 3,
                            py: 1,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleUpdate} 
                        variant="contained" 
                        sx={{ 
                            bgcolor: '#14B8B9',
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            boxShadow: '0 4px 6px rgba(20, 184, 185, 0.2)',
                            '&:hover': {
                                bgcolor: '#0e8e8f',
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>

            <DetailGoodsReceipt 
                openDetailDialog={openDetailDialog} 
                handleCloseDetailDialog={handleCloseDetailDialog} 
                selectedReceipt={selectedReceipt} 
            />
        </Box>
    );
}

export default GoodsReceipt;
