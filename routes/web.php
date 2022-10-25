<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::resource('media', 'MediaController');

Route::get('login', [App\Http\Controllers\HomeController::class, 'login'])->name('login');
//Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('app');



Route::get('export/{type}/{case_id}', [App\Http\Controllers\Admin\Reports\ExportReportController::class, 'index'])->name('export');



Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('app');


