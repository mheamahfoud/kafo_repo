<?php

namespace App\Http\Resources\Admin;
use Illuminate\Http\Resources\Json\JsonResource;

class RequestResouces extends JsonResource
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
            'requester_name' =>!is_null($this->donor->user) ? $this->donor->user->full_name:""  ,
            'requester_phone_number'=> !is_null($this->donor->user) ? $this->donor->user->mobile:""  , 
            'amount'=>$this->amount,
            'request_date_time'=>$this->created_at,
            'status'=>$this->status,
        ];
    }
}
