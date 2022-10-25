<?php

namespace App\Http\Resources\AdminExportExcel;

use App\actor;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResources extends JsonResource
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
            'driver_name'=>$this->driver->user->name,
            'client_name'=>$this->client->user->name,
            'description'=>$this->description,
            'address'=>$this->address->name,
            'fee'=>$this->fee,
            'price'=>$this->price,
            'copon_price'=>$this->copon_price,
            'with_copon'=>$this->with_copon,
            'status_id'=>$this->status_id,
            'status_id'=>$this->status_id,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,


        ];
    }
}
