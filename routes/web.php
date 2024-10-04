<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;


Route::get('/', [HomeController::class, 'index']);
Route::get('/products', [PageController::class, 'products']);
Route::get('/orders', [PageController::class, 'orders']);
Route::get('/customers', [PageController::class, 'customers']);
Route::get('/cart', [PageController::class, 'cart']);
Route::get('/repay', [PageController::class, 'repay']);
Route::get('/report', [PageController::class, 'report']);
Route::get('/pay', [PageController::class, 'pay']);
Route::get('/detail-product', [PageController::class, 'detailProduct']);
Route::get('/user', [PageController::class, 'user']);

Route::post('/products/create', [ProductsController::class, 'createProduct']);
Route::post('/products/edit/{id}', [ProductsController::class, 'editProduct']);
Route::delete('/products/delete/{id}', [ProductsController::class, 'deleteProduct']);

