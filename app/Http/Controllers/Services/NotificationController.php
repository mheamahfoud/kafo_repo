<?php

namespace App\Http\Controllers\Services;

use App\Http\Responses\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationsResources;
use App\Models\NotificationModel;
use Notification;
use App\Notifications\SendPushNotification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\Models\CaseDonation;
use App\Models\CaseDonor;
use App\Models\Donor;
use App\Models\CaseFollower;
use Lang;
use App\Components\Core\Utilities\Helpers;
class NotificationController extends Controller
{
    protected $serverKey;

    public function __construct()
    {
        $this->serverKey =
            'AAAA3GLfjWI:APA91bHF8Gc2BfnJ5vPuxfZsgt1340BhBxquNPHdYgbz4nB0LwAULlN8k6cTkX1hmU_a0D2kN_zqhRjr3TDGPYh26XbERY_J1lfYdGPM6VzNYxMh_SeHK01O4Onv72aQiOm6xxKdiKut';
    }



    /**
     * send specific Push Notification
     * Php function
     */
    public function sendSpecificNotification(Request $request)
    {
        $lang = $request->cookie('current_language');
        $validate = validator(
            $request->all(),
            [
                'users_id' => 'required',
                'title' => 'required',
                'body' => 'required',
            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
            ]
        );
        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {
            $image_path=null;
            if (isset($request->image)) {
               /// Storage::disk('notifications_files')->makeDirectory();
                 list($type, $data_image) = explode(';',$request->image);
                 list(, $data_image) = explode(',', $data_image);
                 $data_image = base64_decode($data_image);
                 $filename=Helpers::getFileName($type);
                 $path = public_path(config('constants.notification_upload_folder')).'/'. $filename;
                 file_put_contents($path, $data_image);
                 $image_path=config('constants.notification_upload_folder').'/'. $filename;
                 $data['image_path'] = $image_path;
               
         }

            //->whereIn('id',$request->users_id)
            $fcmTokens = User::whereNotNull('fcm_token')->whereIn('id',$request->users_id)->pluck('fcm_token')->toArray();
            
           
            Notification::send(null, new SendPushNotification($request->title, $request->body,$image_path, $fcmTokens));
            foreach ($request->users_id as $user) {
                $notification = [];

                $notification['sender_id'] = Auth::guard('api')->user()->id;

                $notification['receiver_id'] =  $user;

                $notification['title'] = $request->title;

                $notification['description'] = $request->body;

                $notification['type'] = 'general';
                $notification['image_path'] = $image_path;
                NotificationModel::create($notification);
            }

            return Response::respondSuccess('success');
        } catch (Exception $e) {

            return Response::respondError($e);
        }
    }



    /**
     * send Push Notification
     * Php function
     */

