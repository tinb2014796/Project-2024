import axios from 'axios';

export const getAddressDetails = async () => {
  try {
    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

export const getProvinces = async () => {
  try {
    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
    return [];
  }
};

export const getDistricts = async (provinceId) => {
  if (!provinceId) return [];
  
  try {
    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      headers: {
        'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
      },
      params: {
        province_id: provinceId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
    return [];
  }
};

export const getWards = async (districtId) => {
  if (!districtId) return [];

  try {
    const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
      headers: {
        'Token': '62124d79-4ffa-11ee-b1d4-92b443b7a897'
      },
      params: {
        district_id: districtId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phường/xã:', error);
    return [];
  }
};