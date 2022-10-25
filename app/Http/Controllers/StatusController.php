<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Responses\Response;
use App\Models\Status;
use Lang;
use App\Models\User;
use App\Models\Media;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class StatusController extends Controller
{
    //
    public function index()
    {
        if (Auth::guard('api')->check()) {
        
            return Response::respondSuccess(Status::select('id as value','name as text')->get());
        }
        else{
            
            return Response::respondErrorAuthorize(Lang::get('site.unauthenticate'));
        }
    }


    public function changeLanguage(Request $request){
        setcookie("current_language", $request->lang, time() + (86400 * 30), "/"); // 86400 = 1 day
    }


    public function checkAuth(Request $request){
      
        if (Auth::guard('api')->check()) {
            $lang = $request->cookie('current_language');
            $user=Auth::guard('api')->user();
            $driver_data = [
                "id" =>$user->id,
                "is_active" =>$user->is_active,
                "full_name" => $user->full_name,
               // "admin_id" => $user->admin->id,
                "user_name" => $user->user_name,
            ];
            $toBeAddedData = [
                'lang' => $lang,
                'user' => $user,
               // 'roles'=>$user->roles
            ];
              return Response::respondSuccess($toBeAddedData);
     
 
        }
        else{
            return Response::respondErrorAuthorize(__('site.unauthenticate',[],$request->cookie('current_language')));
        }
    }



    public function delete(Request $request)
    {   
        if(isset($request->file_name)){
            File::delete(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$request->file_name));
        }
        else{
            //echo $request->id;
          /*  $query = DB::table('media')->where('id', $request->id);
            if ($query->count() > 0){
                $media=$query->first();
                File::delete(public_path('uploads/'.$media->collection_name.'/'.$media->id.'/'.$media->file_name));
                $query->delete();
            }*/
        }
        
      
        return Response::respondSuccess('success');
    }
}
