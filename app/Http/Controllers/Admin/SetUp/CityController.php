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
use App\Http\Resources\Admin\CityResources;
use App\Models\City;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

use Lang;
class CityController extends Controller
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
           
     
            $cities = City::with('creator','donors','country')->get();
            $data=[
                'data' => CityResources::collection($cities),
                'total' => count($cities),
            ];
            return Response::respondSuccess($data);

           
    
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
                    'country_id' => 'required',
                ],
                [
          
                    'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorcity($validate->errors()->first());
            }

            try {
                DB::beginTransaction();
                $input = $request->all();           
                $input['created_at'] = Carbon::now();
                $input['created_by'] = Auth::guard('api')->user()->id;
             
                $city = City::create($input);
                DB::commit();
                $city = City::with('country')->find($city->id);
             
                  $city->setAttribute('created_by', Auth::guard('api')->user()->full_name);
                  $city->setAttribute('is_active', 1);
               //$driver=Driver::where('id',$driver->id)->with('user:id,name,mobile,email','creator:id,name')->first();
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($city);
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

            $city = City::find($id);
            if(!is_null($city)){
                    $validate = validator($request->all(), [
                        'name' => 'required',
                        'ar_name' => 'required',
                        'country_id' => 'required'
                    ],
                    [
                        'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
                    ]
                );

                if ($validate->fails()) {
                    return Response::respondErrorcity($validate->errors()->first());
                }
            }
            else{
                $message = __('site.object_not_found',['name'=>__('site.driver',[],$lang)],$lang);
                return Response::respondError($message);
            }
            try {
              //  
                if(!is_null($city)){
                    DB::beginTransaction();
                 //   $input = $request->all();
                    $data['name'] = $request->name;
                    $data['ar_name'] = $request->ar_name;
                    $data['country_id'] = $request->country_id;
                    $data['updated_at'] = Carbon::now();
                    $city->update($data);
                    DB::commit();
                    $city = City::with('country')->find($id);
                    $city->created_by= Auth::guard('api')->user()->full_name;
                    return Response::respondSuccess($city);
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

                $city = City::with(['donors'])->find($request->id);
                if($city->is_active==1 &&  count($city->donors)>0)
                {
                    $message = Lang::get('site.city_related_to_users',[],$lang);
                    return Response::respondError($message);
                    
                }
                if(!is_null($city)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$city->is_active;
                    $city->update($data);
                    DB::commit();
                    $city->created_by= Auth::guard('api')->user()->full_name;
                    return Response::respondSuccess($city);
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
