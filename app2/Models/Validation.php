<?php

namespace App\Models;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Validation extends Model implements HasMedia
{
    public $guarded = []; 
    use HasFactory,HasMediaTrait,SoftDeletes;
    protected $table ="validations";


    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }

    public function type()
    {
        return $this->belongsTo('App\Models\ValidationType','type_id');
    }



    public function provider()
    {
        return $this->belongsTo('App\Models\Provider','provider_id');
    }



    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }
}
