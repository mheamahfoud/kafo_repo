<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class SecretInfo extends Model 
{
    public $guarded = []; 
    use HasFactory;
    protected $table ="secret_info";

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

    public function provider()
    {
        return $this->belongsTo('App\Models\Provider','provider_id');
    }

    public function relation()
    {
        return $this->belongsTo('App\Models\Relation','relation_id');
    }

}
