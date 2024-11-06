<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\Products;
use App\Models\ImageProduct;

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
    public function categoryProduct($id)
    {
        
        $products = Products::with('category', 'images')->when($id, function ($query, $id) {
            return $query->where('c_id', $id);
        })->get();
        $category = Category::find($id);
        return Inertia::render('User/CategoryProduct', ['products' => $products, 'category' => $category]);
    
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
    public function deleteCategory(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
}
