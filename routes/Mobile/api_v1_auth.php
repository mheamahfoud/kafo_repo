<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('singup','Mobile\UserManagment\UserManagmentController@singup');
Route::post('signin','Mobile\UserManagment\UserManagmentController@signin');
Route::post('logout','Mobile\UserManagment\UserManagmentController@logout');