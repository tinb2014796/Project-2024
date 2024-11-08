import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, Select, MenuItem, Grid } from '@mui/material';
import { router } from '@inertiajs/react';
import axios from 'axios';

const CustomerUpdate = ({ open, onClose, customer }) => {
    const [formData, setFormData] = useState({
        cus_familyname: customer.cus_familyname,
        cus_name: customer.cus_name,
        cus_sex: customer.cus_sex,
        cus_birthday: customer.cus_birthday,
        cus_sdt: customer.cus_sdt,
        cus_address: customer.cus_address,
        province_id: customer.province_id,
        district_id: customer.district_id,
        ward_code: customer.ward_code,
        cus_image: customer.cus_image
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố từ GHN
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                        'Content-Type': 'application/json'
                    }
                });
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        // Lấy danh sách quận/huyện khi tỉnh/thành phố thay đổi từ GHN
        const fetchDistricts = async () => {
            if (formData.province_id) {
                try {
                    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                        headers: {
                            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                            'Content-Type': 'application/json'
                        },
                        params: {
                            province_id: formData.province_id
                        }
                    });
                    setDistricts(response.data.data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
                }
            }
        };
        fetchDistricts();
    }, [formData.province_id]);

    useEffect(() => {
        // Lấy danh sách phường/xã khi quận/huyện thay đổi từ GHN
        const fetchWards = async () => {
            if (formData.district_id) {
                try {
                    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                        headers: {
                            'Token': 'c6967a25-9a90-11ef-8e53-0a00184fe694',
                            'Content-Type': 'application/json'
                        },
                        params: {
                            district_id: formData.district_id
                        }
                    });
                    setWards(response.data.data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách phường/xã:', error);
                }
            }
        };
        fetchWards();
    }, [formData.district_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        router.post(`/user/customer/update/${customer.id}`, formData, {
            onSuccess: () => {
                onClose();
                window.location.reload();
            },
            preserveState: true
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Cập nhật thông tin</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Họ"
                            name="cus_familyname"
                            value={formData.cus_familyname}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Tên"
                            name="cus_name"
                            value={formData.cus_name}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="cus_sex"
                                value={formData.cus_sex}
                                onChange={handleChange}
                            >
                                <MenuItem value="male">Nam</MenuItem>
                                <MenuItem value="female">Nữ</MenuItem>
                                <MenuItem value="other">Khác</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Ngày sinh"
                            name="cus_birthday"
                            value={formData.cus_birthday}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="cus_sdt"
                            value={formData.cus_sdt}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Địa chỉ cụ thể"
                            name="cus_address"
                            value={formData.cus_address}
                            onChange={handleChange}
                            margin="normal"
                            placeholder="Số nhà, tên đường..."
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="province_id"
                                value={formData.province_id}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Chọn Tỉnh/Thành phố</MenuItem>
                                {provinces.map((province) => (
                                    <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                        {province.ProvinceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="district_id"
                                value={formData.district_id}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Chọn Quận/Huyện</MenuItem>
                                {districts.map((district) => (
                                    <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                        {district.DistrictName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="ward_code"
                                value={formData.ward_code}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Chọn Phường/Xã</MenuItem>
                                {wards.map((ward) => (
                                    <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                        {ward.WardName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerUpdate;