<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\SaleOffController;

// Route::get('/user', function (Request $request) {
//     return response()->json(['user' => 'success']);
// })->middleware('auth:sanctum');


Route::get('/', function (Request $request) {
    return response()->json(['message' => 'API hoạt động']);
});


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/products', [ProductsController::class, 'apiIndex']);
Route::get('/products/category/{id}', [ProductsController::class, 'apiCategoryProducts']);
Route::get('/product/{id}', [ProductsController::class, 'apiDetailProduct']);

Route::get('/categories', [CategoryController::class, 'apiCategories']);
Route::get('/category-products', [CategoryController::class, 'apiCategoryProducts']);

Route::get('/sale-offs', [SaleOffController::class, 'apiSaleOffs']);
Route::get('/orders', [OrdersController::class, 'apiOrders']);

Route::post('/create-order', [OrdersController::class, 'apiCreateOrder']);


