<?php

namespace App\Http\Resources\Admin;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CityResources extends JsonResource
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
            'country_id' => $this->country_id ,
            'country' => $this->country ,
            'is_active'=>$this->is_active
,            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'donors'=>$this->donors,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,

        ];
    }
}
