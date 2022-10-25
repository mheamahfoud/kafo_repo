<?php

namespace App\Http\Resources\AdminExportExcel;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessStoryResouces extends JsonResource
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
            'case_name' => !is_null($this->case) ? $this->case->name : null,
           // 'download_url' => count( $this->media)>0 ?  $this->media[0]['download_url'] :'',
            'image_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :'',
            
            'description'=>$this->description,
            'views_count'=>$this->views_count,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
            'created_at'=>$this->created_at,
           
           
            //'is_active'=>$this->is_active,
        ];
    }
}
