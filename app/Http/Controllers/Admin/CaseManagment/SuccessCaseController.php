<?php

namespace App\Http\Controllers\Admin\CaseManagment;

use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Models\CaseDonation;
use App\Models\SuccessStory;
use App\Models\SuccessStoryFiles;
use App\Models\Donor;
use Spatie\Permission\Models\Role;
use App\Http\Resources\Admin\SuccessStoryResouces;
use Lang;
use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Illuminate\Support\Facades\File;
class SuccessCaseController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request)
    {
        $lang=$request->cookie('current_language');
      
            $query = SuccessStory::with(['case','media'=> function ($q) {
                $q->where('collection_name', 'Cover_Photo');}]);
            $cases = $query->get();;
            $data=[
                'data' => SuccessStoryResouces::collection($cases),
                'total' => count($cases),
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
        $lang=$request->cookie('current_language');

            $validate = validator($request->all(), [
                    'case_id' => 'required|unique:success_cases,case_id',
                    'description' => 'required',
                    'ar_description' => 'required',
                    'cover_photo' => 'required',
                    
                   // 'cover_photo' => 'required',
                ],
                [
                    'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
                    'unique'    =>  $lang == 'en' ? 'case  is already used' : 'الحالة تم استخدامها من قبل' ,
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
        

            try {
                DB::beginTransaction();
                $input['created_by'] = Auth::guard('api')->user()->id;
                $input['created_at']=Carbon::now();
                $input['case_id']=$request->case_id;
                $input['description']=$request->description;
                $input['ar_description']=$request->ar_description;
                $input['vedio_url']=$request->vedio_url;
                $success_story = SuccessStory::create($input);

                $image_path ="";
                if (isset($request->cover_photo)) {
                    SuccessStory::saveCoverPhoto($request->cover_photo,$success_story);
                }
                $this->addMultiMedias($request->images,$success_story , 'images_Success_stories' ,[]);
                   $success_story->update($input);
                 ///  SuccessStoryFiles::saveFiles($request->files,$success_story->id);
                DB::commit();
                $case_media_cover = SuccessStory::where('id', $success_story->id )->with( ['case'])->first();
             //   $success_story->setAttribute('image_url',count($case_media_cover->media)> 0 ? $case_media_cover->media[0]['full_url']: '' );
               // $success_story->setAttribute('display_name',count($case_media_cover->media)> 0 ? $case_media_cover->media[0]['display_name']: '' );
                $success_story->setAttribute('is_active',1 );
                $success_story->setAttribute('case_name', $case_media_cover->name);
                $success_story->setAttribute('views_count', $case_media_cover->views_count);
                unset($input['created_by']);
                $success_story->setAttribute('created_by', Auth::guard('api')->user()->full_name);

                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($success_story);

            }
            catch (Exception $e) {
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
        $lang=$request->cookie('current_language');
     
            
        $success_story = SuccessStory::with(['media'=> function ($q) {
            $q->where('collection_name', 'images_Success_stories');}])->find($request->id);
                unset($case->created_at);
                unset($case->created_by);
                unset($case->updated_by);
                unset($case->id);
                unset($case->status);
                unset($case->updated_at);
                unset($case->updated_by);

                return Response::respondSuccess($success_story);
        
    }

   
   


    public function update(Request $request, $id)
    {
        $lang=$request->cookie('current_language');
  
         
            $success_story = SuccessStory::find($id);
            if($success_story != null){
                $validate = validator($request->all(), [
                    'case_id' => 'required|unique:success_cases,case_id,'. $success_story->id,
                    'description' => 'required',
                    'ar_description' => 'required',
                    'cover_photo' => 'required',
                ],
                [
                    'required'  => Lang::get('site.required', ['name' => ':attribute'], $lang),
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
            }
            try {
                if($success_story!=  null){
                    DB::beginTransaction();
                 //  $input = $request->all();
                    $input['updated_at'] = Carbon::now();
                    $input['case_id']=$request->case_id;
                    $input['ar_description']=$request->ar_description;
                    $input['description']=$request->description;
                    $input['vedio_url']=$request->vedio_url;

                    if (isset($request->cover_photo) && $request->cover_photo!='old_files') {
                        SuccessStory::saveCoverPhoto($request->cover_photo,$success_story);
                    }
                    $success_story->update($input);
                  //  SuccessStoryFiles::saveFiles($request->new_files,$success_story->id);
                   
                  $this->addMultiMedias($request->images,$success_story , 'images_Success_stories',$request->delete_files );
               /// File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
                    DB::commit();
                   // $case_media_cover = SuccessStory::where('id', $success_story->id )->with( ['media'=> function ($q) {
                     //   $q->where('collection_name', 'Cover_Photo');}])->first();

                 //   $success_story->setAttribute('image_url',count($case_media_cover->media)> 0 ? $case_media_cover->media[0]['full_url']: '' );
                ///    $success_story->setAttribute('display_name',count($case_media_cover->media)> 0 ? $case_media_cover->media[0]['display_name']: '' );
                 
                    $success_story->setAttribute('case_name', $success_story->case->name);
                    $success_story->setAttribute('created_by', $success_story->creator->full_name);

                    


                    
                   
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($success_story);
                }
                else{
                    $message = __('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }

    }



 /**
     * 
     * show Case Details
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
        $lang=$request->cookie('current_language');

            
            $auccess_story = SuccessStory::with(['media','creator','case'])->find($request->id);
                return Response::respondSuccess($auccess_story);
        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function activateDeactive(Request $request)
    {
        $lang=$request->cookie('current_language');
   
            try{
                $success_story = SuccessStory::find($request->id);
                if(!is_null($success_story)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$success_story->is_active;
                    $success_story->update($data);
                 
                    DB::commit();
                    $message = Lang::get('site.success_update',[],$lang);
                    return Response::respondSuccess($success_story);
                }
                else{
                    $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }
     
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
        
    }



  

    
    
}