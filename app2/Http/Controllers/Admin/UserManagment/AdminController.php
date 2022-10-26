<?php


namespace App\Http\Controllers\Admin\UserManagment;

use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Models\Admin;
use Spatie\Permission\Models\Role;
use App\Http\Resources\Admin\AdminResouces;
use Lang;
use Carbon\Carbon;
class AdminController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request)
    {
        $lang=$request->cookie('current_language');

            $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
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

            $query = Admin::with(['user' => function ($q) {
                $q->orderBy('full_name', 'asc');} , 'creator']);
      
            if (!empty($request->get('full_name'))) {

                $search_name = $request->get('full_name');
                $query= $query->Where(function ($query) use ($search_name) {
                    $query
                        ->where('full_name', 'LIKE', $search_name . '%')
                        ->orwhere('full_name', 'LIKE', $search_name . '%');
                });
            }


            $admins = $query->get();;
            $data=[
                'data' => AdminResouces::collection($admins),
                'total' => count($admins),
            ];
            return Response::respondSuccess($data);

          //  return Response::respondSuccess($Admins);
     
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
                    'full_name' => 'required',
                    'user_name' => 'required',
                    'password' => 'required',
                    'email' => 'email|unique:users,email',
                ],
                [
                    'required'  => 'The :attribute field is required.',
                   'unique'    =>':attribute is already used',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
        

            try {
                DB::beginTransaction();
                $input = $request->all();           
                $input['password'] = \Hash::make($request->password);
                $input['created_at'] = Carbon::now();
               // $data['is_active'] = 1;
               $input['created_by'] = Auth::guard('api')->user()->id;
                unset($input['passwordConfirmation']);
                $user = User::create($input);
                $data['user_id'] = $user->id;
                $data['created_by'] = Auth::guard('api')->user()->id;
                $data['created_at'] = Carbon::now();
                $admin = Admin::create($data);
                DB::commit();
            
                $res = $admin;
                if(!is_null($user)){
                    $res->setAttribute('full_name', $user->full_name);
                    $res->setAttribute('user_name',$user->user_name);
                    $res->setAttribute('email',$user->email);
                    $res->setAttribute('is_active', 1);
                  }
                  unset($input['created_by']);
                  $res->setAttribute('created_by', Auth::guard('api')->user()->full_name);
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($res);

            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $lang=$request->cookie('current_language');
   
            try {
               $Admin = User::select(
                    'id',
                    'email',
                    'users.*',
                    'mobile',
                    'name',
                )
                ->whereHas('Admin', function ($q) use ($id) {
                    //  $q->where('user_id', $customer_id);
                      $q->where('id', $id);
                  })
                    ->with('Admin:id,user_id','roles:id,name')->first();
               // $Admin = Admin::with('user')->find($id);
                if($Admin!=  null){
                    return Response::respondSuccess($Admin);
                }
                else{
                    $message = __('site.object_not_found',['name'=>__('site.Admin',[],$lang)],$lang);
                    return Response::respondError($message);
                    
                }
            } catch (Exception $e) {
                return Response::respondError($e);
            }

        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $lang=$request->cookie('current_language');
       
            try {
                $Admin = Admin::with('role')->find($id);
                return Response::respondSuccess($Admin);
                
            } catch (Exception $e) {
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
      
           
            $admin = Admin::find($id);
            if($admin != null){
                $validate = validator($request->all(), [
                    'full_name' => 'required',
                    'user_name' => 'required',
                    'email' => 'email|unique:users,email,'. $admin->user_id,
                   // 'password' => 'required',
                
                ],
                [
                    'required'  => 'The :attribute field is required.',
                    'unique'    =>':attribute is already used',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
            }
        
        

            try {
                if($admin!=  null){
                    DB::beginTransaction();
                    $input = $request->all();
                    $data['updated_at'] = Carbon::now();
                    if (isset($input['password'])  && !empty($input['password'])) {
                        if((!isset($input['passwordConfirmation']) || empty($input['passwordConfirmation']))){
                          
                               return Response::respondErrorValidation('password not match');
                        }
                        $input['password'] = \Hash::make($input['password']);
                  
                       
                    }
                    else{
                        unset($input['password']);
                    }
                    

                    $admin->update($data);
                    $admin->user->update($input);
                    DB::commit();
             
                   // $user=  User::find($admin->user_id);
                    $creator=User::find($admin->created_by);
                    if(!is_null($admin->user)){
                        $admin->setAttribute('user_name', $admin->user->user_name);
                        $admin->setAttribute('full_name',$admin->user->full_name);
                        $admin->setAttribute('email', $admin->user->email);
                        $admin->setAttribute('is_active', $admin->user->is_active);
                      }
                      if(!is_null($creator)){
                          $admin->setAttribute('created_by', $creator->full_name);
                      }
                      unset($admin->user_id);
                      unset($admin->is_deleted);
                      unset($admin->updated_by);
                      unset($admin->deleted_at);
                      unset($admin->user);

                   
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($admin);
                }
                else{
                    $message = __('site.object_not_found',['name'=>__('site.Admin',[],$lang)],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function activateDeactive(Request $request)
    {
        $lang=$request->cookie('current_language');
    
            try{
                $admin = Admin::find($request->id);
               
               
                if(!is_null($admin)){
                    DB::beginTransaction();
                //   $user = User::find($admin->user_id);
                  
                    $data['updated_at'] = Carbon::now();
                    $input['is_active'] =!$admin->user->is_active;
                    $admin->update($data);
                    $admin->user->update($input);
                    DB::commit();


                    $creator=User::find($admin->created_by);
                    if(!is_null($admin->user)){
                        $admin->setAttribute('user_name', $admin->user->user_name);
                        $admin->setAttribute('full_name',$admin->user->full_name);
                        $admin->setAttribute('email', $admin->user->email);
                        $admin->setAttribute('is_active', $admin->user->is_active);
                      }
                      if(!is_null($creator)){
                          $admin->setAttribute('created_by', $creator->full_name);
                      }
                      unset($admin->user_id);
                      unset($admin->is_deleted);
                      unset($admin->updated_by);
                      unset($admin->deleted_at);
                      unset($admin->user);

                   
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($admin);

                    return Response::respondSuccess($user);
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

    public function destroy($id)
    {
        $lang=$request->cookie('current_language');

      //  $lang=$request->lang;
        try {
        
                $admin = Admin::find($id);
                if($admin!= null){
                   $user = User::find($admin->user_id);
                    $admin->delete();
                    $admin->delete();
                    $message = Lang::get('site.success_deleted',[],$lang);
                    return Response::respondSuccess($message);
                }
                else{
                    $message = __('site.object_not_found',['name'=>__('site.Admin',[],$lang)],$lang);
                    return Response::respondError($message);
                   
                }
            
               
                
        }
        catch (Exception $e) {
            
                return Response::respondError($e);
        }
  
    
       
    }
}