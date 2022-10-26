<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Carbon\Carbon;
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


  
   
    
    
    
}
