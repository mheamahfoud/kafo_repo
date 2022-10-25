<?php

namespace App\Http\Resources\Admin;

use App\actor;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class DonorResouces extends JsonResource
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
            'image_path' => $this->image_path,
            'full_name' =>!is_null($this->user) ? $this->user->full_name : '' ,
           // 'image_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :'',
         //   'display_name' => count( $this->media)>0 ?  $this->media[0]['display_name'] :'',
            'is_active' =>!is_null($this->user) ? $this->user->is_active : 0   ,
            'mobile' =>!is_null($this->user) ? $this->user->mobile : ''   ,
            'gender'=>$this->gender,
            'created_at'=>$this->created_at,
            'donation_count'=> count($this->donations),
            'total_donation_amount'=> array_sum(array_column($this->donations->toArray(), 'amount')) ,

             


        ];
    }
}


