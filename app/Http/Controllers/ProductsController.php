<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsRequest;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createProduct(Request $request)
    {
        $products = new Products();
        $products->p_name = $request->p_name;
        $products->p_selling = $request->p_selling;
        $products->p_purchase = $request->p_purchase;
        $products->p_quantity = $request->p_quantity;
        $products->p_description = $request->p_description;
        $products->c_id = $request->c_id;
        $products->b_id = $request->b_id;
        $products->s_id = $request->s_id;

        //Lấy file ảnh từ request
        $file = $request->file('p_image');
        
        // Tạo tên file mới bằng cách kết hợp thời gian hiện tại và tên gốc của file
        $file_name = time().'_'.$file->getClientOriginalName(); 
        
        // Di chuyển file ảnh vào thư mục public/images
        $file->move(public_path('images'), $file_name);
        
        // Tạo URL đầy đủ cho ảnh
        $imageUrl = asset('images/'.$file_name);
        $products->p_image = $imageUrl;
        $products->save();
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editProduct(Request $request, $id)
    {
        $products = Products::find($id);
        
        // Kiểm tra và gán giá trị cho p_name
        if ($request->filled('p_name')) {
            $products->p_name = $request->p_name;
        } else {
            return redirect()->back()->with('error', 'Tên sản phẩm không được để trống');
        }
        
        // Các trường khác có thể được xử lý tương tự nếu cần
        $products->p_selling = $request->p_selling;
        $products->p_purchase = $request->p_purchase;
        $products->p_quantity = $request->p_quantity;
        $products->p_description = $request->p_description;
        $products->c_id = $request->c_id;
        $products->b_id = $request->b_id;
        $products->s_id = $request->s_id;

        // Xử lý và lưu hình ảnh mới nếu có
        if ($request->hasFile('p_image')) {
            $file = $request->file('p_image');
            $file_name = time().'_'.$file->getClientOriginalName();
            $file->move(public_path('images'), $file_name);
            $imageUrl = asset('images/'.$file_name);
            $products->p_image = $imageUrl;
        }
        
        $products->save();
        return redirect()->back()->with('success', 'Cập nhật sản phẩm thành công');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $products)
    {
        
    }

    /**
     * Delete the specified product.
     */
    public function deleteProduct($id)
    {
        $product = Products::findOrFail($id);
        $product->delete();
        return redirect()->back()->with('success', 'Sản phẩm đã được xóa thành công');
    }
}
