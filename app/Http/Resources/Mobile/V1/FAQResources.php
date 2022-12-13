<?php

namespace App\Http\Resources\Mobile\V1;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FAQResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $lang= $request->header('lang');
        return [
            'id' => $this->id,
            'question' =>  $lang=='en' ?  $this->en_question:   $this->ar_question,
            'answer' =>  $lang=='en' ?  $this->en_answer:   $this->ar_answer,
        ];
    }
}
