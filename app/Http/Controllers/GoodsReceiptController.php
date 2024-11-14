<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GoodsReceipt;
use App\Models\Products;
use App\Models\Brand;
use App\Models\DetailGoodsReceipt;

class GoodsReceiptController extends Controller
{
    public function index()
    {
        $products = Products::all();
        $brands = Brand::all();
        $goodsReceipts = GoodsReceipt::with('goodsReceiptDetails.product', 'brand')->get();
        return Inertia::render('Admin/GoodsReceipt', [
            'goodsReceipts' => $goodsReceipts,
            'products' => $products,
            'brands' => $brands
        ]);
    }

    public function createGoodsReceipt(Request $request)
    {
        // Tạo goods receipt
        $goodsReceipt = GoodsReceipt::create([
            'brand_id' => $request->brand_id,
            'import_date' => $request->import_date,
        ]);

        // Lưu chi tiết sản phẩm
        foreach ($request->products as $product) {
            $goodsReceipt->goodsReceiptDetails()->create([
                'product_id' => $product['product_id'],
                'quantity_import' => $product['p_quantity'],
                'price' => $product['p_purchase'], 
                'quantity_back' => 0,
                'is_added' => true
            ]);

            // Cập nhật số lượng sản phẩm
            $productModel = Products::find($product['product_id']);
            $productModel->p_quantity += $product['p_quantity'];
            $productModel->p_purchase = $product['p_purchase'];
            $productModel->save();
        }
    }

    public function updateGoodsReceipt(Request $request, $id)
    {
        $goodsReceipt = GoodsReceipt::find($id);
        $goodsReceipt->update([
            'import_date' => $request->import_date,
            'brand_id' => $request->brand_id
        ]);

        // Lấy chi tiết phiếu nhập cũ
        $oldDetails = $goodsReceipt->goodsReceiptDetails;

        // Xóa các chi tiết phiếu nhập cũ
        $goodsReceipt->goodsReceiptDetails()->delete();

        // Thêm lại các chi tiết phiếu nhập mới và cập nhật số lượng sản phẩm
        foreach ($request->products as $product) {
            // Tìm chi tiết cũ của sản phẩm này
            $oldDetail = $oldDetails->where('product_id', $product['product_id'])->first();
            
            // Tạo chi tiết mới
            $goodsReceipt->goodsReceiptDetails()->create([
                'product_id' => $product['product_id'],
                'quantity_import' => $product['p_quantity'],
                'price' => $product['p_purchase'],
                'quantity_back' => 0
            ]);

            // Cập nhật số lượng và giá nhập sản phẩm
            $productModel = Products::find($product['product_id']);
            if ($oldDetail) {
                $quantityDiff = $product['p_quantity'] - $oldDetail->quantity_import;
                $productModel->p_quantity += $quantityDiff;
            }
            $productModel->p_purchase = $product['p_purchase'];
            $productModel->save();
        }
    }
}
