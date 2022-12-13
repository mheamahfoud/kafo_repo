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
use App\Models\RequestWallet;
use Spatie\Permission\Models\Role;
use App\Http\Resources\AdminResouces;
use App\Http\Resources\Admin\RequestResouces;
use Lang;
use App\Models\Wallet;
use Carbon\Carbon;
use App\Notifications\SendPushNotification;
use App\Models\NotificationModel;
use Notification;
class RequestController extends Controller
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

            $query = RequestWallet::where('type', '!=', 'donation')->with(['donor' => function ($q) {
                $q->with(['user' => function ($q1) {
                    $q1->orderBy('full_name', 'asc');
                }]);
            }]);

            $requests = $query->get();;
            $data = [
                'data' => RequestResouces::collection($requests),
                'total' => count($requests),
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
    public function acceptRequest(Request $request)
    {
        $lang = $request->cookie('current_language');

        $validate = validator(
            $request->all(),
            [
                'receipt_image' => 'required',
            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }


        // if(isset($request->image))
        // {
        //     if(count($request->receipt_image)==0){
        //         if($lang=='en')
        //            return Response::respondErrorValidation('Receipt Image is Required');
        //         else{
        //             return Response::respondErrorValidation('صورة الوصل اجبارية');
        //         }
        //     }
        // }

        if (Auth::guard('api')->check()) {


            try {
                DB::beginTransaction();
                $request_one = RequestWallet::find($request->id);
                $request_one->status = 'accepted';

                $donor = Donor::find($request_one->donor_id);
                Wallet::charge($request_one->amount, $donor->wallet_id);
                //    $this->addMedias($request->receipt_image,$donor , 'receipt_image' );
                if (isset($request->receipt_image)) {
                    Storage::disk('receipt_files')->makeDirectory($request_one->id);
                    list($type, $data_image) = explode(';', $request->receipt_image);
                    list(, $data_image) = explode(',', $data_image);
                    $data_image = base64_decode($data_image);
                    $filename = Helpers::getFileName($type);
                    $path = public_path(config('constants.receipt_upload_folder')) . '/' . $request_one->id . '/' . $filename;
                    file_put_contents($path, $data_image);
                    $image_path = config('constants.receipt_upload_folder') . '/' . $request_one->id . '/' . $filename;
                    // $data['image_path'] = $image_path;
                    $request_one->image_path = $image_path;
                }
                $request_one->update();
                
                
                 ///send Notification 
            $fcmTokens = User::whereNotNull('fcm_token')->where('id', $donor->user_id)->pluck('fcm_token')->toArray();
            $title='Charge Wallet';
           // $body='Your wallet is charged with the required amount:'. ' '//.number_format($request->amount).' '. 'SYP';
 $body='تمت تعبئة محفظتك بالمبلغ المطلوب'  .number_format($request_one->amount).  ' ل.س
    ';
            Notification::send(null, new SendPushNotification($title, $body,null,null, $fcmTokens));
            $notification = [];
            $notification['sender_id'] = Auth::guard('api')->user()->id;
            $notification['receiver_id'] =  $donor->user_id;
            $notification['title'] =$title;
            $notification['description'] = $body;
            $notification['type'] = 'charge_wallet';
            $notification['image_path'] = null;
            NotificationModel::create($notification);
                DB::commit();
                $message = Lang::get('site.success_added', [], $lang);
                return Response::respondSuccess($request_one);
            } catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
        } else
            return Response::respondErrorAuthorize(__('site.unauthenticate', [], $lang));
    }


    public function rejectRequest(Request $request)
    {
        $lang = $request->cookie('current_language');
        if (Auth::guard('api')->check()) {


            try {
                DB::beginTransaction();
                $request_one = RequestWallet::find($request->id);
                $request_one->status = 'rejected';
                $request_one->update();
                DB::commit();
                $message = Lang::get('site.success_added', [], $lang);
                return Response::respondSuccess($request_one);
            } catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
        } else
            return Response::respondErrorAuthorize(__('site.unauthenticate', [], $lang));
    }

    public function chargeWallet(Request $request)
    {
        $lang = $request->cookie('current_language');
        if (Auth::guard('api')->check()) {

            $validate = validator(
                $request->all(),
                [
                    'amount' => 'required',
                    'donor_id' => 'required',
                    'receipt_image' => 'required',

                ],
                [
                    'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),

                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
            /*   if(isset($request->receipt_image))
            {
                if(count($request->receipt_image)==0){
                    if($lang=='en')
                       return Response::respondErrorValidation('Receipt Image is Required');
                    else{
                        return Response::respondErrorValidation('صورة الوصل اجبارية');
                    }
                }
            }*/

            try {
                DB::beginTransaction();
                $donor = Donor::find($request->donor_id);


                $payload = $request->only('amount');
                $payload['donor_id'] = $request->donor_id;
                $payload['created_at'] = Carbon::now();
                $payload['created_by'] = Auth::guard('api')->user()->id;
                $payload['status'] = 'accepted';
                $request_one=RequestWallet::create($payload);
                if (isset($request->receipt_image)) {
                    Storage::disk('receipt_files')->makeDirectory($request_one->id);
                    list($type, $data_image) = explode(';', $request->receipt_image);
                    list(, $data_image) = explode(',', $data_image);
                    $data_image = base64_decode($data_image);
                    $filename = Helpers::getFileName($type);
                    $path = public_path(config('constants.receipt_upload_folder')) . '/' . $request_one->id . '/' . $filename;
                    file_put_contents($path, $data_image);
                    $image_path = config('constants.receipt_upload_folder') . '/' . $request_one->id . '/' . $filename;
                    $request_one->image_path = $image_path;
                    $request_one->image_path=$image_path;
                    $request_one->update();

                }

                


                //Wallet::charge($request->amount, $donor->wallet_id);
                $wallet = Wallet::where('id', $donor->wallet_id)->first();
                $wallet->amount = $wallet->amount + $request->amount;
                $wallet->last_charge_amount = $request->amount;
                $wallet->charge_count = $wallet->charge_count + 1;
                $wallet->last_charge_date = Carbon::now();
                $wallet->update();


 ///send Notification 
            $fcmTokens = User::whereNotNull('fcm_token')->where('id', $donor->user_id)->pluck('fcm_token')->toArray();
            $title='Charge Wallet';
           // $body='Your wallet is charged with the required amount:'. ' '//.number_format($request->amount).' '. 'SYP';
            
            $body='تمت تعبئة محفظتك بالمبلغ المطلوب'  .number_format($request->amount).  ' ل.س
';
            Notification::send(null, new SendPushNotification($title, $body,null,null, $fcmTokens));
            $notification = [];
            $notification['sender_id'] = Auth::guard('api')->user()->id;
            $notification['receiver_id'] =  $donor->user_id;
            $notification['title'] =$title;
            $notification['description'] = $body;
            $notification['type'] = 'charge_wallet';
            $notification['image_path'] = null;
            NotificationModel::create($notification);
            
              //  $this->addMedias($request->receipt_image, $donor, 'receipt_image');
                DB::commit();
                return Response::respondSuccess($donor);
            } catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
        } else
            return Response::respondErrorAuthorize(__('site.unauthenticate', [], $lang));
    }
}
