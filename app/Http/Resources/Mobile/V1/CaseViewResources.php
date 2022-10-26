<?php

namespace App\Http\Resources\Mobile\V1;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Lang;
class CaseViewResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
       
        $lang= $request->header('lang');
        $total_cost=array_sum(array_column($this->costs->toArray(), 'value'));
        return [
            'id' => $this->id,
            'wallet_amount'=> $this->wallet_amount,
            'contain_secret_info'=>is_null($this->secret_info_id) ? false:$this->has_donate,
            'is_follow'=>is_null($this->follower)?false:true,
            'name' =>$lang=='en' ? $this->name :  (is_null($this->ar_name)?"":$this->ar_name),
            'description' => $lang=='en' ? $this->description : (is_null($this->ar_description)?"":$this->ar_description )   , 
            'case_callery'=> array_column($this->media->toArray(), 'full_url') , 
            'vedio_url'=>$this->viedio_url ,
            'publish_date'=>$this->publish_date ,
           // 'cover_photo_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :null,
                    'percentage_completed'=> number_format(array_sum(array_column($this->costs->toArray(), 'value')) >0     ?    (array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value'))) >1 ? 100 :  floor((array_sum(array_column($this->donors->toArray(), 'amount'))/array_sum(array_column($this->costs->toArray(), 'value')))*100)       :  0, 0, '.', '')  ,
            'total_needed_amount'=>count( $this->costs)>0 ?  array_sum(array_column($this->costs->toArray(), 'value')) :0,
            'remaining_amount'=> (array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount'))) <  0   ? 0 : array_sum(array_column($this->costs->toArray(), 'value'))-array_sum(array_column($this->donors->toArray(), 'amount')) ,
            'status'=>  Lang::get('site.'.$this->status,[],$lang) ,
          
            'validations'=>array_map(function($val1) use ($request) {
                $lang= $request->header('lang');
                // Calculate the power
                return [
                         'id'=> $val1['id'],
                         'name'=> $lang=='en' ?  $val1['name']  : (is_null($val1['ar_name']) ?"":$val1['ar_name'] ) ,
                         'type'=>$lang=='en' ? $val1['type']['name']  : $val1['type']['ar_name'] ,
                         'images'=>array_map(function($val1) {
                            if($val1['collection_name']=='images_Validations')
                                return [
                                        'url'=> $val1['full_url'],
                                        ];
                                }
                            ,$val1['media']) ,
                        'provider_id'=> $val1['provider']!= null ? $val1['provider']['id'] :null,
                        'provider_name'=>$val1['provider']!= null ?   $lang=='en' ?   $val1['provider']['name']  :(  is_null($val1['provider']['ar_name'])  ?"":$val1['provider']['ar_name']) :null,
                        
                        
                     
                        
                        
                        'provider_image'=>$val1['provider']!= null ?!is_null( $val1['provider']['image_path'] ) ?   env('APP_URL').'/'. $val1['provider']['image_path'] :null :null,
                        
                        'description'=> $lang=='en' ?  $val1['description']  :(is_null($val1['ar_description']) ?"":$val1['ar_description']) ,

                       
                       ];
            }
            , $this->validations->toArray()) ,
            
         
            'costs'=>array_map(function($val1) use ($request)  {
                $lang= $request->header('lang');
                // Calculate the power
                return [
                         'id'=> $val1['id'],
                         'name'=> $lang=='en' ?   $val1['name']  :(
                             is_null($val1['ar_name']) ? "" :$val1['ar_name']),
                         'amount'=> $val1['value'],
                         'status'=> Lang::get('site.'.$val1['status'],[],$lang) 
                       ];
            }
            , $this->costs->toArray()) ,

            'donors'=>array_map(function($val1) {
            
                // Calculate the power
                return [
                         'id'=> $val1['id'],
                         'secret_name'=> $val1['donor']['secret_name'],
                         'donation_percentage'=> number_format(array_sum(array_column($this->costs->toArray(), 'value')) >0     ?    ($val1['amount']/array_sum(array_column($this->costs->toArray(), 'value'))) >1 ? 100 :    ($val1['amount']/array_sum(array_column($this->costs->toArray(), 'value')))*100     :  0, 3, '.', '') , //$this->total_cost ,
                         'donation_amount'=> $val1['amount'],
                         'donation_date'=>$val1['created_at']
                       ];
            }
            , $this->donors->toArray()) ,


            'updates'=>array_map(function($val1)  use ($request){
                $lang= $request->header('lang');
                // Calculate the power
                return [
                         'id'=> $val1['id'],
                         'image'=> count($val1['media']) >0 ? $val1['media'][0]['full_url'] :null, 
                         'description'=> $lang=='en' ?  $val1['description']  :(is_null($val1['ar_description'])?"" :$val1['ar_description']) ,
                         'views_count'=> $val1['views_count'],
                         'date'=>$val1['created_at']
                       ];
            }
            , $this->updates->toArray()) ,
          
        
            //'costs'=> Object_map() array_column($this->costs->toArray(), ['id','value','status'])
         //   'created_at'=>$this->created_at,
        ];
    }
}
