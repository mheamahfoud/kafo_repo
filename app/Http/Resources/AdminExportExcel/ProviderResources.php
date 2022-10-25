<?php

namespace App\Http\Resources\AdminExportExcel;
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
         //   'image_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :'',
                    'image_url'=>    count( $this->media)>0 ?  $this->media[0]->getPath() :'',
            'description' => $this->description ,
           'created_at'=>$this->created_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
            'related_cases_count'=>count($this->cases),
            'related_validation_count'=>count($this->validations),
           // 'media'=>$this->media,
           //'medias' =>  array_column($this->media->toArray(), 'full_url')

        ];
    }
}
