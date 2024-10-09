<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
class CartController extends Controller
{
    public function addCart(Request $request)
    {
        $findCart = Cart::where('customer_id', $request->customer_id)->where('product_id', $request->product_id)->first();
        if($findCart){
            $findCart->quantity = $findCart->quantity + $request->quantity;
            $findCart->save();
        }else{
            $cart = new Cart();
            $cart->customer_id = $request->customer_id;
            $cart->product_id = $request->product_id;
            $cart->quantity = $request->quantity;
            $cart->discount = $request->discount;
            $cart->save();
        }
    }
    public function deleteCart($id)
    {
        $cart = Cart::find($id);
        $cart->delete();
    }

}
