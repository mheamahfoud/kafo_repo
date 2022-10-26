<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class System extends Model
{
    public $guarded = []; 
    use HasFactory;
    protected $table ="system";

    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
     public function DonateForKafo($value)
    {
        $system= System::where('key', 'SYSTEM_KAFO_BALANCE' )->first(); 
         if(is_null($system)){
            System::create([
                'key'=>'SYSTEM_KAFO_BALANCE',
                'value'=>$value,
                'created_at'=>Carbon::Now(),
                'updated_at'=>Carbon::Now()
            ]);
         }
         else{
            $system->updated_at=Carbon::Now();
            $system->value=$system->value+$value;
            $system->update();
         }
        
    }
}
