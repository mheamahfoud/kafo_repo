<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class City extends Model
{
    public $guarded = [];
    use HasFactory;
    protected $table ="cities";

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


    
    public function country()
    {
        return $this->belongsTo('App\Models\Country','country_id');
    }
    
    public function donors()
    {
        return $this->hasMany('App\Models\Donor','city_id');
    }
}
