<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class NotificationModel extends Model
{
    protected $table ="notifications";
    public $guarded = [];

  /*  public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }*/

    public function receiver()
    {
        return $this->belongsTo('App\Models\User', 'receiver_id');
    }
    public function sender()
    {
        return $this->belongsTo('App\Models\User', 'sender_id');
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }
}
