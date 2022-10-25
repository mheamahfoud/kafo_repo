<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Services\FCMService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\Models\Media;
use App\Http\Responses\Response;
use Notification;
use Illuminate\Support\Facades\Auth;
use App\Notifications\SendPushNotification;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function index()

    {

        return view('app');
    }

    public function show($id)
    {
        $media = Media::find($id);

        $file = explode('_', $media->file_name);

        return response()->download($media->getPath(), $file[1]);
    }

    public function login()

    {

        //    echo 'jghgh';
        //  die();
        return view('auth.login');
    }



    public function setFcmToken(Request $request)
    {
            User::find(Auth::guard('api')->user()->id)->update([
                'fcm_token' => $request->token,
            ]);
            return Response::respondSuccess('success');
    }


    public function notification(Request $request){
        $request->validate([
            'title'=>'required',
            'message'=>'required'
        ]);
    
        try{
            $fcmTokens = User::whereNotNull('fcm_token')->pluck('fcm_token')->toArray();
    
            Notification::send(null,new SendPushNotification('ikuyiuyiuy','ikuiuiyu',$fcmTokens));
    
    
    
           
            return Response::respondSuccess('success');
    
        }catch(\Exception $e){
            report($e);
            return redirect()->back()->with('error','Something goes wrong while sending notification.');
        }
    }
    function getDevice()
    {
        if (preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]))
            return 'mobile';
        else
            return 'computer';
    }
    
}
