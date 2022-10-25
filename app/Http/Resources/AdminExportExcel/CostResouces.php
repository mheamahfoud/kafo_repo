<?php

namespace App\Http\Resources\AdminExportExcel;
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
            'value' => $this->value ,
            'status'=>$this->status =='not_paid' ? 'Not Paid ' :'Paid'
         
   
        ];
    }
}
