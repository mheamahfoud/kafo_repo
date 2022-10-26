<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Carbon\Carbon;
class RequestWallet  extends Model implements HasMedia
{    
    use HasFactory,HasMediaTrait;
    protected $table ="requests";
    public $guarded = [];


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



 
    public function donor()
    {
       
        return $this->belongsTo('App\Models\Donor','donor_id')->withTrashed();
    }
    
       public function case()
    {
        return $this->belongsTo('App\Models\CaseDonation','case_id');
    }
}