    public function sendPushNotification(Request $request)
    {
        $request->validate([
            'case_id' => 'required',
            'type' => 'required'
        ]);

        try {

            // $followers=CaseFollower::where('case_id',$request->case_id)->pluck('donor_id')->toArray();
            ///   $donors=CaseDonor::where('case_id',$request->case_id)->pluck('donor_id')->toArray();
         


            $image_path=null;
            if (isset($request->image)) {
                /// Storage::disk('notifications_files')->makeDirectory();
                  list($type, $data_image) = explode(';',$request->image);
                  list(, $data_image) = explode(',', $data_image);
                  $data_image = base64_decode($data_image);
                  $filename=Helpers::getFileName($type);
                  $path = public_path(config('constants.notification_upload_folder')).'/'. $filename;
                  file_put_contents($path, $data_image);
                  $image_path=config('constants.notification_upload_folder').'/'. $filename;
           }
            if($request->type=='publish_case'){
                $users_id = Donor::pluck('user_id')->toArray();
                
                $fcmTokens = User::whereNotNull('fcm_token')->whereIn('id',$users_id)->pluck('fcm_token')->toArray();
                $title = "Publish New Case";
                $message = "new case have been publish";
                
                Notification::send(null, new SendPushNotification($title, $message,$image_path, $fcmTokens));

                foreach ($users_id as $user) {
                    $notification = [];
    
                    $notification['sender_id'] = Auth::guard('api')->user()->id;
    
                    $notification['receiver_id'] =  $user;
    
                    $notification['title'] = $title;
    
                    $notification['description'] =$message;
    
                    $notification['type'] = 'publish_case';
                    $notification['image_path'] = $image_path;
                    NotificationModel::create($notification);
                }

            


            }

            elseif($request->type=='cancel_case'){
                $case=CaseDonation::find($request->case_id);
                $followers = CaseFollower::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donors = CaseDonor::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donor_ids = array_unique(array_merge($followers, $donors), SORT_REGULAR);
                $users_id = Donor::whereIn('id',$donor_ids)->pluck('user_id')->toArray();
                $fcmTokens = User::whereNotNull('fcm_token')->whereIn('id',$users_id)->pluck('fcm_token')->toArray();
                $title = "Cancel Case";
                $message = "Case " .$case->name . "  have been canceled";
                Notification::send(null, new SendPushNotification($title, $message,$image_path, $fcmTokens));
                foreach ($users_id as $user) {
                    $notification = [];
    
                    $notification['sender_id'] = Auth::guard('api')->user()->id;
    
                    $notification['receiver_id'] =  $user;
    
                    $notification['title'] = $title;
    
                    $notification['description'] =$message;
    
                    $notification['type'] = 'cancel_case';
                    $notification['image_path'] = $image_path;
                    NotificationModel::create($notification);
                }




            }

            elseif($request->type=='close_case'){

                $case=CaseDonation::find($request->case_id);
                $followers = CaseFollower::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donors = CaseDonor::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donor_ids = array_unique(array_merge($followers, $donors), SORT_REGULAR);
                $users_id = Donor::whereIn('id',$donor_ids)->pluck('user_id')->toArray();

                $fcmTokens = User::whereNotNull('fcm_token')->whereIn('id',$users_id)->pluck('fcm_token')->toArray();
                $title = "Close Case";
                $message = "Case " .$case->name . "  have been closed";
                Notification::send(null, new SendPushNotification($title, $message,$image_path, $fcmTokens));
                foreach ($users_id as $user) {
                    $notification = [];
    
                    $notification['sender_id'] = Auth::guard('api')->user()->id;
    
                    $notification['receiver_id'] =  $user;
    
                    $notification['title'] = $title;
    
                    $notification['description'] =$message;
    
                    $notification['type'] = 'close_case';
                    $notification['image_path'] = $image_path;
                    NotificationModel::create($notification);
                }
                
            }


            elseif($request->type=='add_update'){
               
                $case=CaseDonation::find($request->case_id);
                $followers = CaseFollower::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donors = CaseDonor::where('case_id', $request->case_id)->pluck('donor_id')->toArray();
                $donor_ids = array_unique(array_merge($followers, $donors), SORT_REGULAR);
                $users_id = Donor::whereIn('id',$donor_ids)->pluck('user_id')->toArray();

                $fcmTokens = User::whereNotNull('fcm_token')->pluck('fcm_token')->toArray();
                $title = "Add Update";
                $message =  "new Update have been added to Case "  .$case->name ;
               
                foreach ($users_id as $user) {
                    $notification = [];
                  
                    $notification['sender_id'] = Auth::guard('api')->user()->id;
    
                    $notification['receiver_id'] =  $user;
    
                    $notification['title'] = $title;
    
                    $notification['description'] =$message;
    
                    $notification['type'] = 'add_update';
                    $notification['image_path'] = $image_path;
                    NotificationModel::create($notification);
                }
                Notification::send(null, new SendPushNotification($title, $message,$image_path, $fcmTokens));

              
            }




            return Response::respondSuccess('success');
        } catch (\Exception $e) {
            report($e);
            return redirect()->back()->with('error', 'Something goes wrong while sending notification.');
        }
    }
}
