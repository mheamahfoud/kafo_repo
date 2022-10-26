<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class ValidationType extends Model
{
    public $guarded = [];
    use HasFactory;
    protected $table ="validation_type";
    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    // protected $fillable = [
    //     'user_id',
        
    // ];

    //     /**
    //  * driver user
    //  */
    // public function user()
    // {
    //     return $this->belongsTo('App\Models\User');
    // }

    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }


    public function validations()
    {
        return $this->hasMany('App\Models\Validation','type_id');
    }
}
