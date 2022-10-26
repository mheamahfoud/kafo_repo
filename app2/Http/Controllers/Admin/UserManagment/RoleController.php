<?php

namespace App\Http\Controllers\Admin\UserManagment;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Http\Responses\Response;
use Spatie\Permission\Models\Role;
use App\Http\Resources\RoleResources;
use lang;
class RoleController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (Auth::guard('api')->check()) {
            $language=auth('api')->user()->language;
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
            $roles = Role::select('name', 'created_at', 'id');
            if (!empty($request->get('name'))) {
                $term = $request->get('name');
                $roles->where('name', 'like', "%$term%");
            }
            $roles = $roles->orderBy($sort_by, $orderby)
                        ->paginate($rowsPerPage);
    

            $data=[
                'data' => RoleResources::collection($roles),
                'total' => $roles->total(),
            ];
            return Response::respondSuccess($data);
         //   return Response::respondSuccess($roles);
        }
        else{
            
             return Response::respondErrorAuthorize('unauthenticate');
        }
        //
    }


    public function roleList()
    {
        //
        if (Auth::guard('api')->check()) {
            $roles = Role::select('name', 'id')->get();
            return Response::respondSuccess($roles);
        }
        else{
            
             return Response::respondErrorAuthorize('unauthenticate');
        }
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
        if (Auth::guard('api')->check()) {
            $language=auth('api')->user()->language;
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

            try {

                
                    DB::beginTransaction();

                    $role_name = $request->input('name');

                    $permissions= $request->input('permissions');

                    $count = Role::where('name', $role_name)
                                ->count();

                    if ($count == 0) {
                        $role = Role::create([
                                    'name' => $role_name,
                                    'created_by'=>Auth::guard('api')->user()->id,
                                ]);
        
                        if (!empty($permissions)) {
                            $role->syncPermissions($permissions);
                        }

                        DB::commit();
                         $messages=__('site.success_added',[],$language);
                        return Response::respondSuccess($messages);

                    }
                    else{
                        $message = Lang::get('site.already_existed',['name'=>'role'],$language);
                        return  Response::respondError($message);
                    }
                       

            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
        }
        else
            return Response::respondErrorAuthorize('unauthenticate');
    
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
