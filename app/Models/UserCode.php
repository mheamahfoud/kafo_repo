<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class UserCode extends Model 
{
    public $guarded = []; 
    use HasFactory;
    protected $table ="user_codes";


    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }


    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }
}
