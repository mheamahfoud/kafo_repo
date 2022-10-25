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
use App\Http\Resources\Admin\ValidationTypeResources;
use App\Models\ValidationType;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

use Lang;
class ValidationTypeController extends Controller
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
           
     
            $validation_types = ValidationType::with('creator')->get();
            $data=[
                'data' => ValidationTypeResources::collection($validation_types),
                'total' => count($validation_types),
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
                return Response::respondErrorValidation($validate->errors()->first());
            }

            try {
                DB::beginTransaction();
                $input = $request->all();           
                $input['created_at'] = Carbon::now();
                $input['created_by'] = Auth::guard('api')->user()->id;
             
                $validation = ValidationType::create($input);
                DB::commit();

             
                  $validation->setAttribute('created_by', Auth::guard('api')->user()->full_name);
                  $validation->setAttribute('is_active', 1);
               //$driver=Driver::where('id',$driver->id)->with('user:id,name,mobile,email','creator:id,name')->first();
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($validation);
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
 
            $validation = ValidationType::find($id);
            if(!is_null($validation)){
                    $validate = validator($request->all(), [
                        'name' => 'required',
                    
                    ],
                    [
                        'required'  => 'The :attribute field is required.',
                    ]
                );

                if ($validate->fails()) {
                    return Response::respondErrorValidation($validate->errors()->first());
                }
            }
            else{
                $message = __('site.object_not_found',['name'=>__('site.driver',[],$lang)],$lang);
                return Response::respondError($message);
            }
            try {
                $validation = ValidationType::find($id);
                if(!is_null($validation)){
                    DB::beginTransaction();
                 //   $input = $request->all();ar_name
                    $data['ar_name'] = $request->ar_name;
                    $data['name'] = $request->name;
                    $data['updated_at'] = Carbon::now();
                    $validation->update($data);
                    $validation->created_by= Auth::guard('api')->user()->full_name;
                    DB::commit();
                    return Response::respondSuccess($validation);
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
                $validation = ValidationType::with(['validations'])->find($request->id);
                if($validation->is_active==1 &&  count($validation->validations)>0)
                {
                    $message = Lang::get('site.validation_type_related_to_validation',[],$lang);
                    return Response::respondError($message);
                    
                }
                if(!is_null($validation)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$validation->is_active;
                    $validation->update($data);
                    DB::commit();
                    $validation->created_by= Auth::guard('api')->user()->full_name;
                    return Response::respondSuccess($validation);
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

    public function validatioTypeSelectList(Request $request)
    {
            return Response::respondSuccess(ValidationType::where('is_active',1)->select('id as value' ,'name as text')->get());
    }
}
