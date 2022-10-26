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
use App\Models\Validation;
use App\Models\Provider;
use App\Models\ValidationType;
use Spatie\Permission\Models\Role;
use App\Http\Resources\Admin\ValidationResouces;
use Lang;
use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Support\Facades\File;
use App\Models\CaseDonation;

class ValidationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang = $request->cookie('current_language');


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
        $query = Validation::where('case_id', $request->case_id)->with(['type', 'provider' => function ($q) {
            $q->with('media');
        }]);

        // $query = Validation::with(['type','provider','media'=> function ($q) {
        //     $q->where('collection_name', 'Cover_Photo');}]);

        if (!empty($request->get('name'))) {

            $search_name = $request->get('name');
            $query = $query->Where(function ($query) use ($search_name) {
                $query
                    ->where('name', 'LIKE', $search_name . '%')
                    ->orwhere('name', 'LIKE', $search_name . '%');
            });
        }


        $validations = $query->get();;
        $data = [
            'data' => ValidationResouces::collection($validations),
            'total' => count($validations),
        ];
        return Response::respondSuccess($data);

        //  return Response::respondSuccess($Admins);

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
                'description' => 'required',
                'ar_name' => 'required',
                'ar_description' => 'required',
                'type_id' => 'required',
                //'images' => 'required',
                'status' => 'required',

            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }




        try {

            $case = CaseDonation::find($request->case_id);
            if ($case->is_published) {
                $message = Lang::get('site.case_published', [], $lang);
                return Response::respondError($message);
            }
            DB::beginTransaction();
            $input['created_by'] = Auth::guard('api')->user()->id;
            $input['created_at'] = Carbon::now();
            $input['name'] = $request->name;
            $input['description'] = $request->description;
            $input['ar_name'] = $request->ar_name;
            $input['ar_description'] = $request->ar_description;
            $input['type_id'] = $request->type_id;
            $input['provider_id'] = $request->provider_id;
            $input['status'] = $request->status;
            $input['case_id'] = $request->case_id;

            $validation = Validation::create($input);
            //update last action date
            if($request->status=="not_valid"){
                if($case->is_locked ==0){
                    $case->status = 'rejected';
                    $case->is_locked = 1;
                }
            }
            $case->updated_at = Carbon::now();
            $case->update();

            $this->addMultiMedias($request->images, $validation, 'images_Validations', []);
            // File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
            DB::commit();
            $provider_media_cover = Provider::where('id', $validation->provider_id)->with(['media' => function ($q) {
                $q->where('collection_name', 'provider');
            }])->first();
            if ($provider_media_cover != null) {
                $validation->setAttribute('provider_name', $provider_media_cover->name);
                $validation->setAttribute('provider_download_url', count($provider_media_cover->media) > 0 ? $provider_media_cover->media[0]['download_url'] : '');
                $validation->setAttribute('provider_image_url', count($provider_media_cover->media) > 0 ? $provider_media_cover->media[0]['full_url'] : '');
            }


            $type = ValidationType::findOrfail($validation->type_id);

            $validation->setAttribute('is_active', 1);
            $validation->setAttribute('type_name', $type->name);

            $message = Lang::get('site.success_added', [], $lang);
            return Response::respondSuccess($validation);
        } catch (Exception $e) {
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
    public function edit(Request $request)
    {
        //
        $lang = $request->cookie('current_language');


        $validation = Validation::with(['media' => function ($q) {
            $q->where('collection_name', 'images_Validations');
        }])->find($request->id);
        unset($validation->created_at);
        unset($validation->created_by);
        unset($validation->updated_by);
        unset($validation->updated_at);
        unset($validation->updated_by);

        return Response::respondSuccess($validation);
    }





    public function update(Request $request, $id)
    {
        $lang = $request->cookie('current_language');


        $validation = Validation::find($id);
        if ($validation != null) {
            $validate = validator(
                $request->all(),
                [
                    'name' => 'required',
                    'description' => 'required',
                    'ar_name' => 'required',
                    'ar_description' => 'required',
                    'type_id' => 'required',
                    //'images' => 'required',
                    'status' => 'required',

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
            if ($validation !=  null) {
                $case = CaseDonation::with('validations')->find($validation->case_id);
                if ($case->is_published) {
                    $message = Lang::get('site.case_published', [], $lang);
                    return Response::respondError($message);
                }

                //get not valid to 
                $CheckNotValidValidations= Validation::where('id','!=',$validation->id)->where('case_id',$validation->case_id)->where('status','not_valid')->get();
               

                DB::beginTransaction();
                //  $input = $request->all();
                $input['updated_at'] = Carbon::now();
                $input['ar_name'] = $request->ar_name;
                $input['name'] = $request->name;
                $input['ar_description'] = $request->ar_description;
                $input['type_id'] = $request->type_id;
                $input['provider_id'] = $request->provider_id;
                $input['status'] = $request->status;
                $input['case_id'] = $request->case_id;
                $validation->update($input);
                $this->addMultiMedias($request->images, $validation, 'images_Validations', $request->delete_files);

                //update last action date
                if($request->status=="not_valid"){

                 
                    if($case->is_locked ==0){
                        $case->status = 'rejected';
                        $case->is_locked = 1;
                    }
                }
                else{
                     if(count($CheckNotValidValidations)==0){
                        if($case->is_locked ==1){
                            $case->status = 'draft';
                            $case->is_locked = 0;
                        }
                       
                     }
                }
                $case->updated_at = Carbon::now();
                $case->update();
                //    File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
                DB::commit();
                $provider_media_cover = Provider::where('id', $validation->provider_id)->with(['media' => function ($q) {
                    $q->where('collection_name', 'provider');
                }])->first();
                if (isset($request->provider_id)) {
                    $validation->setAttribute('provider_image_url', count($provider_media_cover->media) > 0 ? $provider_media_cover->media[0]['full_url'] : '');
                    $validation->setAttribute('provider_download_url', count($provider_media_cover->media) > 0 ? $provider_media_cover->media[0]['download_url'] : '');
                    $validation->setAttribute('provider_name', $provider_media_cover->name);
                }

                $validation->setAttribute('type_name', $validation->type->name);
                unset($validation->type);


                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($validation);
            } else {
                $message = __('site.object_not_found', ['name' => __('site.validation', [], $lang)], $lang);
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
            $donor = Donor::find($request->id);
            if (!is_null($donor)) {
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $input['is_active'] = !$donor->user->is_active;
                $donor->update($data);
                $donor->user->update($input);
                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);

                if (!is_null($donor->user)) {
                    $donor->setAttribute('mobile', $donor->user->mobile);
                    $donor->setAttribute('email', $donor->user->email);
                    $donor->setAttribute('name', $donor->user->name);
                    $donor->setAttribute('is_active', $donor->user->is_active);
                }
                $donor_media = Donor::where('id', $donor->id)->with(['media'])->first();
                $donor->setAttribute('image_url', count($donor_media->media) > 0 ? $donor_media->media[0]['full_url'] : '');
                $donor->setAttribute('display_name', count($donor_media->media) > 0 ? $donor_media->media[0]['display_name'] : '');
                unset($donor->user_id);
                unset($donor->is_deleted);
                unset($donor->updated_by);
                unset($donor->deleted_at);
                unset($donor->user);

                return Response::respondSuccess($donor);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.validation', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }


    public function destroy(Request $request)
    {
        $lang = $request->cookie('current_language');


        try {
            $validate = Validation::find($request->id);
            if ($validate != null) {
                $case = CaseDonation::with('validations')->find($validate->case_id);
                if ($case->is_published) {
                    $message = Lang::get('site.case_published', [], $lang);
                    return Response::respondError($message);
                }
                $validate->delete();
                $message = Lang::get('site.success_deleted', [], $lang);
                return Response::respondSuccess($message);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.validation', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {

            return Response::respondError($e);
        }
    }
}
