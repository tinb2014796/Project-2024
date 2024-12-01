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
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\DetailOrdersController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\SaleOffController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\GoodsReceiptController;


Route::get('/customers', [PageController::class, 'customers']);
Route::get('/user/search', [ProductsController::class, 'search']);

Route::get('/repay', [UserController::class, 'repay']);
Route::get('/report', [UserController::class, 'report']);

Route::get('/category-product/{id}', [CategoryController::class, 'categoryProduct']);
Route::get('/detail-product/{id}', [UserController::class, 'detailProduct']);
Route::get('/category-product/{id}', [CategoryController::class, 'categoryProduct']);
Route::get('/detail-product/{id}', [UserController::class, 'detailProduct']);
Route::get('/user', [UserController::class, 'user']);

Route::get('/user/home', [UserController::class, 'home'])->name('user.home');

Route::get('/signup', [UserController::class, 'signup']);
Route::post('/signup', [CustomerController::class, 'createCustomer']);

Route::get('/signin', [UserController::class, 'signin'])->name('user.signin');
Route::post('/signin', [CustomerController::class, 'signin']);

//admin signin
Route::get('/admin/signin', [UserController::class, 'adminSignin'])->name('admin.signin');
Route::post('/admin/signin', [UserController::class, 'adminLogin']);

//Admin 
Route::middleware(AdminMiddleware::class)->prefix('admin')->group(function () {

    Route::get('/categories', [CategoryController::class, 'categories']);
    Route::post('/categories/create', [CategoryController::class, 'createCategory']);
    Route::post('/categories/edit/{id}', [CategoryController::class, 'editCategory']);
    Route::delete('/categories/delete/{id}', [CategoryController::class, 'deleteCategory']);

    Route::get('/detail-product/{id}', [PageController::class, 'detailProduct']);

    Route::post('/products/create', [ProductsController::class, 'createProduct']);
    Route::post('/products/edit/{id}', [ProductsController::class, 'editProduct']);
    Route::delete('/products/delete/{id}', [ProductsController::class, 'deleteProduct']);
    Route::post('/add-product-image', [ProductsController::class, 'addProductImage']);

    Route::get('/home', [HomeController::class, 'index'])->name('admin.home');

    Route::get('/products', [PageController::class, 'products']);

    Route::get('/orders', [PageController::class, 'orders']);
    Route::post('/orders/{order_id}', [OrdersController::class, 'updateOrder']);
    Route::get('/orders/{order_id}', [OrdersController::class, 'confirmOrder']);
    Route::post('/orders/update-status/{order_id}', [OrdersController::class, 'updateStatus']);

    Route::get('/sale-off', [PageController::class, 'saleOff'])->name('admin.sale-off.index');
    Route::post('/sale-off/create', [SaleOffController::class, 'createSaleOff']);
    Route::get('/sale-off/create', [SaleOffController::class, 'create']);
    Route::delete('/sale-off/delete/{id}', [SaleOffController::class, 'deleteSaleOff']);
    // Route::post('/sale-off/create', [SaleOffController::class, 'createVoucher']);

    Route::get('/customers', [CustomerController::class, 'ListCustomers']);
    Route::get('/customers/{id}', [CustomerController::class, 'DetailCustomer']);
    Route::get('/customer-chart', [CustomerController::class, 'customerChart']);
    
    Route::get('/goods-receipt', [GoodsReceiptController::class, 'index']);
    Route::post('/goods-receipt/create', [GoodsReceiptController::class, 'createGoodsReceipt']);
    Route::put('/goods-receipt/update/{id}', [GoodsReceiptController::class, 'updateGoodsReceipt']);
    


});

//User
Route::middleware(UserAuthMiddleware::class)->prefix('user')->group(function () {

   


    Route::post('/logout', [CustomerController::class, 'logout']);

    Route::get('/cart', [UserController::class, 'cart'])->name('user.cart'); //lay gaio dien, truyen du lieu cho nay, truyen du lieu tu controller sang view
    Route::post('/cart', [CartController::class, 'addCart']); // tao giao dien, truyen du lieu tu giao dien sang controller
    Route::delete('/cart/product/{id}', [CartController::class, 'deleteCart']);
    Route::post('/cart/update', [CartController::class, 'updateCart']);

    Route::post('/pay', [UserController::class, 'pay']);
    Route::get('/pay', [UserController::class, 'pay']);
    Route::get('/return-vnpay', [OrdersController::class, 'returnVnpay']);

    Route::post('/create-order', [OrdersController::class, 'createOrder']);
    Route::get('/create-order', [OrdersController::class, 'createOrder']);


    Route::get('/update-payment', [OrdersController::class, 'updatePayment']);

    Route::get('/order-success', [OrdersController::class, 'orderSuccess']);
    Route::post('/order-success', [OrdersController::class, 'orderSuccess']);

    Route::get('/order-confirm', [OrdersController::class, 'orderConfirm']);
    Route::post('/order/{id}', [OrdersController::class, 'cancelOrder']);
    
    Route::get('/follow-order', [OrdersController::class, 'followOrder']);

    Route::post('/update-address', [CustomerController::class, 'updateAddress']);
    Route::put('/customer/{id}', [CustomerController::class, 'returnAddress']);

    Route::get('/customer', [CustomerController::class, 'information'])->name('user.customer');
    Route::get('/customer/update/{id}', [CustomerController::class, 'getCustomer']);
    Route::post('/customer/update/{id}', [CustomerController::class, 'updateCustomer']);
    Route::post('/customer/update/image/{id}', [CustomerController::class, 'updateImageCustomer']);


    Route::post('/check-voucher', [OrdersController::class, 'checkVoucher']);

    Route::post('/rating', [RatingController::class, 'createRating']);

    Route::get('/trade-point', [CustomerController::class, 'tradePoint']);
    Route::post('/trade-point', [SaleOffController::class, 'useVoucher']);
});

//http://localhost:8000/user/return-vnpay?vnp_Amount=280000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14620894&vnp_CardType=ATM&vnp_OrderInfo=Thanh+to%C3%A1n+h%C3%B3a+%C4%91%C6%A1n+ph%C3%AD+d%E1%BB%8Bch+v%E1%BB%A5&vnp_PayDate=20241018230639&vnp_ResponseCode=00&vnp_TmnCode=3DR25O0Z&vnp_TransactionNo=14620894&vnp_TransactionStatus=00&vnp_TxnRef=61&vnp_SecureHash=b37a2c8d3b7401c6577b601016bda39265765fcc38433943ba1c5faebe770ba565f86ea395db55de570cef1b4d569cbd7e65111e32dbb06ed7d656b3816a76dd
