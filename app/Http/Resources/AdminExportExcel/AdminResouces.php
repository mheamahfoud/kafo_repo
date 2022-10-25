<?php

namespace App\Http\Resources\AdminExportExcel;

use App\actor;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminResouces extends JsonResource
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
            'full_name' =>!is_null($this->user) ? $this->user->full_name : '' ,
            'user_name' =>!is_null($this->user) ? $this->user->user_name : ''  ,
           'email' =>!is_null($this->user) ? $this->user->email : ''   ,
         //  'is_active' =>!is_null($this->user) ? $this->user->is_active : 0   ,
            'created_at'=>$this->created_at,
          //  'updated_at'=>$this->updated_at,
           // 'is_active'=>$this->is_active,
           // 'status'=>$this->status,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null


        ];
    }
}


