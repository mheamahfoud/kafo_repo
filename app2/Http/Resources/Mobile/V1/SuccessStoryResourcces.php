<?php

namespace App\Http\Resources\Mobile\V1;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessStoryResourcces extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $lang= $request->header('lang');;
        return [
            'id'=>$this->id,



       'case_id' =>$this->case->id,
            'case_name' =>$lang=='en' ? $this->case->name:  $this->case->ar_name,
            'description' => $lang=='en' ? $this->description  : $this->ar_description,
            'cover_photo_url' => count( $this->media)>0 ?  $this->media[0]['full_url'] :null,
            'created_at' => $this->created_at ,
        
        ];
    }
}
