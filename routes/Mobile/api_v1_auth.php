<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('singup','Mobile\UserManagment\UserManagmentController@singup');
Route::post('signin','Mobile\UserManagment\UserManagmentController@signin');
Route::post('verifyCode','Mobile\UserManagment\UserManagmentController@verifyCode');
