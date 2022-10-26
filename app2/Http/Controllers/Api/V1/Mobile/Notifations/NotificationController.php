<?php

namespace App\Http\Controllers\Api\V1\Mobile\Notifations;

use App\Http\Responses\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use App\Http\Resources\Mobile\V1\NotificationsResources;
use App\Models\NotificationModel;
use Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Lang;

class NotificationController extends Controller
{
    public function getNotificationsCount(Request $request)
    {
        $lang = $request->header('lang');
        $count = NotificationModel::whereReceiverId(Auth::guard('api')->user()->id)
            ->whereNull('readed_at')
            ->count();
        return Response::respondSuccess($count);
        // return response()->json(['count' => $count]);
    }

    /**
     * get Notifications Content
     *
     * @response  {
     *   "data": [
     *     {
     *       "id": 3344,
     *       "created_ago": "3 months ago",
     *       "title": "Update Task",
     *       "description": "You have new Assgin!",
     *       "type": "Task",
     *       "readed_at": "2021-02-15 08:05:38",
     *       "receiver_id": 8,
     *       "receiver": "Ghofran Jabri",
     *       "sender": "Orwah Habib"
     *     }
     *   ]
     * }
     *
     */

    public function getNotificationsContent(Request $request)
    {

        $lang = $request->header('lang');;
        $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
        $notifications = NotificationModel::with('receiver', 'sender')
            ->whereReceiverId(Auth::guard('api')->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($rowsPerPage);

        $data = [
            'items' => NotificationsResources::collection($notifications),
            'total' => $notifications->total(),
        ];
        return Response::respondSuccess($data);;
    }


    public function readNotifications(Request $request)
    {

        $lang = $request->header('lang');
        $validate = validator(
            $request->all(),
            [
                'notifications_id' => 'required',

            ],
            [
                'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),

            ]
        );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
        try {
            DB::beginTransaction();
            $ids = $request->notifications_id;
            foreach($ids as $id){
                   $notification = NotificationModel::find($id);
                   $notification->readed_at=Carbon::now();
                   $notification->update();
            }
            DB::commit();
            return Response::respondSuccess('success');
        } catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }

        
    }



    /**
     * set Fcm Token
     *
     * @queryParam token required string
     *
     * @response  {
     *   "status": "success"
     * }
     *
     */


    public function setFcmToken(Request $request)
    {
        User::find(Auth::guard('api')->user()->id)->update([
            'fcm_token' => $request->token,
        ]);
        return Response::respondSuccess('success');
    }
}
