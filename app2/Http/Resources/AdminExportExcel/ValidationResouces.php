<?php

namespace App\Http\Resources\AdminExportExcel;
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
            'type_name'=>$this->type->name,
            'description'=>$this->description,
            'status'=>$this->status,
            'provider_name'=>$this->provider != null ? $this->provider->name :'',
           'provider_image_url' =>$this->provider != null ? count( $this->provider->media)>0 ?  $this->provider->media[0]['full_url'] :'':'', 
        ];
    }
}
