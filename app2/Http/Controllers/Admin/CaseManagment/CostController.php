<?php


namespace App\Http\Controllers\Admin\CaseManagment;

use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Models\Cost;
use Spatie\Permission\Models\Role;
use App\Models\CaseDonation;
use App\Http\Resources\Admin\CostResouces;
use Lang;
use Carbon\Carbon;
class CostController extends Controller
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

            $query = Cost::where('case_id',$request->case_id)->orderBy('name', 'asc');
      
            if (!empty($request->get('name'))) {

                $search_name = $request->get('name');
                $query= $query->Where(function ($query) use ($search_name) {
                    $query
                        ->where('name', 'LIKE', $search_name . '%')
                        ->orwhere('name', 'LIKE', $search_name . '%');
                });
            }
            $costs = $query->get();;
            $data=[
                'data' => CostResouces::collection($costs),
                'total' => count($costs),
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
                    'name' => 'required',
                    'value' => 'required',
                    'ar_name' => 'required'
                    
                ],
                [
                    'required'  => 'The :attribute field is required.',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }

        
            try {
                $case=CaseDonation::find($request->case_id);
                if($case->status =='completed' || $case->status =='closed' ){
                    $message = 'Case is Completed';
                    return Response::respondError($message);
                }
                DB::beginTransaction();
                $input = $request->all();           
                $input['created_at'] = Carbon::now();
                $cost = Cost::create($input);
                DB::commit();
                $cost->setAttribute('is_active',1 );
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($cost);
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
                    $message = __('site.object_not_found',['name'=>__('site.cost',[],$lang)],$lang);
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
  
           
            $cost = Cost::find($id);
            if($cost != null){
                $validate = validator($request->all(), [
                    'name' => 'required',
                    'value' => 'required',
                    'ar_name' => 'required'
                
                ],
                [
                    'required'  => 'The :attribute field is required.',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
            }
        
        

            try {
                $case=CaseDonation::find($cost->case_id);
                if($case->status =='completed' || $case->status =='closed' ){
                    $message = 'Case is Completed';
                    return Response::respondError($message);
                }
                if($cost!=  null){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['status'] =$request->status;
                    $data['name'] =$request->name;
                    $data['ar_name'] =$request->ar_name;
                    
                    $data['value'] =  $request->value;
                    $cost->update($data);
                    DB::commit();
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($cost);
                }
                else{
                    $message = __('site.object_not_found',['name'=>__('site.cost',[],$lang)],$lang);
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
                $cost = Cost::find($request->id);
                if(!is_null($cost)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$cost->is_active;
                    $cost->update($data);
                    DB::commit();
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($cost);
                }
                else{
                    $message = Lang::get('site.object_not_found',['name'=>__('site.cost',[],$lang)],$lang);
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
                    $message = __('site.object_not_found',['name'=>__('site.cost',[],$lang)],$lang);
                    return Response::respondError($message);
                   
                }
            
               
                
        }
        catch (Exception $e) {
            
                return Response::respondError($e);
        }

       
    }
}