<?php

namespace App\Models;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Donor extends Model implements HasMedia
{    use SoftDeletes;
    use HasFactory,HasMediaTrait;
    protected $table ="donors";

    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    protected $fillable = [
        'user_id',
        'birth_date',
        'country_id',
        'city_id',
        'gender_id',
        'secret_name',
        'gender',
        'wallet_id'
        
    ];

     
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }


    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }



    public function city()
    {
        return $this->belongsTo('App\Models\City');
    }




    public function gender()
    {
        return $this->belongsTo('App\Models\Index','gender_id');
    }


    public function wallet()
    {
        return $this->belongsTo('App\Models\Wallet','wallet_id');
    }



    public function donations()
    {
        return $this->hasMany('App\Models\CaseDonor','donor_id');
    }

    

}
