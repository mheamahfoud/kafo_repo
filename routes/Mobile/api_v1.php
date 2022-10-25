<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('cases_list','Mobile\CaseManagment\CaseController@index');

Route::get('cases_summery','Mobile\CaseManagment\CaseController@getSummery');

Route::get('case_view/{id}','Mobile\CaseManagment\CaseController@view');
Route::get('case_secret_info_view/{id}','Mobile\CaseManagment\CaseController@getSecretInfo');


Route::post('donate','Mobile\CaseManagment\CaseController@donate');

Route::post('follow_case','Mobile\CaseManagment\CaseController@followCase');
Route::post('Unfollow_case','Mobile\CaseManagment\CaseController@unFollowCase');


Route::get('success_story_list','Mobile\CaseManagment\SuccessStoryController@index');
Route::get('success_story_view/{id}','Mobile\CaseManagment\SuccessStoryController@view');


Route::get('wallet_view','Mobile\UserManagment\UserManagmentController@viewMyWallet');
Route::post('charge_wallet','Mobile\UserManagment\UserManagmentController@chargeWallet');


Route::get('profile_view','Mobile\UserManagment\UserManagmentController@viewMyProfile');



Route::post('update_profile','Mobile\UserManagment\UserManagmentController@updateMyProfile');

Route::get('edit_profile','Mobile\UserManagment\UserManagmentController@editMyProfile');




Route::get('city_list','Mobile\Setup\SetUpController@index_city');
Route::get('country_list','Mobile\Setup\SetUpController@index_country');



////additional api

Route::get('list_donors','Mobile\CaseManagment\CaseController@listDonors');


Route::get('list_transactions','Mobile\UserManagment\UserManagmentController@listTransactions');

Route::post('delete_account','Mobile\UserManagment\UserManagmentController@deleteAccount');

Route::post('setFcmToken','Mobile\UserManagment\UserManagmentController@setFcmToken');


///Notifactions
Route::get('notifications_count','Mobile\Notifations\NotificationController@getNotificationsCount');
Route::get('notifications_list','Mobile\Notifations\NotificationController@getNotificationsContent');
Route::post('read_notifcations','Mobile\Notifations\NotificationController@readNotifications');
