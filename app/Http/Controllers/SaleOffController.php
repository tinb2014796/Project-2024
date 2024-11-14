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
        if ($request->p_id) {
            foreach($request->p_id as $product_id){
                $saleOff = SaleOff::create([
                    's_name' => $request->s_name,
                    's_start' => $request->s_start,
                    's_end' => $request->s_end,
                    's_type' => $request->s_type,
                    's_catalory' => $request->s_catalory,
                    's_code' => $request->s_code ?? null,
                    's_value_min' => $request->s_value_min ?? null,
                    's_value_max' => $request->s_value_max ?? null,
                    's_percent' => $request->s_percent ?? null,
                    's_quantity' => $request->s_quantity ?? null,
                    'p_id' => $product_id 
                ]);
            }
        } else {
            $saleOff = SaleOff::create([
                's_name' => $request->s_name,
                's_start' => $request->s_start,
                's_end' => $request->s_end,
                's_type' => $request->s_type,
                's_catalory' => $request->s_catalory,
                's_code' => $request->s_code ?? null,
                's_value_min' => $request->s_value_min ?? null,
                's_value_max' => $request->s_value_max ,
                's_percent' => $request->s_percent ,
                's_quantity' => $request->s_quantity ?? null,
                'p_id' => $request->p_id ?? null
            ]);
            
        }

        return redirect()->route('admin.sale-off.index')->with('success', 'Tạo khuyến mãi thành công');
    }

    public function create()
    {
        $products = Products::all();
        $saleOffs = SaleOff::with('products')->get()->map(function($saleOff) use ($products) {
            $product = $products->firstWhere('id', $saleOff->p_id);
            $saleOff->product_name = $product ? $product->p_name : 'Không xác định';
            return $saleOff;
        });
        return Inertia::render('Admin/CreateSaleOff', compact('products', 'saleOffs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function createVoucher(Request $request)
    // {
    //     $voucher = SaleOff::create([
    //         's_name' => $request->s_name,
    //         's_start' => $request->s_start,
    //         's_end' => $request->s_end,
    //         's_type' => $request->s_type,
    //         's_code' => $request->s_code,
    //         's_value_min' => $request->s_value_min,
    //         's_value_max' => $request->s_value_max,
    //         's_percent' => $request->s_percent,
    //     ]);
    //     return redirect()->route('admin.sale-off.index')->with('success', 'Tạo voucher thành công');
    // }

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

    public function deleteSaleOff($id)
    {
        $saleOff = SaleOff::findOrFail($id);
        // $saleOff->products()->detach();
        $saleOff->delete();
        return redirect()->back()->with('success', 'Sản phẩm đã được xóa thành công');
    }

    public function useVoucher(Request $request)
    {
        $customer = $request->session()->get('customer');
        
        // Kiểm tra điểm tích lũy của khách hàng
        // Tạo mã voucher ngẫu nhiên
        $voucherCode = 'VC' . uniqid();

        // Tạo voucher mới
        $saleOff = new SaleOff();
        $saleOff->s_name = $request->name;
        $saleOff->s_code = $voucherCode;
        $saleOff->s_type = 'voucher';
        $saleOff->s_percent = 0;
        $saleOff->s_value_min = $request->value_min;
        $saleOff->s_value_max = $request->value_max;
        $saleOff->s_description = $request->description;
        $saleOff->s_start = now();
        $saleOff->s_quantity = 1;
        $saleOff->s_end = now()->addDays(30);
        $saleOff->cus_id = $customer->id;
        $saleOff->save();

        // Trừ điểm tích lũy của khách hàng
        $customer->cus_points -= $request->points;
        $customer->save();

    }

}
