<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//----------------------------------admin----------------------------------------

Route::apiResource('role','Admin\UserManagment\RoleController');
Route::get('role_list','Admin\UserManagment\RoleController@roleList');


//////////////////////////////Admin Section///////////////////////////////////////////



    //------------------------------------------Compinations  &&&&  Binging Range ----------------------------------------
    Route::get('getCompinations','Admin\Features\FeatureController@getCompinations');
    Route::post('editPriceCompinations','Admin\Features\FeatureController@editPriceCompinations');
    Route::get('getBindingRange','Admin\Features\FeatureController@getBindingRange');
    Route::get('editBindingRange','Admin\Features\FeatureController@editBindingRange');

    //

    //------------------------------------------orders ----------------------------------------
    Route::get('getOrders','Admin\Orders\OrderController@getOrders');
    Route::post('changeOrderStatus','Admin\Orders\OrderController@changeOrderStatus');
    Route::post('changeOrderDriver','Admin\Orders\OrderController@changeOrderDriver');
    Route::post('changeOrderPrice','Admin\Orders\OrderController@changeOrderPrice');

    //
    


//------------------------------drive------------------------
Route::apiResource('driver','Admin\UserManagment\DriverController');
Route::post('driver/{id}','Admin\UserManagment\DriverController@update');


////------------------------------employee------------------------
Route::apiResource('employee','Admin\UserManagment\EmployeeController');
Route::post('employee/{id}','Admin\UserManagment\EmployeeController@update');


////------------------------------cient------------------------

Route::post('client_register','Mobile\Client\Auth\AuthController@client_register');

Route::post('login_client','Mobile\Client\Auth\AuthController@login_client');

Route::post('logout_client','Mobile\Client\Auth\AuthController@logout_client');

//Route::apiResource('employee','Admin\UserManagment\EmployeeController');
//Route::post('employee/{id}','Admin\UserManagment\EmployeeController@update');



Route::post('register', 'Admin\Auth\AuthController@register');
Route::post('index_user', 'Admin\Auth\AuthController@index_user');




//////////////////////auth//////////////////////////////////////
Route::post('login_user', 'Admin\Auth\AuthController@login_user');
Route::post('logout_user', 'Admin\Auth\AuthController@logout_user');




/*Route::apiResource('country','Api\CountryController');

Route::post('add_user','Api\HomeController@add_user');*/

Route::post('changeLanguage','HomeController@changeLanguage');
/////////////////////commmon Controller//////////////////////////////////
//Route::apiResource('getStatuses','HomeController');
Route::post('changeLanguage','StatusController@changeLanguage');




/////////////////////////////////Admin////////////////////////////

//check Auth
Route::post('checkAuth','StatusController@checkAuth');





//----Start-------6------------------------------------SetUP------------------------


        //////////////////////////--------Validation Type-------------//////////////////////////////
        Route::post('get_valiation_type','Admin\SetUp\ValidationTypeController@index');
        Route::post('create_valiation_type','Admin\SetUp\ValidationTypeController@store');
        Route::post('update_validation_type/{id}','Admin\SetUp\ValidationTypeController@update');
        Route::post('activDeactive_valiation_type','Admin\SetUp\ValidationTypeController@activateDeactive');
        Route::post('get_valiation_type_select_list','Admin\SetUp\ValidationTypeController@validatioTypeSelectList');
        //////////////////////////--------Country-------------//////////////////////////////
        Route::post('get_country','Admin\SetUp\CountryController@index');
        Route::post('create_country','Admin\SetUp\CountryController@store');
        Route::post('update_country/{id}','Admin\SetUp\CountryController@update');
        Route::post('activDeactive_country','Admin\SetUp\CountryController@activateDeactive');

        //////////////////////////--------City-------------//////////////////////////////
        Route::post('get_city','Admin\SetUp\CityController@index');
        Route::post('create_city','Admin\SetUp\CityController@store');
        Route::post('update_city/{id}','Admin\SetUp\CityController@update');
        Route::post('activDeactive_city','Admin\SetUp\CityController@activateDeactive');

        //////////////////////////--------Provider-------------//////////////////////////////
        Route::post('get_provider','Admin\SetUp\ProviderController@index');
        Route::post('create_provider','Admin\SetUp\ProviderController@store');
        Route::post('update_provider/{id}','Admin\SetUp\ProviderController@update');
        Route::post('activDeactive_provider','Admin\SetUp\ProviderController@activateDeactive');
        Route::post('get_provider_select_list','Admin\SetUp\ProviderController@providerSelectList');
     

        //////////////////////////--------RELAtion-------------//////////////////////////////
        Route::post('get_relation','Admin\SetUp\RelationController@index');
        Route::post('create_relation','Admin\SetUp\RelationController@store');
        Route::post('update_relation/{id}','Admin\SetUp\RelationController@update');
        Route::post('activDeactive_relation','Admin\SetUp\RelationController@activateDeactive');
        Route::post('get_relation_select_list','Admin\SetUp\RelationController@relationSelectList');
        
//-----------------------En






