<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laratrust\Traits\LaratrustUserTrait;
use Laravel\Passport\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
//use Laratrust\Traits\LaratrustUserTrait;

class User extends Authenticatable implements HasMedia

{
    use SoftDeletes;
    use HasRoles;
    use HasMediaTrait;
    use HasApiTokens, HasFactory, Notifiable;

    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public $guard_name = 'api';

    
    protected $date = [
        'deleted_at',
    ];
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'full_name',
        'email',
        'password',
        'mobile',
        'is_active',
        'fcm_token'
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'email_verified_at',
        'email_verfied',
        'password',
        'firebase_token',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }







    // public function client()
    // {
    //     return $this->hasOne('App\Models\Client');
    // }



    // public function user()
    // {
    //     return $this->hasOne('App\Models\User');
    // }



    public function admin()
    {
        return $this->hasOne('App\Models\Admin');
    }
     /**
     * logs last login date of the user.
     */
    public function logLastLogin()
    {
        $this->last_login = $this->freshTimestamp();
        $this->save();
    }
}
