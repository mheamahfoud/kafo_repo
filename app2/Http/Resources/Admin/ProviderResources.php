<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProviderResources extends JsonResource
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
            'ar_name' => $this->ar_name ,
            'description' => $this->description ,
            'ar_description' => $this->ar_description ,
            //'image_path' => $this->media-> ,
            'image_path' => $this->image_path,
         //   'display_name' => $this->image_path,
            
            'is_active'=>$this->is_active
,            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
          
            'related_cases_count'=>count($this->cases),
            'related_validation_count'=>count($this->validations),
           // 'media'=>$this->media,
           //'medias' =>  array_column($this->media->toArray(), 'full_url')

        ];
    }
}
