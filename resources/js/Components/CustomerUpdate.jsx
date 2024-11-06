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
        // Lấy danh sách tỉnh/thành phố
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
                setProvinces(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        // Lấy danh sách quận/huyện khi tỉnh/thành phố thay đổi
        if (formData.province_id && provinces.length > 0) {
            const selectedProvince = provinces.find(p => p.Id === formData.province_id);
            if (selectedProvince) {
                setDistricts(selectedProvince.Districts);
            }
        }
    }, [formData.province_id, provinces]);

    useEffect(() => {
        // Lấy danh sách phường/xã khi quận/huyện thay đổi
        if (formData.district_id && districts.length > 0) {
            const selectedDistrict = districts.find(d => d.Id === formData.district_id);
            if (selectedDistrict) {
                setWards(selectedDistrict.Wards);
            }
        }
    }, [formData.district_id, districts]);

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
                                    <MenuItem key={province.Id} value={province.Id}>
                                        {province.Name}
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
                                    <MenuItem key={district.Id} value={district.Id}>
                                        {district.Name}
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
                                    <MenuItem key={ward.Id} value={ward.Id}>
                                        {ward.Name}
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