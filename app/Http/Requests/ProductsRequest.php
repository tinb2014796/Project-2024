<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Thay đổi thành true để cho phép yêu cầu
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'p_name' => 'required|string',
            'p_selling' => 'required|numeric|between:0,999999.99',
            'p_quantity' => 'required|integer',
            'p_image' => 'required|string',
            'p_description' => 'required|string',
            'p_purchase' => 'required|numeric|between:0,999999.99',
            // 'c_id' => 'required|exists:categories,id',
            // 'b_id' => 'required|exists:brands,id',
            // 's_id' => 'required|exists:sale_offs,id',
        ];
    }

    public function messages(): array
    {
        return [
            'p_name.required' => 'Tên sản phẩm là bắt buộc.',
            // 'p_name.string' => 'Tên sản phẩm phải là chuỗi.',
            'p_selling.required' => 'Giá bán là bắt buộc.',
            'p_selling.numeric' => 'Giá bán phải là số.',
            'p_selling.between' => 'Giá bán phải nằm trong khoảng từ 0 đến 999999.99.',
            'p_quantity.required' => 'Số lượng là bắt buộc.',
            'p_quantity.integer' => 'Số lượng phải là số nguyên.',
            'p_image.required' => 'Hình ảnh sản phẩm là bắt buộc.',
            // 'p_image.string' => 'Hình ảnh sản phẩm phải là chuỗi.',
            'p_description.required' => 'Mô tả sản phẩm là bắt buộc.',
            // 'p_description.string' => 'Mô tả sản phẩm phải là chuỗi.',
            'p_purchase.required' => 'Giá mua vào là bắt buộc.',
            'p_purchase.numeric' => 'Giá mua vào phải là số.',
            'p_purchase.between' => 'Giá mua vào phải nằm trong khoảng từ 0 đến 999999.99.',
            'c_id.required' => 'Danh mục sản phẩm là bắt buộc.',
            'c_id.exists' => 'Danh mục sản phẩm không tồn tại.',
            'b_id.required' => 'Thương hiệu là bắt buộc.',
            'b_id.exists' => 'Thương hiệu không tồn tại.',
            's_id.required' => 'Khuyến mãi là bắt buộc.',
            's_id.exists' => 'Khuyến mãi không tồn tại.',
        ];
    }
}
