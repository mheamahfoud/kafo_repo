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
use App\Models\CaseDonation;
use App\Models\CaseFollower;
use App\Models\CaseUpdate;
use App\Models\Wallet;
use App\Models\CaseDonor;
use App\Models\SecretInfo;
use App\Models\Donor;
use Spatie\Permission\Models\Role;
use App\Http\Resources\Admin\CaseDonationsResouces;
use App\Http\Resources\Admin\CaseDonorsResouces;
use App\Http\Resources\Admin\CaseFollowersResouces;
use App\Http\Resources\Admin\CaseUpdateResouces;
use App\Http\Resources\Admin\CaseReportDonorsResouces;
use Lang;
use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Support\Facades\File;
use Notification;
use App\Notifications\SendPushNotification;

class CaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang = $request->cookie('current_language');
        //
        if (Auth::guard('api')->check()) {
            /* $fcmTokens = User::whereNotNull('fcm_token')->pluck('fcm_token')->toArray();
    
            Notification::send(null,new SendPushNotification('test test ','yyyy',$fcmTokens));
*/
            $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
            $sort_by = $request->get('sort_by');
            $descending = $request->get('descending');

            if ($descending == 'false') {
                $orderby = 'asc';
            } elseif ($descending == 'true') {
                $orderby = 'desc';
            } elseif ($descending == '') {
                $orderby = 'asc';
                $sort_by = 'created_at';
            }

            $query = CaseDonation::orderBy('created_at', 'DESC')->with(['validations', 'donors', 'costs' => function ($q) {
                $q->where('is_active', 1);
            }, 'media' => function ($q) {
                $q->where('collection_name', 'Cover_Photo');
            }]);

            if (!empty($request->get('name'))) {

                $search_name = $request->get('name');
                $query = $query->Where(function ($query) use ($search_name) {
                    $query
                        ->where('name', 'LIKE', $search_name . '%')
                        ->orwhere('name', 'LIKE', $search_name . '%');
                });
            }


            $cases = $query->get();;
            $data = [
                'data' => CaseDonationsResouces::collection($cases),
                'total' => count($cases),
            ];
            return Response::respondSuccess($data);

            //  return Response::respondSuccess($Admins);
        } else {
            return Response::respondErrorAuthorize(__('site.unauthenticate', [], $lang));
        }
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
        $lang = $request->cookie('current_language');
        $validate = validator(
            $request->all(),
            [
                'name' => 'required|unique:cases',
                'description' => 'required',
                'ar_name' => 'required|unique:cases',
                'ar_description' => 'required',

            ],
            [
                'required'  => 'The :attribute field is required.',
                'unique'  => Lang::get('site.unique', ['name' => ':attribute'], $lang),
            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }


        try {
            DB::beginTransaction();
            $input['created_by'] = Auth::guard('api')->user()->id;
            $input['created_at'] = Carbon::now();
            $input['name'] = $request->name;
            $input['ar_name'] = $request->ar_name;
            $input['description'] = $request->description;
            $input['ar_description'] = $request->ar_description;
            $input['status'] = 'draft';
            $input['vedio_url'] = $request->vedio_url;
            $case = CaseDonation::create($input);
            // $secret['created_by'] = Auth::guard('api')->user()->id;
            // $secret['created_at']=Carbon::now();
            // $secret['case_id']=$case->id;
            // $secret_info = SecretInfo::create($secret);
            $this->addMedias($request->cover_photo, $case, 'Cover_Photo');
            $this->addMultiMedias($request->images, $case, 'images_Case', []);
            //   File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
            DB::commit();
            $case_media_cover = CaseDonation::where('id', $case->id)->with(['media' => function ($q) {
                $q->where('collection_name', 'Cover_Photo');
            }])->first();
            $case->setAttribute('is_active', 1);
            $case->setAttribute('image_url', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['full_url'] : '');
            $case->setAttribute('display_name', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['display_name'] : '');
            $message = Lang::get('site.success_added', [], $lang);
            return Response::respondSuccess($case);
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


        $case = CaseDonation::with(['media' => function ($q) {
            $q->where('collection_name', 'images_Case');
        }])->find($request->id);
        unset($case->created_at);
        unset($case->created_by);
        unset($case->updated_by);
        unset($case->id);
        unset($case->status);
        unset($case->updated_at);
        unset($case->updated_by);

        return Response::respondSuccess($case);
    }





    public function update(Request $request, $id)
    {
        $lang = $request->cookie('current_language');


        $case = CaseDonation::find($id);
        if ($case != null) {
            $validate = validator(
                $request->all(),
                [
                    'description' => 'required',
                    'name' => 'required|unique:cases,name,' . $id,
                    'ar_name' => 'required|unique:cases,name,' . $id,
                    'ar_description' => 'required',
                ],
                [
                    'required'  => 'The :attribute field is required.',
                    'unique'  => Lang::get('site.unique', ['name' => ':attribute'], $lang),
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
        }
        try {
            if ($case !=  null) {
                DB::beginTransaction();
                //  $input = $request->all();
                $data['updated_at'] = Carbon::now();
                $data['updated_by'] = Auth::guard('api')->user()->id;
                $input['name'] = $request->name;
                $input['description'] = $request->description;
                $input['ar_name'] = $request->ar_name;
                $input['ar_description'] = $request->ar_description;

                $input['vedio_url'] = $request->vedio_url;
                $case->update($input);
                $this->addMedias($request->cover_photo, $case, 'Cover_Photo');
                $this->addMultiMedias($request->images, $case, 'images_Case', $request->delete_files);
                //File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
                DB::commit();
                $case_media_cover = CaseDonation::where('id', $case->id)->with(['media' => function ($q) {
                    $q->where('collection_name', 'Cover_Photo');
                }])->first();

                $case->setAttribute('image_url', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['full_url'] : '');
                $case->setAttribute('display_name', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['display_name'] : '');


                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($case);
            } else {
                $message = __('site.object_not_found', ['name' => __('site.case', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }



    /**
     * 
     * show Case Details
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
        $lang = $request->cookie('current_language');


        $case = CaseDonation::with(['media', 'updator', 'costs', 'creator', 'secretInfo' => function ($q) {
            $q->with(['relation', 'provider' => function ($q) {
                $q->with('media');
            }]);
        }])->find($request->id);


        return Response::respondSuccess($case);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function activateDeactive(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {
            $case = CaseDonation::find($request->id);
            if (!is_null($case)) {
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['updated_by'] = Auth::guard('api')->user()->id;
                $data['is_active'] = !$case->is_active;
                $case->update($data);

                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($case);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.case', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }



    public function publish(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {
            $case = CaseDonation::find($request->id);


            if (!is_null($case)) {
                if ($case->is_published) {
                    $message = Lang::get('site.publish_already', [], $lang);
                    return Response::respondError($message);
                }
                if (!$case->is_active) {
                    //  $message = Lang::get('site.object_not_active',[],$lang);
                    $message = Lang::get('site.object_not_active', ['name' => __('site.case', [], $lang)], $lang);
                    return Response::respondError($message);
                }
                if ($case->is_locked) {
                    $message = Lang::get('site.case_locked', [], $lang);
                    return Response::respondError($message);
                }
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['publish_date'] = Carbon::now();
                $data['is_published'] = 1;
                $data['updated_by'] = Auth::guard('api')->user()->id;
                $data['status'] = 'published';
                $case->update($data);
                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($case);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.case', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }




    public function cancel(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {
            $case = CaseDonation::with(['donors', 'costs' => function ($q) {
                $q->where('status', 'paid');
            }])->find($request->case_id);

            if (!is_null($case)) {

                if ($case->is_locked) {
                    $message = Lang::get('site.case_locked', [], $lang);
                    return Response::respondError($message);
                }
                if ($case->status == 'closed') {
                    $message = Lang::get('site.close_case', [], $lang);
                    return Response::respondError($message);
                }
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['updated_by'] = Auth::guard('api')->user()->id;

                $data['reason_cancel'] = $request->reason;
                $data['is_locked'] = 1;
                $data['status'] = 'canceled';
                $total_amount = array_sum(array_column($case->donors->toArray(), 'amount'));
                $total_paid_cost = array_sum(array_column($case->costs->toArray(), 'value'));
                foreach ($case->donors as $item) {
                    $refund = $item->amount - ($item->amount / $total_amount) * $total_paid_cost;
                    $donor = Donor::withTrashed()->where('id', $item->donor_id)->first();

                    $wallet = Wallet::where('id', $donor->wallet_id)->first();

                    //  $wallet = Wallet::where('id', $donor->wallet_id)->first();
                    $wallet->amount = $wallet->amount + $refund;
                    $wallet->last_charge_amount = $refund;
                    $wallet->charge_count = $wallet->charge_count + 1;
                    $wallet->last_charge_date = Carbon::now();
                    $wallet->update();

                    /// Wallet::charge($refund, $donor->wallet_id);

                }

                $case->update($data);
                DB::commit();
                $case_media_cover = CaseDonation::where('id', $case->id)->with(['media' => function ($q) {
                    $q->where('collection_name', 'Cover_Photo');
                }])->first();

                $case->setAttribute('image_url', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['full_url'] : '');
                $case->setAttribute('display_name', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['display_name'] : '');
                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($case);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.case', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }



    public function close(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {
            /*if( count($request->images)==0){
                    $message = Lang::get('site.images_required',[],$lang);
                    return Response::respondError($message);
                }*/

            $case = CaseDonation::find($request->id);
            if (!is_null($case)) {
                if (!$case->is_completed) {
                    $message = Lang::get('site.case_not_completed', [], $lang);
                    return Response::respondError($message);
                }
                if ($case->is_locked) {
                    $message = Lang::get('site.case_locked', [], $lang);
                    return Response::respondError($message);
                }
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['updated_by'] = Auth::guard('api')->user()->id;
                $data['status'] = 'closed';
                $data['description'] = $request->description;
                $case->update($data);
                // $this->addMultiMedias($request->images, $case, 'images_Case');
                $this->addMultiMedias($request->images, $case, 'images_Case', $request->delete_files);
                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);

                $case_media_cover = CaseDonation::where('id', $case->id)->with(['media' => function ($q) {
                    $q->where('collection_name', 'Cover_Photo');
                }])->first();

                $case->setAttribute('image_url', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['full_url'] : '');
                $case->setAttribute('display_name', count($case_media_cover->media) > 0 ? $case_media_cover->media[0]['display_name'] : '');

                return Response::respondSuccess($case);

                return Response::respondSuccess($case);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.case', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }


    public function delete_mdeia(Request $request)
    {
        try {
            if (isset($request->file_name)) {
                File::delete(public_path('uploads/' . config('constants.temp_upload_folder') . '/' . $request->file_name));
                return Response::respondSuccess('success');
            } else {
                $case = CaseDonation::find($request->model_id);
                // $model = CaseDonation::find($request->model_id);
                $case->media()->where('id', $request->id)->delete();

                return Response::respondSuccess('success');
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }

    public function getDonors(Request $request)
    {
        $lang = $request->cookie('current_language');

        $query = CaseDonor::where('case_id', $request->case_id)->with(['case', 'donor']);

        $case_donors = $query->get();;
        $data = [
            'data' => CaseDonorsResouces::collection($case_donors),
            'total' => count($case_donors),
        ];
        return Response::respondSuccess($data);
    }

    public function updateSecretInfo(Request $request, $case_id)
    {
        $lang = $request->cookie('current_language');


        $case_update = CaseDonation::find($case_id);

        try {
            if ($case_update->secret_info_id !=  null) {
                $secret_info = SecretInfo::with(['provider' => function ($q) {
                    $q->with('media');
                }])->where('id', $case_update->secret_info_id)->first();
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['updated_by'] = Auth::guard('api')->user()->id;
                $input['person_name'] = $request->person_name;
                $input['phone_number'] = $request->phone_number;
                $input['address'] = $request->address;
                $input['provider_id'] = $request->provider_id;

                $input['relation_name'] = $request->relation_name;
                $input['relation_id'] = $request->relation_id;

                $input['note'] = $request->note;
                $secret_info->update($input);
                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($secret_info);
            } else {

                DB::beginTransaction();
                $input['created_at'] = Carbon::now();
                $input['person_name'] = $request->person_name;
                $input['phone_number'] = $request->phone_number;
                $input['address'] = $request->address;
                $input['provider_id'] = $request->provider_id;
                $input['note'] = $request->note;
                $input['relation_name'] = $request->relation_name;
                $input['relation_id'] = $request->relation_id;


                $secret_info = SecretInfo::create($input);
                // $case_update['secret_info_id']=$secret_info->id;

                $case_update->secret_info_id = $secret_info->id;
                $case_update->update();

                DB::commit();
                $secret_info_after = SecretInfo::with(['provider' => function ($q) {
                    $q->with('media');
                }])->where('id', $secret_info->id)->first();

                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($secret_info_after);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }

    public function getFollowers(Request $request)
    {
        $lang = $request->cookie('current_language');

        $query = CaseFollower::where('case_id', $request->case_id)->with(['donor' => function ($q) {
            $q->with('media', 'user');
        }]);

        $case_followers = $query->get();;
        $data = [
            'data' => CaseFollowersResouces::collection($case_followers),
            'total' => count($case_followers),
        ];
        return Response::respondSuccess($data);
    }

    public function getUpdates(Request $request)
    {
        $lang = $request->cookie('current_language');
        $query = CaseUpdate::where('case_id', $request->case_id)->with(['media', 'creator']);
        $case_updates = $query->get();;
        $data = [
            'data' => CaseUpdateResouces::collection($case_updates),
            'total' => count($case_updates),
        ];
        return Response::respondSuccess($data);
    }

    public function storeUpdate(Request $request)
    {
        $lang = $request->cookie('current_language');

        $validate = validator(
            $request->all(),
            [
                'description' => 'required',
                'ar_description' => 'required',
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
            //  $input = $request->all();   
            $data['description'] =  $request->description;
            $data['ar_description'] = $request->ar_description;
            $data['case_id'] =  $request->case_id;
            $data['created_at'] = Carbon::now();
            $data['created_by'] = Auth::guard('api')->user()->id;
            $update = CaseUpdate::create($data);
            $case = CaseDonation::find($request->case_id);
            $case->updated_at=Carbon::now();
            $case->update();

            $this->addMedias($request->medias, $update, 'update_case');
            DB::commit();
            $update_media = CaseUpdate::where('id', $update->id)->with(['media'])->first();
            $update->setAttribute('created_by', Auth::guard('api')->user()->full_name);
            $update->setAttribute('views_count', $update_media->views_count);
            $update->setAttribute('download_url', count($update_media->media) > 0 ?  $update_media->media[0]['download_url'] : '');
            $update->setAttribute('image_url', count($update_media->media) > 0 ?  $update_media->media[0]['full_url'] : '');
            $update->setAttribute('display_name', count($update_media->media) > 0 ?  $update_media->media[0]['display_name'] : '');
            $message = Lang::get('site.success_added', [], $lang);
            return Response::respondSuccess($update);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }


    public function updateCaseUpdate(Request $request, $id)
    {
        $lang = $request->cookie('current_language');

        $case_update = CaseUpdate::find($id);
        if (!is_null($case_update)) {
            $validate = validator(
                $request->all(),
                [
                    'description' => 'required',
                    'ar_description' => 'required',
                ],
                [
                    'required'  => 'The :attribute field is required.',
                ]
            );
            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
        } else {
            $message = __('site.object_not_found', ['name' => __('site.driver', [], $lang)], $lang);
            return Response::respondError($message);
        }
        try {

            if (!is_null($case_update)) {
                DB::beginTransaction();
                //  $input = $request->all();
                $input['updated_at'] = Carbon::now();
                $input['description'] = $request->description;
                $input['ar_description'] = $request->ar_description;
                $case_update->update($input);
                $case = CaseDonation::find($case_update->case_id);
                $case->updated_at=Carbon::now();
                $case->update();

                $case_update->created_by = Auth::guard('api')->user()->full_name;
                $this->addMedias($request->medias, $case_update, 'update_case', true);
                DB::commit();
                $case_update_media = CaseUpdate::where('id', $case_update->id)->with(['media'])->first();
                $case_update->setAttribute('image_url', count($case_update_media->media) > 0 ? $case_update_media->media[0]['full_url'] : '');
                $case_update->setAttribute('display_name', count($case_update_media->media) > 0 ? $case_update_media->media[0]['display_name'] : '');
                return Response::respondSuccess($case_update);
            } else {
                $message = Lang::get('site.user_not_found', [], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }



    public function activateDeactiveUpdate(Request $request)
    {
        $lang = $request->cookie('current_language');

        try {
            $update = CaseUpdate::find($request->id);
            if (!is_null($update)) {
                DB::beginTransaction();
                $data['updated_at'] = Carbon::now();
                $data['is_active'] = !$update->is_active;
                $update->update($data);
                $case = CaseDonation::find($update->case_id);
                $case->updated_at=Carbon::now();
                $case->update();
                DB::commit();
                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($update);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.cost', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }
    public function getReportCase(Request $request)
    {
        $lang = $request->cookie('current_language');

        $report = CaseDonation::where('id', $request->id)->with(['costs', 'donors' => function ($q) {
            $q->with('donor');
        }])->first();
        $data = [
            'costs' => $report->costs,
            'donors' => CaseReportDonorsResouces::collection($report->donors),
        ];
        return Response::respondSuccess($data);

        //
    }
}
