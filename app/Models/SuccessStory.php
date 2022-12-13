<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Carbon\Carbon;
use App\Components\Core\Utilities\Helpers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
class SuccessStory extends Model implements HasMedia
{
    public $guarded = [];
    use HasFactory,HasMediaTrait;
    protected $table ="success_cases";


    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }



     /*
     get validation of case

     */
    public function case()
    {
        return $this->belongsTo('App\Models\CaseDonation','case_id');
    }


    public function files()
    {
        return $this->hasMany('App\Models\SuccessStoryFiles','story_id');
    }
   
 
    public function saveCoverPhoto($cover_photo,$success_story)
    {
        if (File::exists(public_path($success_story->image_path))) {
            File::delete(public_path($success_story->image_path));
        }
        Storage::disk('successStory_files')->makeDirectory($success_story->id);
        list($type, $data_image) = explode(';', $cover_photo);
        list(, $data_image) = explode(',', $data_image);
        $data_image = base64_decode($data_image);
        $filename=Helpers::getFileName($type);
        $path = config('constants.successStories_upload_folder').'/'. $success_story->id.'/'. $filename;
        file_put_contents(public_path($path), $data_image);
        $data['image_path'] = $path;
        $success_story->update($data);
        
    }
    
}
