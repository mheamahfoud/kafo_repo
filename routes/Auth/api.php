<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login_user', 'Admin\Auth\AuthController@login_user');

