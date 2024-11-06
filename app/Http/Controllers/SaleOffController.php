<?php

namespace App\Http\Controllers;

use App\Models\SaleOff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;

class SaleOffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $saleOffs = SaleOff::with('products')->get();
        $products = Products::all();
        return Inertia::render('Admin/SaleOff', compact('saleOffs', 'products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createSaleOff(Request $request)
    {
        foreach($request->p_id as $product_id){
            $saleOff = SaleOff::create([
                's_name' => $request->s_name,
                's_start' => $request->s_start,
                's_end' => $request->s_end,
                's_value_min' => $request->s_value_min,
                's_value_max' => $request->s_value_max,
                's_percent' => $request->s_percent,
                'p_id' => $product_id
            ]);
        }
        return redirect()->route('admin.sale-off.index')->with('success', 'Tạo khuyến mãi thành công');
    }

    public function create()
    {

        $products = Products::all();
        return Inertia::render('Admin/CreateSaleOff', compact('products'));
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
    public function show(SaleOff $saleOff)
    {
        return Inertia::render('Admin/ShowSaleOff', [
            'saleOff' => $saleOff->load('products')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SaleOff $saleOff)
    {
        $products = Products::all();
        return Inertia::render('Admin/EditSaleOff', [
            'saleOff' => $saleOff->load('products'),
            'products' => $products
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SaleOff $saleOff)
    {
        $request->validate([
            's_name' => 'required|string|max:255',
            's_start' => 'required|date',
            's_end' => 'required|date|after:s_start',
            's_value_min' => 'required|numeric|min:0',
            's_value_max' => 'required|numeric|min:0|gt:s_value_min',
            's_percent' => 'required|numeric|between:0,100',
            'p_id' => 'required|array'
        ]);

        $saleOff->update($request->all());
        $saleOff->products()->sync($request->p_id);

        return redirect()->route('admin.sale-off.index')->with('success', 'Cập nhật khuyến mãi thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SaleOff $saleOff)
    {
        $saleOff->products()->detach();
        $saleOff->delete();
        return redirect()->route('admin.sale-off.index')->with('success', 'Xóa khuyến mãi thành công');
    }
}
