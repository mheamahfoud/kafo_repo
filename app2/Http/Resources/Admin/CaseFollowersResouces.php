<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseFollowersResouces extends JsonResource
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
            'download_url' => count( $this->donor->media)>0 ?  $this->donor->media[0]['download_url'] :'',
            'image_url' => count( $this->donor->media)>0 ?  $this->donor->media[0]['full_url'] :'',
            'display_name' => count( $this->donor->media)>0 ?  $this->donor->media[0]['display_name'] :'',
            'full_name' => $this->donor->user->full_name ,
            'following_date'=>$this->created_at,
     
        ];
    }
}
