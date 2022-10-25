<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Wallet extends Model
{    
    use HasFactory;
    protected $table ="wallets";
    public $guarded = [];
    public function getCreatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }
    public function getUpdatedAtAttribute($value){
        $date = Carbon::parse($value);
        return $date->format('Y-m-d H:i:s');
    }

    public function charge($amount,$wallet_id)
    {
        $wallet=Wallet::where('id',$wallet_id)->first();

        $wallet->amount= $wallet->amount+$amount;
        $wallet->last_charge_amount = $amount;
        $wallet->charge_count= $wallet->charge_count+1;
        $wallet->last_charge_date = Carbon::now();
         $wallet->update();
    }



  
}
