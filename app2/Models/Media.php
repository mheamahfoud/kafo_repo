<?php

namespace App\Models;

use Spatie\MediaLibrary\Models\Media as BaseMedia;
use Carbon\Carbon;
class Media extends BaseMedia
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'disk', 'manipulations', 'name', 'order_column', 'responsive_images', 'size', 'custom_properties'
    ];

    protected $appends = ['full_url', 'download_url', 'display_name'];


    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    /**
     * Get full url.
     */
 public function getFullUrlAttribute()
    {
        $x=str_replace("uploads","public/uploads",$this->getFullUrl());
        return $x;
    }

    /**
     * Get download link.
     */
    public function getDownloadUrlAttribute()
    {
        return action('MediaController@show', $this->id);
    }

    /**
     * Get display name for the media.
     */
    public function getDisplayNameAttribute()
    {
        $data = explode('_', $this->file_name);
        return $data[0];
    }
}
