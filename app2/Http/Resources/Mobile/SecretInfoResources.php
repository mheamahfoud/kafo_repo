<?php

namespace App\Http\Resources\Mobile\V1;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SecretInfoResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
    
        return [
            'id' => $this->id,
            'person_name' => $this->person_name ,
            'phone_number'=>$this->phone_number,
            'address'=>$this->address,
            'provdier_image' => count( $this->provider['media'])>0 ?  $this->provider['media']['full_url'] :null,
            'provdier_name'=>$this->provider['name'],
            'note'=>$this->note,
          
        ];
    }
}
