<?php



namespace App\Http\Controllers\Api;
use App\Http\Responses\Response;
use App\actors;
use App\appointment;
use App\studio;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use DateTime;

class HomeController extends Controller

{



    public $successStatus = 200;

 ///////////////////////////////company////////////////////////////////////////

    public function create_company(Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
         $user = User::where('username', $request->username)->first();
        if (!isset($user)) {
            $use=new User();
            $use->first_name=$request->name;
            $use->personal_email=$request->personal_email;
            $use->password=Hash::make($request->password);
            $use->mobile_number=$request->mobile_number;
            $use->phone_number=$request->phone_number;
            $use->username=$request->username;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        } else {
            if ($lang == "en") {
                $data = 'user is exist';
           }
            if ($lang == "ar") {
                $data = 'الزبون  موجود';
            }
        }
        return Response::respondSuccess($data);
        }
   }


    public function update_company($id,Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
            $use= User::find($id);
            $use->first_name=$request->name;
            $use->personal_email=$request->personal_email;
            if(isset($request->password))
            $use->password=Hash::make($request->password);
            $use->mobile_number=$request->mobile_number;
            $use->phone_number=$request->phone_number;
            $use->username=$request->username;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }

        return Response::respondSuccess($data);
        }
   }
      public function list_company(Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $company=User::select('id','first_name as name','username','personal_email','mobile_number','phone_number')->get();
          return Response::respondSuccess($company);
    }
      public function edit_company($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $User=User::where('id',$id)->select('id','first_name as name','username','personal_email','mobile_number','phone_number')->first();
          return Response::respondSuccess($User);
    }
 
       public function delete_company($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          User::where('id',$id)->delete();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        return Response::respondSuccess($data);

    }   
    ///////////////////////////////end company////////////////////////////////////////
 
 
 
 
 
 ///////////////////////////////actors////////////////////////////////////////

    public function create_actors(Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
             $actors = actors::where('name', $request->first_name)->where('nickname', $request->last_name)->first();
        if (!isset($actors)) {
            $use=new actors();
            $use->name=$request->first_name;
            $use->nickname=$request->last_name;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        } else {
            if ($lang == "en") {
                $data = 'actors is exist';
           }
            if ($lang == "ar") {
                $data = 'الممثل  موجود';
            }
        }            
            

        return Response::respondSuccess($data);
        }
   }


    public function update_actors($id,Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
            $use= actors::find($id);
            $use->name=$request->first_name;
            $use->nickname=$request->last_name;
            $use->status=$request->status;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }

        return Response::respondSuccess($data);
        }
   }
      public function list_actors(Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
            $actors = actors::select('id','name','nickname','status');


        if ($request->withTrashed == 'no') {

            $actors = $actors->where('status',1)->get();

        }  if ($request->withTrashed == 'yes') {


            $actors = $actors->get();

        }
          
          
          return Response::respondSuccess($actors);
    }
      public function edit_actors($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $actors=actors::where('id',$id)->first();
          return Response::respondSuccess($actors);
    }
 
       public function delete_actors($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          actors::where('id',$id)->delete();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        return Response::respondSuccess($data);

    }   
    ///////////////////////////////end actors////////////////////////////////////////
 
 
  
 ///////////////////////////////studio////////////////////////////////////////

    public function create_studio(Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
              $studio = studio::where('company_id', $request->company_id)->where('name', $request->name)->first();
        if (!isset($studio)) {
            $use=new studio();
            $use->company_id=$request->company_id;
            $use->name=$request->name;
            $use->code=$request->code;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        } else {
            if ($lang == "en") {
                $data = 'studio is exist';
           }
            if ($lang == "ar") {
                $data = 'الاستديو  موجود';
            }
        }  
        return Response::respondSuccess($data);
        }
   }


    public function update_studio($id,Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
            $use= studio::find($id);
            $use->company_id=$request->company_id;
            $use->name=$request->name;
            $use->code=$request->code;
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }

        return Response::respondSuccess($data);
        }
   }

      public function edit_studio($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $studio=studio::where('id',$id)->first();
          return Response::respondSuccess($studio);
    }

      public function list_studio(Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $studio=studio::join('users','studio.company_id','users.id')
          ->select('studio.*','users.first_name as company_name')
          ->get();
          return Response::respondSuccess($studio);
    }

      public function company_groupby_studio(Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $arr=['arr'=>[]];
          $User=User::get();
          foreach($User as $us)
          {
              $studio=studio::where('company_id',$us->id)->get();
              array_push($arr['arr'],[
                  "company_id"=>$us->id,
                  "name"=>$us->first_name,
                  "username"=>$us->username,
                  "mobile_number"=>$us->mobile_number,
                  "phone_number"=>$us->phone_number,
                  "studio"=>$studio,
                  
                  ]);
          }
          return Response::respondSuccess($arr['arr']);
    }    
    
      public function company_studio($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
           $studio=studio::join('users','studio.company_id','users.id')
          ->select('studio.*','users.first_name as company_name')
          ->where('company_id',$id)
          ->get();       
        
          return Response::respondSuccess($studio);
    } 
       public function delete_studio($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          studio::where('id',$id)->delete();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        return Response::respondSuccess($data);

    }   
    ///////////////////////////////end studio////////////////////////////////////////
    
    
    
  ///////////////////////////////appointment////////////////////////////////////////

    public function create_appointment(Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
            $data = $request->all;

        $data['time_in'] = Carbon::parse($request->time_in,'Asia/Damascus')->setTimezone('UTC')->format('Y-m-d H:i:s');

        $data['time_out'] = Carbon::parse($request->time_out,'Asia/Damascus')->setTimezone('UTC')->format('Y-m-d H:i:s');          
              
              
              
        if($data['time_in'] == $data['time_out'])
        {
           if ($lang == "en") {
                $data='The end time of the appointment must be greater than the start time of the appointment';
            }
            if ($lang == "ar") {
                $data='وقت نهاية الموعد يجب ان يكون اكبر من وقت بداية موعد';
            }
                        return Response::respondError($data);


        }

        $studiost = Appointment::where('studio_id', $request->studio_id)->where('time_in',$request->time_in)->first();
        if(isset($studiost))
        {
           if ($lang == "en") {
                $data='There is an appointment already available at the same time and studio';
            }
            if ($lang == "ar") {
                $data='يوجد موعد موجود مسبقا بنفس الوقت ونفس الاستديو';
            }
                        return Response::respondError($data);
        }
            $use=new appointment();
            $use->company_id=$request->company_id;
            $use->actors_id=$request->actors_id;
            $use->studio_id=$request->studio_id;
            $use->date=$request->date;
            $use->time_in=$data['time_in'];
            $use->time_out=$data['time_out'];
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }

        return Response::respondSuccess($data);
        }
   }


    public function update_appointment($id,Request $request)
    {
      $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
              
         
        $data['time_in'] = Carbon::parse($request->time_in,'Asia/Damascus')->setTimezone('UTC')->format('Y-m-d H:i:s');

        $data['time_out'] = Carbon::parse($request->time_out,'Asia/Damascus')->setTimezone('UTC')->format('Y-m-d H:i:s');          
              
                   
            $use= appointment::find($id);
            $use->company_id=$request->company_id;
            $use->actors_id=$request->actors_id;
            $use->studio_id=$request->studio_id;
            $use->date=$request->date;
            $use->time_in=$data['time_in'];
            $use->time_out=$data['time_out'];
            $use->save();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }

        return Response::respondSuccess($data);
        }
   }

      public function edit_appointment($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $sappointmen=appointment::where('id',$id)->first();
          return Response::respondSuccess($appointmen);
    }

      public function list_appointment(Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $appointment=appointment::get();
          $arr=['arr'=>[]];
          foreach($appointment as $us)
          {
              $studio=studio::where('id',$us->studio_id)->first();
              $actors=actors::where('id',$us->actors_id)->first();
              $company=User::where('id',$us->company_id)->select('id','first_name as name','username','personal_email','mobile_number','phone_number')->first();
              array_push($arr['arr'],[
                  "id"=>$us->id,
                  "date"=>$us->date,
                  "time_in"=>$us->time_in,
                  "time_out"=>$us->time_out,
                  "actors"=>$actors,
                  "studio"=>$studio,
                  "company"=>$company,
                  
                  ]);
          }
          return Response::respondSuccess($arr['arr']);
    }

      public function company_appointment($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          $appointment=appointment::where('company_id',$id)->get();
          $arr=['arr'=>[]];
          foreach($appointment as $us)
          {
              $studio=studio::where('id',$us->studio_id)->first();
              $actors=actors::where('id',$us->actors_id)->first();
              $company=User::where('id',$us->company_id)->select('id','first_name as name','username','personal_email','mobile_number','phone_number')->first();
              array_push($arr['arr'],[
                  "id"=>$us->id,
                  "date"=>$us->date,
                  "time_in"=>$us->time_in,
                  "time_out"=>$us->time_out,
                  "actors"=>$actors,
                  "studio"=>$studio,
                  "company"=>$company,
                  
                  ]);
          }
          return Response::respondSuccess($arr['arr']);
    }    

       public function delete_appointment($id,Request $request)
    {
       $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
          appointment::where('id',$id)->delete();
            if ($lang == "en") {
                $data='success';
            }
            if ($lang == "ar") {
                $data='تمت العملية بنجاح';
            }
        return Response::respondSuccess($data);

    }   
    ///////////////////////////////end appointment////////////////////////////////////////
    
       
    
     public function start_auth(Request $request)
    {
           $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
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
              
               $user = User::where('id', Auth::guard('api')->user()->id)->select('id','first_name as name','username','personal_email','mobile_number','phone_number')->first();
                      return Response::respondSuccess($user);

          }
    }
       
    public function login_user(Request $request)
    {
                       

        $lang = $request->header('lang');
        if (!isset($lang)) {
            $lang = "en";
        }
        $mob = "/[0-9]{10}$/";
        if ($lang == "ar") {
            if (!isset($request->password)) {
                return Response::respondError('حقل كلمة السر مطلوب');
            }
            if (!isset($request->username)) {
                return Response::respondError('حقل اسم المستخدم مطلوب');
            }
        }
        if ($lang == "en") {
            if (!isset($request->password)) {
                return Response::respondError('The field "password" is required ');
            }
            if (!isset($request->username)) {
                return Response::respondError('The field "username" is required ');
            }
        }
        $user = User::where('username', $request->username)->first();
        if (isset($user)) {
           if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $driver_data = [
                        "id" => $user->id,
                        "first_name" => $user->first_name,
                        "last_name" => $user->last_name,
                        "username" => $user->username,
                        "mobile" => $user->mobile_number,
                    ];
                    $toBeAddedData = [
                        'token' => $token,
                        'user' => $driver_data,
                    ];

        return Response::respondSuccess($toBeAddedData);
            } else {
                if ($lang == "en") {
                    $message = "Password mismatch";
                }
                if ($lang == "ar") {
                    $message = "كلمة المرور غير متطابقة";
                }
                return Response::respondError($message);
            }
        } else {
            if ($lang == "en") {
                $message = 'user does not exist';
           }
            if ($lang == "ar") {
                $message = 'الزبون غير موجود';
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



  

    public function upload($file)

    {

        $extension = $file->getClientOriginalExtension();

        $sha1 = sha1($file->getClientOriginalName());

        $filename = date('Y-m-d-h-i-s') . "_" . $sha1 . "." . $extension;

        $path = public_path('../storage/uploads/actor/files/');

        $file->move($path, $filename);

        return '../storage/uploads/actor/files/' . $filename;

    }

    public function paginate($items, $perPage , $page, $options = [])

    {

        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);

        $items = $items instanceof Collection ? $items : Collection::make($items);

        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);

    }



}

