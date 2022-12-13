<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationsResources extends JsonResource
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
            'receiver' => $this->receiver->full_name,
            'title' => $this->title,
            'body' => $this->description ,
           'created_at'=>$this->created_at,

        ];
    }
}
