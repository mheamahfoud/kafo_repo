<?php

namespace App\Http\Resources\AdminExportExcel;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseDonorsResouces extends JsonResource
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
            'id' => $this->donor->id,
            'secret_name' => $this->donor->secret_name ,
            'amount'=>$this->amount,
           'created_at'=>$this->created_at
        ];
    }
}
