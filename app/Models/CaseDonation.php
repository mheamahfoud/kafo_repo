<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Support\Facades\Auth;
use App\Models\Donor;
use Carbon\Carbon;
class CaseDonation extends Model implements HasMedia
{
    public $guarded = [];
    use HasFactory,HasMediaTrait;
    protected $table ="cases";
  
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
    public function updator()
    {
        return $this->belongsTo('App\Models\User','updated_by');
    }

    
     /*
     get validation of case

     */
    public function validations()
    {
        return $this->hasMany('App\Models\Validation','case_id');
    }


      /*
     get cost  of case

     */
    public function costs()
    {
        return $this->hasMany('App\Models\Cost','case_id');
    }
   
      /*
     get secret info  of case

     */

    public function secretInfo()
    {
        return $this->belongsTo('App\Models\SecretInfo');
    }

    
    public function updates()
    {
        return $this->hasMany('App\Models\CaseUpdate','case_id');
    }


    public function donors()
    {
        return $this->hasMany('App\Models\CaseDonor','case_id');
    }

    public function followers()
    {
        return $this->hasMany('App\Models\CaseFollower','case_id');
    }
    
        /*
     get secret info  of case

     */
    public function follower()
    {
        $donor_id= Donor::where('user_id', Auth::guard('api')->user()->id )->first()->id; 
        
        return $this->hasOne('App\Models\CaseFollower','case_id')->where('donor_id', $donor_id);
    }

    public function stories()
    {
        return $this->hasMany('App\Models\SuccessStory','case_id');
    }
    public function saveCoverPhoto($cover_photo,$case)
    {
        if (File::exists(public_path($case->image_path))) {
            File::delete(public_path($case->image_path));
        }
        Storage::disk('cases_files')->makeDirectory($case->id);
        list($type, $data_image) = explode(';', $cover_photo);
        list(, $data_image) = explode(',', $data_image);
        $data_image = base64_decode($data_image);
        $filename=Helpers::getFileName($type);
        $path = config('constants.cases_upload_folder').'/'. $case->id.'/'. $filename;
        file_put_contents(public_path($path), $data_image);
        $data['image_path'] = $path;
        $success_story->update($data);
        
    }

}
