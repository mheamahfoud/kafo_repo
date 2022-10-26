<?php

namespace App\Models;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Provider extends Model implements HasMedia
{
    public $guarded = [];
    use HasFactory,HasMediaTrait;
    protected $table ="providers";

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


    public function validations()
    {
        return $this->hasMany('App\Models\Validation','provider_id');
    }

    public function cases()
    {
        return $this->hasMany('App\Models\SecretInfo','provider_id');
    }
}
