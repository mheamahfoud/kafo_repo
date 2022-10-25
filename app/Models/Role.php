<?php

namespace App\Models;

use Laratrust\Models\LaratrustRole;
use Carbon\Carbon;
class Role extends LaratrustRole
{
    public $guarded = [];

    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
}
