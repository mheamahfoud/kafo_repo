<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ValidationResouces extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
     
        return [
            'id' => $this->id,
            'name' => $this->name ,
            'provider_download_url' =>$this->provider != null ? count( $this->provider->media)>0 ?  $this->provider->media[0]['download_url'] :'':'',
            'provider_image_url' =>$this->provider != null ? count( $this->provider->media)>0 ?  $this->provider->media[0]['full_url'] :'':'', 
            'type_name'=>$this->type->name,
            'provider_name'=>$this->provider != null ? $this->provider->name :'',
            'description'=>$this->description,
            'status'=>$this->status,
            'is_active'=>$this->is_active,
        ];
    }
}
