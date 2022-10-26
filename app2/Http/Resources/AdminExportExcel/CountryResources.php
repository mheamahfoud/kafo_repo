<?php

namespace App\Http\Resources\AdminExportExcel;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryResources extends JsonResource
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
            'created_at'=>$this->created_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,

        ];
    }
}
