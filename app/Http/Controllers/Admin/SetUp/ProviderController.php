<?php

namespace App\Http\Controllers\Admin\SetUp;
use App\Models\User;
use App\Components\Core\Utilities\Helpers;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\ProviderResources;
use App\Models\Provider;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Lang;
use File;

class ProviderController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang=$request->cookie('current_language');
           // Provider::all()->each->delete();
           // $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
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
           
           
            $providers = Provider::with( ['creator', 'media','validations','cases'])->get();
            
            $data=[
                'data' => ProviderResources::collection($providers),
                'total' => count($providers),
            ];
            return Response::respondSuccess($data);

           
      
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
        $lang=$request->cookie('current_language');
            $validate = validator($request->all(), [
                    'name' => 'required',
                    'ar_name' => 'required',
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
                $data['name'] = $request->name;
                $data['ar_name'] = $request->ar_name;
                $data['description'] =  $request->description;
                $data['ar_description'] =  $request->ar_description;
                $data['created_at'] = Carbon::now();
                $data['created_by'] = Auth::guard('api')->user()->id;
                $provider = Provider::create($data);
              
                $image_path ="";
             if (isset($request->image)) {
                       Storage::disk('provider_files')->makeDirectory($provider->id);
                        list($type, $data_image) = explode(';', $request->image);
                        list(, $data_image) = explode(',', $data_image);
                        $data_image = base64_decode($data_image);
                        $filename=Helpers::getFileName($type);
                        $path = public_path(config('constants.provider_upload_folder')).'/'. $provider->id.'/'. $filename;
                        file_put_contents($path, $data_image);
                        $image_path=config('constants.provider_upload_folder').'/'.$provider->id.'/'. $filename;
                        $data['image_path'] = $image_path;
                        $provider->update($data);
                }
               
                DB::commit();
                //$driver_media = Provider::where('id', $provider->id )->with( ['media'])->first();
                $provider->setAttribute('created_by', Auth::guard('api')->user()->full_name);
                $provider->setAttribute('is_active', 1);
                $provider->setAttribute('image_path', $image_path);
               /// $provider->setAttribute('image_url',count($driver_media->media)> 0 ? $driver_media->media[0]['full_url']: '' );
                //$provider->setAttribute('display_name',count($driver_media->media)> 0 ? $driver_media->media[0]['display_name']: '' );

               //$driver=Driver::where('id',$driver->id)->with('user:id,name,mobile,email','creator:id,name')->first();

              // $provider->setAttribute('image_url',$image_path);
              // $provider->setAttribute('display_name',$image_path);
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($provider);
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $lang=$request->cookie('current_language');

            $provider = Provider::find($id);
            if(!is_null($provider)){
                    $validate = validator($request->all(), [
                        'name' => 'required',
                        'ar_name' => 'required',
                    ],
                    [
                        'required'  => 'The :attribute field is required.',
                    ]
                );

                if ($validate->fails()) {
                    return Response::respondErrorValidation($validate->errors()->first());
                }
            }
            else{
                $message = __('site.object_not_found',['name'=>__('site.driver',[],$lang)],$lang);
                return Response::respondError($message);
            }
            try {
               // sleep(2);
                $provider = Provider::find($id);
                if(!is_null($provider)){
                    DB::beginTransaction();
                  //  $input = $request->all();
                    $input['updated_at'] = Carbon::now();
                    $input['name'] = $request->name;
                    $input['ar_name'] = $request->ar_name;
                    $input['description'] =  $request->description;
                    $input['ar_description'] =  $request->ar_description;
                  
                  
                //    $this->addMedias($request->medias,$provider , 'provider' ,true );
                    if (isset($request->image)) {
                        if (File::exists(public_path($provider->image_path))) {
                            File::delete(public_path($provider->image_path));
                        }
                        Storage::disk('provider_files')->makeDirectory($provider->id);
                        list($type, $data_image) = explode(';', $request->image);
                        list(, $data_image) = explode(',', $data_image);
                        $data_image = base64_decode($data_image);
                        $filename=Helpers::getFileName($type);
                        $path = public_path('uploads/provider').'/'. $provider->id.'/'. $filename;
                        file_put_contents($path, $data_image);
                        $image_path='uploads/provider/'.$provider->id.'/'. $filename;
                        $input['image_path'] = $image_path;
                        //$provider->setAttribute('image_url',count($driver_media->media)> 0 ? $driver_media->media[0]['full_url']: '' );
                       // $provider->setAttribute('display_name',count($driver_media->media)> 0 ? $driver_media->media[0]['display_name']: '' );
    
                   }
                   $provider->update($input);
                    DB::commit();
                    $provider->created_by= Auth::guard('api')->user()->full_name;
                    $driver_media = Provider::where('id', $provider->id )->with( ['media'])->first();
              
                   /// $provider->setAttribute('image_url',$driver_media->media[0]['full_url'] );
                    return Response::respondSuccess($provider);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }



    public function activateDeactive(Request $request)
    {
        $lang=$request->cookie('current_language');
           
            try{

                $provider = Provider::where('id', $request->id)->with( ['media','validations','cases'])->first() ; Provider::find($request->id);

                if($provider->is_active==1 &&  count($provider->validations)>0)
                {
                    $message = Lang::get('site.provider_related_to_validation',[],$lang);
                    return Response::respondError($message);
                    
                }
                if($provider->is_active==1 &&  count($provider->cases)>0)
                {
                    $message = Lang::get('site.provider_related_to_cases',[],$lang);
                    return Response::respondError($message);
                    
                }
                if(!is_null($provider)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$provider->is_active;
                    $provider->update($data);
                    DB::commit();
                    $provider->created_by= Auth::guard('api')->user()->full_name;
                  //  $provider->setAttribute('display_name',count($provider->media)> 0 ? $provider->media[0]['display_name']: '' );
                  //  $provider->setAttribute('image_url',count($provider->media)> 0 ? $provider->media[0]['full_url']: '' );
                    unset($provider['media']);
                    return Response::respondSuccess($provider);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
     
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
      
    }





    public function providerSelectList(Request $request)
    {
            return Response::respondSuccess(Provider::where('is_active',1)->select('id as value' ,'name as text')->get());
    }


}
