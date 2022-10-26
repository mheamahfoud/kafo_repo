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
use App\Models\Donor;
use App\Models\Wallet;
use Spatie\Permission\Models\Role;
use App\Http\Resources\Admin\DonorResouces;
use Lang;
use Carbon\Carbon;
use File;
class DonorController extends Controller
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

        $query = Donor::with(['donations', 'user' => function ($q) {
            $q->orderBy('full_name', 'asc');
        }, 'city', 'country', 'media' => function ($q) {
            $q->where('collection_name', 'Donors');
        }]);

        if (!empty($request->get('full_name'))) {

            $search_name = $request->get('full_name');
            $query = $query->Where(function ($query) use ($search_name) {
                $query
                    ->where('full_name', 'LIKE', $search_name . '%')
                    ->orwhere('full_name', 'LIKE', $search_name . '%');
            });
        }


        $donors = $query->get();;
        $data = [
            'data' => DonorResouces::collection($donors),
            'total' => count($donors),
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
        $lang = $request->cookie('current_language');
        $validate = validator(
            $request->all(),
            [
                'full_name' => 'required',
                'secret_name' => 'required',
                'email' => 'email|unique:users,email',
                'mobile' => 'unique:users,mobile',
            ],
            [
                'required'  => 'The :attribute field is required.',
                'unique'    => ':attribute is already used',
            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }


        try {
            DB::beginTransaction();
            $input = $request->all();
            $input['password'] = ''; //\;//Hash::make($request->password);
            $input['created_at'] = Carbon::now();
            //  $data['is_active'] = 1;
            $input['created_by'] = Auth::guard('api')->user()->id;
            $wallet['created_at'] = Carbon::now();
            $wallet['created_by'] = Auth::guard('api')->user()->id;
            $user = User::create($input);

            $wallet = Wallet::create($wallet);



            $data['wallet_id'] = $wallet->id;
            $data['gender'] = $request->gender;
            $data['secret_name'] = $request->secret_name;
            $data['country_id'] = $request->country_id;
            $data['birth_date'] = $request->birth_date;
            $data['city_id'] = $request->city_id;
            $data['user_id'] = $user->id;
            $data['created_by'] = Auth::guard('api')->user()->id;
            $data['created_at'] = Carbon::now();
            $donor = Donor::create($data);
          


            //uplo$image_path ud image
            ///   $this->addMedias($request->medias, $donor, 'Donors');
            $image_path ="";
            if (isset($request->image)) {
                Storage::disk('users_files')->makeDirectory($donor->id);
                list($type, $data_image) = explode(';', $request->image);
                list(, $data_image) = explode(',', $data_image);
                $data_image = base64_decode($data_image);
                $filename = Helpers::getFileName($type);
                $path = public_path(config('constants.users_upload_folder')) . '/' . $donor->id . '/' . $filename;
                file_put_contents($path, $data_image);
                $image_path = config('constants.users_upload_folder') . '/' . $donor->id . '/' . $filename;
                $data['image_path'] = $image_path;
              //  $donor=Donor::find($donor->id);
                $donor->image_path=$image_path;
                $donor->update();
            }


            DB::commit();
            $res = $donor;
            $res->setAttribute('image_path', $image_path);
            if (!is_null($user)) {
                $res->setAttribute('full_name', $user->full_name);
                $res->setAttribute('mobile', $user->mobile);
                $res->setAttribute('is_active', 1);
            }
            ///    $res->setAttribute('image_url', count($donor_media->media) > 0 ? $donor_media->media[0]['full_url'] : '');
            ///  $res->setAttribute('display_name', count($donor_media->media) > 0 ? $donor_media->media[0]['display_name'] : '');

            unset($input['created_by']);


            $message = Lang::get('site.success_added', [], $lang);
            return Response::respondSuccess($res);
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


        $donor = Donor::find($request->id);
        if (!is_null($donor->user)) {
            $donor->setAttribute('mobile', $donor->user->mobile);
            $donor->setAttribute('email', $donor->user->email);
            $donor->setAttribute('full_name', $donor->user->full_name);
            //    $donor->setAttribute('is_active', $donor->user->is_active);
        }
        unset($donor->user_id);
        unset($donor->is_deleted);
        unset($donor->updated_by);
        unset($donor->deleted_at);
        unset($donor->user);

        unset($donor->created_at);
        unset($donor->created_by);
        unset($donor->wallet_id);
        unset($donor->updated_at);

        return Response::respondSuccess($donor);
    }


    public function show(Request $request)
    {
        //
        $lang = $request->cookie('current_language');
        $donor = Donor::where('id', $request->id)->with(['donations' => function ($q) {
            $q->with('case');
        }, 'wallet', 'user', 'media' => function ($q1) {
            $q1->where('collection_name', 'Donors');
        }])->first();


        return Response::respondSuccess($donor);
    }



    public function update(Request $request, $id)
    {
        $lang = $request->cookie('current_language');
        $donor = Donor::find($id);
        if ($donor != null) {
            $validate = validator(
                $request->all(),
                [
                    'full_name' => 'required',
                    'secret_name' => 'required',
                    'mobile' => 'unique:users,mobile,' . $donor->user_id,
                    'email' => 'email|unique:users,email,' . $donor->user_id,

                ],
                [
                    'required'  => 'The :attribute field is required.',
                    'unique'    => ':attribute is already used',
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
        }
        try {
            if ($donor !=  null) {
                DB::beginTransaction();
                $input = $request->all();
                $input['updated_at'] = Carbon::now();
                $input['is_active'] = $donor->user->is_active;
                $donor->update($input);
                ///$this->addMedias($request->medias, $donor, 'Donors');
                //uploud iamge
                if (isset($request->image)) {
                    if (File::exists(public_path($donor->image_path))) {
                        File::delete(public_path($donor->image_path));
                    }
                    Storage::disk('users_files')->makeDirectory($donor->id);
                    list($type, $data_image) = explode(';', $request->image);
                    list(, $data_image) = explode(',', $data_image);
                    $data_image = base64_decode($data_image);
                    $filename = Helpers::getFileName($type);
                    $path = public_path(config('constants.users_upload_folder')) . '/' . $donor->id . '/' . $filename;
                    file_put_contents($path, $data_image);
                    $image_path = config('constants.users_upload_folder') . '/' . $donor->id . '/' . $filename;
                   // $donor=Donor::find($donor->id);
                    $donor->image_path=$image_path;
                    $donor->update();
                }
              
                

                $donor->user->update($input);
                DB::commit();
                if (!is_null($donor->user)) {
                    $donor->setAttribute('mobile', $donor->user->mobile);
                    $donor->setAttribute('email', $donor->user->email);
                    $donor->setAttribute('full_name', $donor->user->full_name);
                    $donor->setAttribute('is_active', $donor->user->is_active);
                }
             //   $donor_media = Donor::where('id', $donor->id)->with(['media' => function ($q) {
             //       $q->where('collection_name', 'Donors');
             //   }])->first();
              //  $donor->setAttribute('image_url', count($donor_media->media) > 0 ? $donor_media->media[0]['full_url'] : '');
               // $donor->setAttribute('display_name', count($donor_media->media) > 0 ? $donor_media->media[0]['display_name'] : '');
                unset($donor->user_id);
                unset($donor->is_deleted);
                unset($donor->updated_by);
                unset($donor->deleted_at);
                unset($donor->user);

                $message = Lang::get('site.success_update', [], $lang);
                return Response::respondSuccess($donor);
            } else {
                $message = __('site.object_not_found', ['name' => __('site.Donor', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
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
                    $donor->setAttribute('full_name', $donor->user->full_name);
                    $donor->setAttribute('is_active', $donor->user->is_active);
                }
                $donor_media = Donor::where('id', $donor->id)->with(['media' => function ($q) {
                    $q->where('collection_name', 'Donors');
                }])->first();
                $donor->setAttribute('image_url', count($donor_media->media) > 0 ? $donor_media->media[0]['full_url'] : '');
                $donor->setAttribute('display_name', count($donor_media->media) > 0 ? $donor_media->media[0]['display_name'] : '');
                unset($donor->user_id);
                unset($donor->is_deleted);
                unset($donor->updated_by);
                unset($donor->deleted_at);
                unset($donor->user);

                return Response::respondSuccess($donor);
            } else {
                $message = Lang::get('site.user_not_found', [], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }

    public function getDonorsList()
    {
        $donors =  Donor::select(
            'user_id  as value',
            'mobile as mobile_number',
            //  'users.*',
            'users.full_name AS text'
        )
            ->join('users', 'users.id', '=', 'donors.user_id')->get();




        return Response::respondSuccess($donors);
    }
}
