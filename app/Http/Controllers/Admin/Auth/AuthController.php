<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Responses\Response;
use App\Models\User;
use App\Models\Employee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{




    public function login_user(Request $request)
    {

        $lang=$request->cookie('current_language');
        if (!isset($lang)) {
            $lang = "en";
        }

        $mob = "/[0-9]{10}$/";


        if ($lang == "ar") {
            if (!isset($request->password)) {
                return Response::respondError('حقل كلمة السر مطلوب');
            }
            if (!isset($request->userName)) {
                return Response::respondError('حقل اسم المستخدم مطلوب');
            }
        }
        if ($lang == "en") {
            if (!isset($request->password)) {
                return Response::respondError('The field "password" is required ');
            }

            if (!isset($request->userName)) {
                return Response::respondError('The field "User name" is required ');
            }
        }
        $user = User::where('user_name', $request->userName)->with('admin')->first();
         
        if(!$user->is_active){
            if ($lang == "ar") {
               return Response::respondError('المستخدم غير فعال');
               
            }
            if ($lang == "en") {
                return Response::respondError('User Not Active');
                
            }
        }
       // echo json_encode( $user);
       // die();
        if (isset($user) && isset($user->admin)) { 
           if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('authToken')->accessToken;
                $driver_data = [
                            "id" => $user->id,
                            "is_active" => $user->is_active,
                            "full_name" => $user->full_name,
                           // "admin_id" => $user->admin->id,
                            "mobile" => $user->mobile_number,
                        ];
                        $toBeAddedData = [
                            'token' => $token,
                            'user' => $driver_data,
                           // 'roles'=>$user->roles
                        ];
                return Response::respondSuccess($toBeAddedData);


            } 
            else {
                if ($lang == "en") {
                    $message = "Password mismatch";
                }
                if ($lang == "ar") {
                    $message = "كلمة المرور غير متطابقة";
                }

                return Response::respondError($message);

            }
        } 
        else {
            if ($lang == "en") {
                $message = 'user does not exist';
            }

            if ($lang == "ar") {
                $message = 'المستخدم غير موجود';
            }

            return Response::respondError($message);
        }



    }



    public function logout_user(Request $request)
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
                $data='success';
            }

            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
            return Response::respondSuccess($data);
        }
    }
}