//----Start-------6------------------------------------Users Manament------------------------


        //////////////////////////--------Validation Type-------------//////////////////////////////
        Route::post('get_admin','Admin\UserManagment\AdminController@index');
        Route::post('create_admin','Admin\UserManagment\AdminController@store');
        Route::post('update_admin/{id}','Admin\UserManagment\AdminController@update');
        Route::post('activDeactive_admin','Admin\UserManagment\AdminController@activateDeactive');
        //////////////////////////--------Country-------------//////////////////////////////
        // Route::post('get_country','Admin\SetUp\CountryController@index');
        // Route::post('create_country','Admin\SetUp\CountryController@store');
        // Route::post('update_country/{id}','Admin\SetUp\CountryController@update');
        // Route::post('activDeactive_country','Admin\SetUp\CountryController@activateDeactive');


        Route::post('get_donor','Admin\UserManagment\DonorController@index');
        Route::post('create_donor','Admin\UserManagment\DonorController@store');
        Route::post('update_donor/{id}','Admin\UserManagment\DonorController@update');
        Route::post('edit_donor','Admin\UserManagment\DonorController@edit');
        Route::post('activDeactive_donor','Admin\UserManagment\DonorController@activateDeactive');
        Route::post('donor_detail','Admin\UserManagment\DonorController@show');
//-----------------------End-----------------------------Users Managment------------------------





//----Start-------6------------------------------------Cases Manament------------------------


        //////////////////////////--------Validation Type-------------//////////////////////////////
        Route::post('get_case','Admin\CaseManagment\CaseController@index');
        Route::post('create_case','Admin\CaseManagment\CaseController@store');
        Route::post('edit_case','Admin\CaseManagment\CaseController@edit');
        Route::post('update_case/{id}','Admin\CaseManagment\CaseController@update');
        Route::post('show_case','Admin\CaseManagment\CaseController@show');
        Route::post('publish_case','Admin\CaseManagment\CaseController@publish');
        Route::post('cancel_case','Admin\CaseManagment\CaseController@cancel');
        Route::post('close_case','Admin\CaseManagment\CaseController@close');
        Route::post('delete_file_case','Admin\CaseManagment\CaseController@delete_mdeia');
        
        Route::post('activDeactive_case','Admin\CaseManagment\CaseController@activateDeactive');

        Route::post('get_donors_case','Admin\CaseManagment\CaseController@getDonors');

        Route::post('get_followers_case','Admin\CaseManagment\CaseController@getFollowers');

        Route::post('update_secret_info/{id}','Admin\CaseManagment\CaseController@updateSecretInfo');
        Route::post('create_update_case','Admin\CaseManagment\CaseController@storeUpdate');
        Route::post('activDeactive_case_case_update','Admin\CaseManagment\CaseController@activateDeactiveUpdate');
        
        Route::post('update_case_update/{id}','Admin\CaseManagment\CaseController@updateCaseUpdate');
        Route::post('get_updates_case','Admin\CaseManagment\CaseController@getUpdates');
        Route::post('report_case','Admin\CaseManagment\CaseController@getReportCase');

        


        Route::post('get_success_cases','Admin\CaseManagment\SuccessCaseController@index');
         Route::post('create_success_story','Admin\CaseManagment\SuccessCaseController@store');
         Route::post('edit_success_story','Admin\CaseManagment\SuccessCaseController@edit');
         Route::post('update_success_story/{id}','Admin\CaseManagment\SuccessCaseController@update');
         Route::post('show_success_story','Admin\CaseManagment\SuccessCaseController@show');
         Route::post('activeDeactive_success_story','Admin\CaseManagment\SuccessCaseController@activateDeactive');


        Route::post('get_costs','Admin\CaseManagment\CostController@index');
        Route::post('create_cost','Admin\CaseManagment\CostController@store');
        Route::post('update_cost/{id}','Admin\CaseManagment\CostController@update');
        Route::post('activDeactive_cost','Admin\CaseManagment\CostController@activateDeactive');

        
        Route::post('get_validations_by_case','Admin\CaseManagment\ValidationController@index');
        
        Route::post('edit_validation','Admin\CaseManagment\ValidationController@edit');
        Route::post('create_validation','Admin\CaseManagment\ValidationController@store');

        Route::post('delete_validation','Admin\CaseManagment\ValidationController@destroy');
        
        Route::post('update_validation/{id}','Admin\CaseManagment\ValidationController@update');
        //////////////////////////--------Country-------------//////////////////////////////
        // Route::post('get_country','Admin\SetUp\CountryController@index');
        // Route::post('create_country','Admin\SetUp\CountryController@store');
        // Route::post('update_country/{id}','Admin\SetUp\CountryController@update');
        // Route::post('activDeactive_country','Admin\SetUp\CountryController@activateDeactive');

        
        Route::post('get_donor_list','Admin\UserManagment\DonorController@getDonorsList');
        Route::post('get_donor','Admin\UserManagment\DonorController@index');
        Route::post('create_donor','Admin\UserManagment\DonorController@store');
        Route::post('update_donor/{id}','Admin\UserManagment\DonorController@update');
        Route::post('edit_donor','Admin\UserManagment\DonorController@edit');
        Route::post('activDeactive_donor','Admin\UserManagment\DonorController@activateDeactive');

        Route::post('get_requests','Admin\UserManagment\RequestController@index');

        Route::post('accetp_request','Admin\UserManagment\RequestController@acceptRequest');
        Route::post('reject_request','Admin\UserManagment\RequestController@rejectRequest');
        Route::post('charge_wallet','Admin\UserManagment\RequestController@chargeWallet');
        

        Route::post('setFcmToken','HomeController@setFcmToken');


        Route::post('send_specific_notification','Services\NotificationController@sendSpecificNotification');

        
        Route::post('send_push_notification','Services\NotificationController@sendPushNotification');



        
//-----------------------End-----------------------------Users Managment------------------------









Route::resource('media', 'Services\MediaController');

/////Images////////////////
/////Media////////////////
Route::post('uplode_image','Services\MediaController@store');

Route::post('delete','StatusController@delete');






//////////////////mOBILE 

