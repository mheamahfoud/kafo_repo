<?php

namespace App\Http\Resources\Admin;
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
        return [
            'id' => $this->id,
            'question' => $this->en_question,
            'en_question' => $this->en_question,
            'ar_question' => $this->ar_question,
            'answer'=>$this->en_answer,
            'en_answer'=>$this->en_answer,
            'ar_answer'=>$this->ar_answer,
            'created_at'=>$this->created_at,
            'created_by'=>!is_null($this->creator) ? $this->creator->full_name : null,
            'is_active'=>$this->is_active,
        ];
    }
}
