<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    
    /**
     * This function add's medias to the supplied model.
     *
     * @param  $medias
     * @param  $model object, instance of model to which media need to be added
     */
    public function addMedias($medias, $model, $mediaCollectionName)
    {
        if(isset($medias))
        {
            if (!empty($medias) && count($medias)>0  ) {
                //if(is_exist)
                $model->media()->where('collection_name',$mediaCollectionName)->delete();
                foreach ($medias as $key => $file_name) {
                   if (File::exists(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name))) {
                        $model->addMedia(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name))
                            ->toMediaCollection($mediaCollectionName,'media_files');
                            File::delete(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name));
                        }
                }
            }
        }
        else
           $model->media()->where('collection_name',$mediaCollectionName)->delete();
        
         ///  File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
    }


    public function addMultiMedias($medias, $model, $mediaCollectionName,$delted_files)
    {
        if(isset($medias))
        {
            if (!empty($medias) && count($medias)>0  ) {
                //if(is_exist)
                /// $model->media()->where('collection_name',$mediaCollectionName)->delete();
                foreach ($medias as $key => $file_name) {
                   if (File::exists(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name))) {
                        $model->addMedia(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name))
                            ->toMediaCollection($mediaCollectionName,'media_files');
                            File::delete(public_path('uploads/'.config('constants.temp_upload_folder').'/'.$file_name));


                        }
                }
            }
            if (!empty($delted_files) && count($delted_files)>0  ) {
                foreach ($delted_files as $key => $model_id) {
                    $query = DB::table('media')->where('id', $model_id);
                    if ($query->count() > 0){
                        $media=$query->first();
                        File::delete(public_path('uploads/'.$media->collection_name.'/'.$media->id.'/'.$media->file_name));
                        $query->delete();
                    }
                   // $model->media()->where('collection_name',$mediaCollectionName)->delete();
                }
                 
             
            }

        }
        else
           $model->media()->where('collection_name',$mediaCollectionName)->delete();
        
        //   
    }



    public function addSingleMedias($path, $model, $mediaCollectionName)
    {
        if(isset($path))
        {
                //if(is_exist)
                $model->media()->where('collection_name',$mediaCollectionName)->delete();
                if (File::exists($path)) {
                    $model->addMedia($path)
                        ->toMediaCollection($mediaCollectionName,'media_files');
                        File::delete($path);
                    }
     
        }
        else
           $model->media()->where('collection_name',$mediaCollectionName)->delete();
        
         ///  File::cleanDirectory(public_path('uploads/'.config('constants.temp_upload_folder')));
    }
}
