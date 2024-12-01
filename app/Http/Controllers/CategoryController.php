<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Products;
use App\Models\ImageProduct;
use App\Models\Brand;



class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function categories()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Category', ['categories' => $categories]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function createCategory(Request $request)
    {
        $file = $request->file('c_image');
        
        // Tạo tên file mới bằng cách kết hợp thời gian hiện tại và tên gốc của file
        $file_name = time().'_'.$file->getClientOriginalName(); 
        
        // Di chuyển file ảnh vào thư mục public/images
        $file->move(public_path('images'), $file_name);
        
        // Tạo URL đầy đủ cho ảnh
        $imageUrl = asset('images/'.$file_name);



        $categories = Category::create([
            'c_name' => $request->c_name,
            'c_image' => $imageUrl,
            
        ]);
    }
    public function categoryProduct($id, Request $request)
    {
        $query = Products::with('category', 'images')
            ->when($id, function ($query, $id) {
                return $query->where('c_id', $id);
            });

        if ($request->has('brand')) {
            $query->where('b_id', $request->brand);
        }

        $products = $query->get();
        $category = Category::find($id);
        
        // Lấy danh sách brand_id từ các sản phẩm trong category
        $brandIds = $products->pluck('b_id')->unique();
        
        // Lấy thông tin brands dựa trên brand_id
        $brands = Brand::whereIn('id', $brandIds)->get();
        
        return Inertia::render('User/CategoryProduct', [
            'products' => $products, 
            'category' => $category,
            'brands' => $brands
        ]);
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
    public function show(Category $category)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteCategory($id)
    {
        $category = Category::find($id);
        $category->delete();
        return redirect()->back();
    }
    //API
    public function apiCategories(Request $request)
    {

        $categories = Category::all();
        return response()->json($categories);
        
    }  
    public function apiCategoryProducts($id)
    {
        $products = Products::with('images','category','saleOff')
                    ->where('c_id', $id)
                    ->get();
        return response()->json($products);
    }

}
