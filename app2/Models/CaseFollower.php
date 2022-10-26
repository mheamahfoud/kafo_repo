<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class CaseFollower extends Model 
{
    public $guarded = []; 
    use HasFactory;
    protected $table ="case_followers";

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

    public function donor()
    {
        return $this->belongsTo('App\Models\Donor','donor_id')->withTrashed();
    }

}
