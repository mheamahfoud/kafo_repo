<?php

namespace App\Http\Resources\AdminExportExcel;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CaseDonationsResouces extends JsonResource
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
        //  'image_path' => count( $this->media)>0 ?  $this->media[0]->getPath() :'',
           'image_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :'',
           // 'download_url' => count( $this->media)>0 ?  $this->media[0]['download_url'] :'',
          //  'display_name' => count( $this->media)>0 ?  $this->media[0]['display_name'] :'',
            
            'percentage_completed'=> array_sum(array_column($this->costs->toArray(), 'value')) >0     ?    (array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value'))) >1 ? 100 :    (array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value')))*100     :  0,
            'total_needed_amount'=>count( $this->costs)>0 ?  array_sum(array_column($this->costs->toArray(), 'value')) :0,
            'remaining_amount'=> (array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount'))) <  0   ? 0 : array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount')) ,
            'status'=>$this->status,
            'is_active'=>$this->is_active
            
,            'created_at'=>$this->created_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,

        ];
    }
}
