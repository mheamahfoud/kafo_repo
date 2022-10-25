<?php

namespace App\Http\Resources\Mobile\V1;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Lang;
class CaseResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $lang= $request->header('lang');;
        return [
            'id' => $this->id,
            'name' =>$lang=='en' ? $this->name :  $this->ar_name,
            'cover_photo_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :null,
            'percentage_completed'=> number_format(array_sum(array_column($this->costs->toArray(), 'value')) >0     ?    (array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value'))) >1 ? 100 :    (array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value')))*100     :  0, 3, '.', '') ,
            'total_needed_amount'=>count( $this->costs)>0 ?  array_sum(array_column($this->costs->toArray(), 'value')) :0,
            'remaining_amount'=> (array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount'))) <  0   ? 0 : array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount')) ,
            'status'=>  Lang::get('site.'.$this->status,[],$lang) ,
            'created_at'=>$this->created_at,
        ];
    }
}
