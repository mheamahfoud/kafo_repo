<?php

namespace App\Http\Resources\Mobile\V1;

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
              'icon_path' => is_null($this->image_path)?null: env('APP_URL').'/'. $this->image_path,
            'created_ago' => $this->created_at->diffForHumans(),
            'title' => $this->title,
            'description' => $this->description,
            'type' => $this->type,
            'readed_at' => $this->readed_at,
            'receiver_id' => $this->receiver_id,
            'receiver' => $this->receiver->name,
            'sender' => $this->sender->name,


   //'icon_path' =>!is_null($this->image_path) ? 'https://kafo.90-soft.com/'. //$this->image_path : null,
        ];
    }
}
