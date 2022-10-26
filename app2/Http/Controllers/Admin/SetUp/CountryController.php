<?php

namespace App\Http\Controllers\Admin\SetUp;
use App\Models\User;
use App\Components\Core\Utilities\Helpers;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\CountryResources;
use App\Models\Country;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

use Lang;
class CountryController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
           $lang=$request->cookie('current_language');
        
           // $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
            $sort_by = $request->get('sort_by');
            $descending = $request->get('descending');
    
            if ($descending == 'false') {
                $orderby = 'asc';
            } elseif ($descending == 'true') {
                $orderby = 'desc';
            } elseif ($descending == '') {
                $orderby = 'desc';
                $sort_by = 'id';
            }
           
     
            $countries = Country::with(['creator','donors'])->get();
            $data=[
                'data' => CountryResources::collection($countries),
                'total' => count($countries),
            ];
            return Response::respondSuccess($data);

           
    
        //
    }

 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {      
        $lang=$request->cookie('current_language');
    
      
            $validate = validator($request->all(), [
                    'name' => 'required',
                    'ar_name' => 'required',
                ],
                [
                    'required'  => 'The :attribute field is required.',
                    
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorcountry($validate->errors()->first());
            }

            try {
                DB::beginTransaction();
                $input = $request->all();           
                $input['created_at'] = Carbon::now();
                $input['created_by'] = Auth::guard('api')->user()->id;
             
                $country = Country::create($input);
                DB::commit();

             
                  $country->setAttribute('created_by', Auth::guard('api')->user()->full_name);
                  $country->setAttribute('is_active', 1);
               //$driver=Driver::where('id',$driver->id)->with('user:id,name,mobile,email','creator:id,name')->first();
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($country);
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    
    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $lang=$request->cookie('current_language');
           
            $country = Country::find($id);
            if(!is_null($country)){
                    $validate = validator($request->all(), [
                        'name' => 'required',
                        'ar_name' => 'required',
                    ],
                    [
                        'required'  => 'The :attribute field is required.',
                    ]
                );

                if ($validate->fails()) {
                    return Response::respondErrorcountry($validate->errors()->first());
                }
            }
            else{
                $message = __('site.object_not_found',['name'=>__('site.driver',[],$lang)],$lang);
                return Response::respondError($message);
            }
            try {
                $country = Country::find($id);
                if(!is_null($country)){
                    DB::beginTransaction();
                 //   $input = $request->all();
                    $data['name'] = $request->name;
                    $data['ar_name'] = $request->ar_name;
                    $data['updated_at'] = Carbon::now();
                    $country->update($data);
                    $country->created_by= Auth::guard('api')->user()->full_name;
                    DB::commit();
                    return Response::respondSuccess($country);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }



    public function activateDeactive(Request $request)
    {
        $lang=$request->cookie('current_language');
       
           
            try{

                $country = Country::find($request->id);
                if($country->is_active==1 &&  count($country->donors)>0)
                {
                    $message = Lang::get('site.country_related_to_users',[],$lang);
                    return Response::respondError($message);
                    
                }

                if(!is_null($country)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$country->is_active;
                    $country->update($data);
                    DB::commit();
                    $country->created_by= Auth::guard('api')->user()->full_name;
                    return Response::respondSuccess($country);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
     
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }


}
