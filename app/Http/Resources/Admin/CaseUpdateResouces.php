<?php

namespace App\Http\Resources\Admin;
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
            'views_count'=>$this->views_count,
            'description'=>$this->description,
            'ar_description'=>$this->ar_description,
            'download_url' => count($this->media)>0 ?  $this->media[0]['download_url'] :'',
            'image_url' => count($this->media)>0 ?  $this->media[0]['full_url'] :'',
            'display_name' => count($this->media)>0 ?  $this->media[0]['display_name'] :'',
            'created_at' => $this->created_at ,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
            'is_active'=>$this->is_active
        ];
    }
}
