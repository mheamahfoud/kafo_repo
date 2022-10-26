<?php

namespace App\Http\Resources\AdminExportExcel;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseUpdateResouces extends JsonResource
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
            'id'=>$this->id,
            'description'=>$this->description,
            'image_url' => count($this->media)>0 ?  $this->media[0]['full_url'] :'',
            'created_at' => $this->created_at ,
            'views_count'=>$this->views_count,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
  
        ];
    }
}
