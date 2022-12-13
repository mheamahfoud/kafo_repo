<?php

namespace App\Http\Resources\Admin;
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
            'image_path' => is_null($this->image_path)?null: env('APP_URL').'/'. $this->image_path,
            //'download_url' => count( $this->media)>0 ?  $this->media[0]['download_url'] :'',
            //'image_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :'',
            'description'=>$this->description
,            'created_at'=>$this->created_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
            'views_count'=>$this->views_count,
            'is_active'=>$this->is_active,
        ];
    }
}
