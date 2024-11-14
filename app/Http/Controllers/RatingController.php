<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Order;
use Inertia\Inertia;

class RatingController extends Controller
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
    public function createRating(Request $request)
    {
        // Lấy thông tin từ request
        $rating = $request->ra_score;
        $comment = $request->ra_comment;
        $productIds = $request->productIds;
        
        // Lấy customer_id của user hiện tại (giả sử đã có auth)
        $customerId = auth()->user()->id;
        
        // Tạo rating cho từng sản phẩm
        foreach ($productIds as $productId) {
            Rating::create([
                'ra_score' => $rating,
                'ra_comment' => $comment,
                'p_id' => $productId,
                'cus_id' => $customerId
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ra_score' => 'required',
            'ra_comment' => 'nullable',
            'p_id' => 'required|exists:products,id',
            'cus_id' => 'required|exists:customers,id',
        ]);

        Rating::create([
            'ra_score' => $request->ra_score,
            'ra_comment' => $request->ra_comment,
            'p_id' => $request->p_id,
            'cus_id' => $request->cus_id,
        ]);

        return redirect()->back()->with('success', 'Đánh giá đã được gửi thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rating $rating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating)
    {
        $request->validate([
            'ra_reply' => 'nullable',
            'ra_cus_reply' => 'nullable',
        ]);

        $rating->update([
            'ra_reply' => $request->ra_reply,
            'ra_cus_reply' => $request->ra_cus_reply,
        ]);

        return redirect()->back()->with('success', 'Phản hồi đã được cập nhật!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating)
    {
        $rating->delete();
        return redirect()->back()->with('success', 'Đánh giá đã được xóa!');
    }
}
