<?php

namespace App\Http\Controllers\Api\V1\Mobile\UserManagment;

use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Repositories\Interfaces\DonorRepositoryInterface;
use Illuminate\Support\Facades\File;
use App\Repositories\Interfaces\CaseRepositoryInterface;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Lang as Lang;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isNull;

#use Lang;

class UserManagmentController extends Controller
{
    //
    private $caseRepository;
    private $donorRepository;


    public function __construct(CaseRepositoryInterface $caseRepository, DonorRepositoryInterface $donorRepository)
    {
        $this->donorRepository = $donorRepository;
        $this->caseRepository = $caseRepository;
    }









    public function signin(Request $request)
    {
        $lang = $request->header('lang');
        $validate = validator(
            $request->all(),
            [
                'mobile' => 'required',
            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
            ]
        );
        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {

            $user = $this->donorRepository->singin($request->mobile);

            if (!is_null($user)) {
                if (!$user->is_active) {
                    return Response::respondErrorUnAuthorize(__('site.unAuthorize', [], $lang));
                }

                return Response::respondSuccess(
                    [
                        'id' => $user->donor_id,
                        'mobile' => $user->mobile,
                        'token' => $user->token,
                    ]
                );
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.user', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }


    public function logout(Request $request)
    {

        $lang = $request->header('lang');

        if (!isset($lang)) {

            $lang = "ar";
        }

        if (!Auth::guard('api')->check()) {

            if ($lang == "en") {

                return Response::respondOut('please login again');
            }
            if ($lang == "ar") {

                return Response::respondOut('يرجى تسجيل الدخول اولا');
            }
        }

        if (Auth::guard('api')->check()) {

            $token = Auth::guard('api')->user()->token();
            $token->revoke();

            if ($lang == "en") {

                $data = 'success';
            }



            if ($lang == "ar") {

                $data = 'تمت العملية بنجاح';
            }

            return Response::respondSuccess($data);
        }
    }


    public function deleteAccount(Request $request)
    {
        $lang = $request->header('lang');

        try {
            DB::beginTransaction();
            $user = Auth::guard('api')->user();
            $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            $donor = $this->donorRepository->findById($donor_id, $columns = ['*'], $relations = ['user', 'media'], $appends = []);
            $donor->deleted_at = Carbon::now();
            $user->deleted_at = Carbon::now();
            $donor->update();
            $user->update();
            DB::commit();
            $message = Lang::get('site.success_deleted', [], $lang);
            return Response::respondSuccess($message);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }







    public function singup(Request $request)
    {
        $lang = $request->header('lang');
        $validate = validator(
            $request->all(),
            [
                'full_name' => 'required',
                'secret_name' => 'required',
                'mobile' => 'required|unique:users,mobile',
                'unique'    => ':attribute is already used',
            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
                'unique'    =>  $lang == 'en' ? ':attribute is already used' : ':attribute مستخدم من قبل',
            ]
        );
        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {
            DB::beginTransaction();
            $payload = $request->only('full_name', 'secret_name', 'mobile');
            $donor = $this->donorRepository->singup($payload);
            DB::commit();
            return Response::respondSuccess(
                [
                    'full_name' => $donor->user->full_name,
                    'secret_name' => $donor->secret_name,
                    'mobile' => $donor->user->mobile,
                ]
            );
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }




   public function viewMyProfile(Request $request)
    {
        $lang = $request->header('lang');
        try {
            $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            $donor = $this->donorRepository->findById($donor_id, $columns = ['*'], $relations = ['user', 'wallet','media'], $appends = []);

            if (!is_null($donor)) {
        /*        $image_profile = array_filter($donor->media->toArray(), function ($val) {
                    return $val['collection_name'] === 'Donors';
                });*/
                $data = [
                    'full_name' => $donor->user->full_name,
                    'secret_name' => $donor->secret_name,
          'image' => is_null($donor->image_path)?null: env('APP_URL').'/'. $donor->image_path,
                    'mobile' => $donor->user->mobile,
                    'email' => $donor->user->email,

                    'gender' =>!is_null($donor->gender) ? Lang::get('site.'.$donor->gender,[],$lang) :null ,
                    'birth_date' => $donor->birth_date,

                    'country' => !is_null($donor->country) ?  $lang  =='en'  ? $donor->country->name : $donor->country->ar_name : null,
                    'city' => !is_null($donor->city) ?   $lang  =='en'  ? $donor->city->name :$donor->city->ar_name : null,
                    'wallet'=>!is_null($donor->wallet)  ?  Helpers::number_format_short($donor->wallet->amount)  :  "0",
                     'cases'=>Helpers::number_format_short(count($this->caseRepository->GetSumCaseDonationsByDonor($donor_id))),
                     'donations'=>Helpers::number_format_short($this->caseRepository->GetSumDonationsByDonor($donor_id)),
                    


                ];
                return Response::respondSuccess($data);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.donor', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }

    public function editMyProfile(Request $request)
    {
        $lang = $request->header('lang');
        try {
            $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            $donor = $this->donorRepository->findById($donor_id, $columns = ['*'], $relations = ['user'], $appends = []);

            if (!is_null($donor)) {
              /*  $image_profile = array_filter($donor->media->toArray(), function ($val) {
                    return $val['collection_name'] === 'Donors';
                });*/
                $data = [
                    'full_name' => $donor->user->full_name,
                    'secret_name' => $donor->secret_name,
                    'mobile' => $donor->user->mobile,
                    'email' => $donor->user->email,
                    'gender' => $donor->gender,
                    'birth_date' => $donor->birth_date,
                    'country_id' => $donor->country_id,
                    'city_id' => $donor->city_id,
                    'image' => is_null($donor->image_path)?null: env('APP_URL').'/'. $donor->image_path,
                    

                    //'image' => count($image_profile)>0  ? $image_profile[0]['full_url'] :null,

                ];
                return Response::respondSuccess($data);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.donor', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }





    public function updateMyProfile(Request $request)
    {
        $lang = $request->header('lang');
        $validate = validator(
            $request->all(),
            [
                'full_name' => 'required',
                'secret_name' => 'required',
                // 'email' => 'email|unique:users,email,'. Auth::guard('api')->user()->id,
            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
                ///  'unique'    =>':attribute is already used',
            ]


            // 'password' => 'required',



        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {
            $id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            DB::beginTransaction();
            $donor = $this->donorRepository->findById($id, $columns = ['*'], $relations = [], $appends = []);
            if (!is_null($donor)) {
                $payload = $request->only('full_name', 'secret_name', 'mobile', 'email', 'gender', 'birth_date', 'country_id', 'city_id');

                if ($request->hasFile('image')) {
                    if (File::exists(public_path($donor->image_path))) {
                        File::delete(public_path($donor->image_path));
                    }
                    Storage::disk('users_files')->makeDirectory($donor->id);
                    $randomize = rand(111111, 999999);
                    $extension = $request->file('image')->getClientOriginalExtension();
                    $filename = time().'_'.$randomize . '.' . $extension;
                    $path = public_path(config('constants.users_upload_folder')) . '/' . $donor->id . '/' ;
                     $request->file('image')->move($path, $filename);
                    $image_path = config('constants.users_upload_folder') . '/' . $donor->id . '/' . $filename;
                    $donor->image_path=$image_path;
                    $donor->update();
                }
            
              
                $donor = $this->donorRepository->editProfile($payload, $id);
                DB::commit();
               /* $image_profile = array_filter($donor->media->toArray(), function ($val) {
                    return $val['collection_name'] === 'Donors';
                });*/

                $data = [
                    'full_name' => $donor->user->full_name,
                    'secret_name' => $donor->secret_name,
                    'mobile' => $donor->user->mobile,
                    'email' => $donor->user->email,
                    'gender' => $donor->gender,
                    'birth_date' => $donor->birth_date,
                    'country_id' => $donor->country_id,
                    'city_id' => $donor->city_id,
                    'image' => is_null($donor->image_path)?null: env('APP_URL').'/'. $donor->image_path,
                   // 'image' =>    !is_null($donor->media) ? count($donor->media) > 0 ?  $donor['media'][0]['full_url'] : null : null,
                ];


                return Response::respondSuccess($data);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.donor', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }

    /**
     * show wallet  Details
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function viewMyWallet(Request $request)
    {
        $lang = $request->header('lang');
        try {
            $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            $donor = $this->donorRepository->findById($donor_id, $columns = ['*'], $relations = ['wallet', 'donations' => function ($p) {
                $p->with('case');
            }], $appends = []);
            if (!is_null($donor)) {
               // echo json_encode($donor_id);
              //  die();
                $data = [
                    'total_amount' => Helpers::number_format_short($donor->wallet->amount),
                    'last_charge_amount' => Helpers::number_format_short($donor->wallet->last_charge_amount),
                    'last_charge_date' => $donor->wallet->last_charge_date,
                    'charge_count' => Helpers::number_format_short($donor->wallet->charge_count),
                              'total_donation_amount' => Helpers::number_format_short(array_sum(array_column($donor->donations->toArray(), 'amount'))+$this->donorRepository->GetSumDonationsForAppByDonor($donor_id)),


                    'donations' => array_map(
                        function ($val1) use ($lang ) {
                            return [
                                'case_name' =>  $lang =='en'  ? $val1['case']['name'] :$val1['case']['ar_name'] ,
                                'amount' => Helpers::number_format_short($val1['amount']),
                                'donate_date' => $val1['created_at'],
                            ];
                        },
                        $donor->donations->toArray()
                    )

                ];

                return Response::respondSuccess($data);
            } else {
                $message = Lang::get('site.object_not_found', ['name' => __('site.story', [], $lang)], $lang);
                return Response::respondError($message);
            }
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }


    public function chargeWallet(Request $request)
    {
        $lang = $request->header('lang');
        $validate = validator(
            $request->all(),
            [
                'amount' => 'required|numeric|min:1',
                // 'donor_id' => 'required',

            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
                'min'  => Lang::get('site.min', ['name' => ':attribute'], $lang),
                'numeric' => Lang::get('site.numeric', ['name' => ':attribute'], $lang),
            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {
            DB::beginTransaction();
            $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);

            $payload = $request->only('amount');
            $payload['donor_id'] = $donor_id;
            $this->donorRepository->CreateRequest($payload);
            DB::commit();
            $data = [
                'total_amount' => $request->amount,
            ];
            return Response::respondSuccess($data);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }







    public function listTransactions(Request $request)
    {
        $lang = $request->header('lang');
        $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
        $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
  
        try {
            $requests= $this->donorRepository->getRequests($donor_id,$limit = $rowsPerPage);
        
         //  $donations= $this->caseRepository->GetDonations($donor_id,$limit = $rowsPerPage);
           //echo json_encode($requests);
        //   die();
            $requests_items=[];
         //   $donations_items=[];
            $donation_kafo=$lang=='en'?'donation For Kafo':'تبرع للتطبيق';
            $pending_request=$lang=='en'?'Charge Pending':'قيد الانتظار';
              $accepted_request=$lang=='en'?'Charge Accepted':'تمت الموافقة';
            foreach($requests as $item){
                $case_name='';
                if($item['type'] =='donation'){
                    $case_name=!is_null($item['case']) ? ($lang=='en' ? $item['case']["name"] :$item['case']["ar_name"]):$donation_kafo;
                }
                else{
                   $case_name= $item['status']=='pending'? $pending_request : $accepted_request;
                }
                array_push(
                        $requests_items,
                        [
                            'amount' => Helpers::number_format_short($item['amount']),
                            'status' =>$item['type']=='request' ? $item['status']:null,
                            'date' => $item['created_at'],
                            'case_name' =>$case_name,
                            'type' => $item['type'],
                        ]
                );
            }
    

                $data=[
                    
                        "items"=>$requests_items,
                        "total"=>$requests->total()
                ];
               
              

            return Response::respondSuccess($data);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
    }






    public function setFcmToken(Request $request)
    {
        User::find(Auth::guard('api')->user()->id)->update([
            'fcm_token' => $request->token,
        ]);
        return Response::respondSuccess('success');
    }
}
