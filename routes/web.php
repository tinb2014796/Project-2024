<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Middleware\UserAuthMiddleware;
use App\Http\Controllers\CartController;


Route::get('/', [HomeController::class, 'index']);
Route::get('/products', [PageController::class, 'products']);
Route::get('/orders', [PageController::class, 'orders']);
Route::get('/customers', [PageController::class, 'customers']);
Route::get('/repay', [UserController::class, 'repay']);
Route::get('/report', [UserController::class, 'report']);
Route::get('/pay', [UserController::class, 'pay']);
Route::get('/detail-product/{id}', [PageController::class, 'detailProduct']);

Route::get('/user', [UserController::class, 'user']);

Route::post('/products/create', [ProductsController::class, 'createProduct']);
Route::post('/products/edit/{id}', [ProductsController::class, 'editProduct']);
Route::delete('/products/delete/{id}', [ProductsController::class, 'deleteProduct']);
Route::post('/add-product-image', [ProductsController::class, 'addProductImage']);


// Route::get('/signup', [CustomerController::class, 'createCustomer']);
Route::get('/user/home', [UserController::class, 'home'])->name('user.home');

Route::get('/signup', [UserController::class, 'signup']);
Route::post('/signup', [CustomerController::class, 'createCustomer']);

Route::get('/signin', [UserController::class, 'signin'])->name('user.signin');
Route::post('/signin', [CustomerController::class, 'signin']);

Route::middleware(UserAuthMiddleware::class)->prefix('user')->group(function () {
   
    Route::get('/detail-product/{id}', [UserController::class, 'detailProduct']);

    Route::post('/logout', [CustomerController::class, 'logout']);

    Route::get('/cart', [UserController::class, 'cart']); //lay gaio dien, truyen du lieu cho nay, truyen du lieu tu controller sang view
    Route::post('/cart', [CartController::class, 'addCart']); // tao giao dien, truyen du lieu tu giao dien sang controller
    Route::delete('/cart/product/{id}', [CartController::class, 'deleteCart']);

});
