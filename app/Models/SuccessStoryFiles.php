<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Components\Core\Utilities\Helpers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
class SuccessStoryFiles extends Model
{
    public $guarded = [];
    use HasFactory;
    protected $table ="success_story_files";


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



    public function story()
    {
        return $this->belongsTo('App\Models\SuccessStory','story_id');
    }

    public function saveFiles($files,$story_id)
    {
        foreach($files as $file)
        {
            Storage::disk('successStory_files')->makeDirectory($story_id);
            list($type, $data_image) = explode(';', $file['file']);
            list(, $data_image) = explode(',', $data_image);
            $data_image = base64_decode($data_image);
            $filename=Helpers::getFileName($type);
            $path = config('constants.successStories_upload_folder').'/'. $story_id.'/'. $filename;
            file_put_contents(public_path($path), $data_image);
             SuccessStoryFiles::create([
                'story_id' => $story_id,
                'image_path' => $path,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
              ]);
        }
    }
    
}
