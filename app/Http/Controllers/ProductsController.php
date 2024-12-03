<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\ImageProduct;
use App\Models\Category;
use App\Models\SaleOff;


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
        $products = Products::create([
            'p_name' => $request->p_name,
            'p_selling' => $request->p_selling,
            'p_purchase' => $request->p_purchase,
            'p_quantity' => $request->p_quantity,
            'p_description' => $request->p_description,
            'c_id' => $request->c_id,
            'b_id' => $request->b_id,
        ]);

        
    
        //Lấy file ảnh từ request
        $file = $request->file('p_image');
        
        // Tạo tên file mới bằng cách kết hợp thời gian hiện tại và tên gốc của file
        $file_name = time().'_'.$file->getClientOriginalName(); 
        
        // Di chuyển file ảnh vào thư mục public/images
        $file->move(public_path('images'), $file_name);
        
        // Tạo URL đầy đủ cho ảnh
        $imageUrl = asset('images/'.$file_name);
        
        ImageProduct::create([
            'p_id' => $products->id,
            'ip_image' => $imageUrl,
        ]);
       
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function search(Request $request)
    {
        $search = $request->search;
        $products = Products::where('p_name', 'like', '%' . $search . '%')->get();
        
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

    public function addProductImage(Request $request)
    {
        $image = $request->file('image');
        $product_id = $request->product_id;

        $file_name = time().'_'.$image->getClientOriginalName();
        $image->move(public_path('images'), $file_name);
        $imageUrl = asset('images/'.$file_name);

        ImageProduct::create([
            'p_id' => $product_id,
            'ip_image' => $imageUrl,
        ]);

        return redirect()->back()->with('success', 'Thêm hình ảnh thành công');
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
    //API

    public function apiIndex(Request $request)
    {
        $products = Products::with('images','category','saleOff')->get();
        return response()->json([
            'products' => $products,
        ]);
    }

    public function apiCategoryProducts($id)
    {
        $products = Products::with('images','category','saleOff')->where('c_id', $id)->get();
        return response()->json($products);
    }
    public function apiDetailProduct($id)
    {
        $product = Products::with(['images', 'category', 'saleOff', 'rating' => function($query) {
            $query->with('customer')->latest()->take(5);
        }])->find($id);

        $averageRating = $product->rating()->avg('ra_score');
        
        $product = $product->toArray();
        $product['average_rating'] = round($averageRating, 1);

        return response()->json($product);
    }
}
