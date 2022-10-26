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
use App\Http\Resources\Admin\RelationResources;
use App\Models\Relation;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

use Lang;

class RelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang = $request->cookie('current_language');
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


        $relations = Relation::get();
        $data = [
            'data' => RelationResources::collection($relations),
            'total' => count($relations),
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
        $lang = $request->cookie('current_language');
        $validate = validator(
            $request->all(),
            [
                'name' => 'required',
                'ar_name' => 'required',

            ],
            [
                'required'  => 'The :attribute field is required.',

            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorRelation($validate->errors()->first());
        }

        try {
            DB::beginTransaction();
            $input = $request->all();
            $input['created_at'] = Carbon::now();
            $input['created_by'] = Auth::guard('api')->user()->id;

            $Relation = Relation::create($input);
            DB::commit();


            $Relation->setAttribute('created_by', Auth::guard('api')->user()->full_name);
            $Relation->setAttribute('is_active', 1);
            //$driver=Driver::where('id',$driver->id)->with('user:id,name,mobile,email','creator:id,name')->first();
            $message = Lang::get('site.success_added', [], $lang);
            return Response::respondSuccess($Relation);
        } catch (Exception $e) {
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
        $lang = $request->cookie('current_language');

        $Relation = Relation::find($id);
        if (!is_null($Relation)) {
            $validate = validator(
                $request->all(),
                [
                    'name' => 'required',
                    'ar_name' => 'required',
                ],
                [
                    'required'  => 'The :attribute field is required.',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorRelation($validate->errors()->first());
            }
        } else {
            $message = __('site.object_not_found', ['name' => __('site.driver', [], $lang)], $lang);
            return Response::respondError($message);
        }
        try {
            $Relation = Relation::find($id);
            if (!is_null($Relation)) {
                DB::beginTransaction();
                //   $input = $request->all();

                $data['ar_name'] = $request->ar_name;
                $data['name'] = $request->name;
                $data['updated_at'] = Carbon::now();
                $Relation->update($data);
                $Relation->created_by = Auth::guard('api')->user()->full_name;
                DB::commit();
                return Response::respondSuccess($Relation);
            } else {
                $message = Lang::get('site.user_not_found', [], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }



    public function activateDeactive(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {

            $relation = Relation::find($request->id);
            if (!is_null($relation)) {
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['is_active'] = !$relation->is_active;
                $relation->update($data);
                DB::commit();
                $relation->created_by = Auth::guard('api')->user()->full_name;
                return Response::respondSuccess($relation);
            } else {
                $message = Lang::get('site.relation_not_found', [], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }
    public function relationSelectList(Request $request)
    {
        return Response::respondSuccess(Relation::where('is_active', 1)->select('id as value', 'name as text')->get());
    }
}
