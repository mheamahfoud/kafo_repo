<?php

namespace App\Repositories\Eloquent;
use App\Models\Donor;
use App\Models\User;
use App\Models\Wallet;
use App\Models\RequestWallet;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Interfaces\DonorRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use App\Components\Core\Utilities\Helpers;
use App\Models\UserCode;
class DonorRepository extends BaseRepository implements DonorRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;
    protected $userModel;
    protected $walletModel;
    protected $walletRequestModel;
    protected $userCodeModel;
    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Donor $model , User $userModel ,Wallet $walletModel ,RequestWallet $walletRequestModel ,UserCode $userCodeModel )
    {
        $this->model = $model;
        $this->userModel = $userModel;
        $this->walletModel = $walletModel;
        $this->walletRequestModel=$walletRequestModel;
         $this->userCodeModel=$userCodeModel;
    
    }



    public function getWalletAmount($donor_id): ?float
    {
        $amount = $this->model->with('wallet')->findOrfail($donor_id)->wallet->amount;

        return $amount;
    }


    public function minusWallet($donor_id,$amount): ?float
    {
        $donor = $this->model->with('wallet')->findOrfail($donor_id);
        $donor->wallet->amount= $donor->wallet->amount-$amount;
        $donor->wallet->update();
        return $donor->wallet->amount;
    }
    


    public function chargeWallet($donor_id,$amount): ?float
    {
        $donor = $this->model->with('wallet')->findOrfail($donor_id);
        $donor->wallet->amount= $donor->wallet->amount+$amount;
        $donor->wallet->update();
        return $donor->wallet->amount;
    }



    public function editProfile(array $payload,  $donor_id): ?Donor
    {

        $donor = $this->model->with('user','media')->findOrfail($donor_id);
        $payload['updated_at'] = Carbon::now();
        $payload['is_active'] =$donor->user->is_active;
         if(!isset($payload['country_id']) || is_null($payload['country_id'])){
            $payload['country_id']=null;
        }
        if(!isset($payload['city_id']) || is_null($payload['city_id'])){
            $payload['city_id']=null;
        }
        $donor->update($payload);
        $donor->user->update($payload);
        return  $donor;

    }


    public function singup(array $payload): ?Donor
    {

        $payload['password'] = '';//\;//Hash::make($request->password);
        $payload['created_at']=Carbon::now();
        $user = $this->userModel->create($payload);

        $wallet['created_at']=Carbon::now();
       $wallet=$this->walletModel->create($wallet);

       $donor['user_id'] = $user->id;
       $donor['wallet_id'] = $wallet->id;
       $donor['created_at']=Carbon::now();
       $donor['secret_name'] =  $payload['secret_name'];
       $model = $this->model->create($donor);

        return  $model ;
    }




    public function singin($mobile): ?User
    {

        $user = $this->userModel->where('mobile',$mobile)->first();
        if(!is_null($user)){
            $donor = $this->model->where('user_id',$user->id)->first();
            
            if(is_null($donor))
                return null;


            if(!is_null($user)){
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $user->setAttribute('token',$token);
                $user->setAttribute('donor_id',$donor->id  );
            }
            return  $user;
        }
        else{
            return null;
        }
      
    }

    public function CheckExist($donor_id): ?bool
    {
       // $amount = $this->model->with('wallet')->findOrfail($donor_id)->wallet->amount;

        return $this->model->where('id', $donor_id )->exists();
    }

    public function GetDonorId($user_id): ?int
    {
        return $this->model->where('user_id', $user_id )->first()->id;
    }


    public function CreateRequest(array $payload): ?RequestWallet
    {
        $payload['created_at']=Carbon::now();
        $payload['created_by']=Auth::guard('api')->user()->id;
       
        return $this->walletRequestModel->create($payload);
         
    }


   public function getRequests($donor_id,$limit=null)
    {
        
        return  $this->walletRequestModel
                ->with("case")
                //->where('status','!=','rejected')
                ->where('donor_id','=',$donor_id )
              //  ->selectRaw("amount as amount")
                //->selectRaw("created_at  as date")
            //    ->selectRaw("status")
                ->orderBy('created_at', 'desc')->paginate($limit);
          
         
    }

     public function GetSumDonationsForAppByDonor($donor_id)
    {
        return $this->walletRequestModel
        ->where('donor_id',$donor_id)
        ->where('type','donation')
        ->where('case_id',null)
        ->sum('amount');
    }
    
    
    
    public function CreateUserCode($otp,$user_id)
    {
        $payload['otp']=$otp;
        $payload['created_at']=Carbon::now();
        $payload['expired_date']=Carbon::now()->addMinute(15);
        $payload['updated_at']=Carbon::now();
        $payload['created_by']=$user_id;
        $payload['is_confirm']=0;
    
        $userCode=$this->userCodeModel->where('user_id',$user_id)->first();
      
       if(is_null($userCode)){
        $payload['user_id']=$user_id;
        $payload['number_of_times']=1;
        $this->userCodeModel->create($payload);
       }
       else{
        $payload['number_of_times']=$userCode->number_of_times  +1;
          $this->userCodeModel->findOrfail($userCode->id)->update($payload);
        
       }
    }


    public function getUserCode($user_id):  ?UserCode
    {
       
       return $this->userCodeModel->where('user_id',$user_id)->first();

    }
}