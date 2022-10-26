<?php

namespace App\Models;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class CaseUpdate extends Model  implements HasMedia
{
    public $guarded = []; 
    use HasFactory,HasMediaTrait;
    protected $table ="case_updates";


    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }


    public function case()
    {
        return $this->belongsTo('App\Models\CaseDonation','case_id');
    }
    
    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }

}
