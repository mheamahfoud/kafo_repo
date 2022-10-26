<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CostResouces extends JsonResource
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
            'value' => $this->value ,
            'status'=>$this->status,
            'is_active'=>$this->is_active
,   
        ];
    }
}
