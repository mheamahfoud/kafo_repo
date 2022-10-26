<?php

namespace App\Repositories\Eloquent;
use App\Models\CaseDonor;
use App\Models\CaseDonation;
use App\Models\CaseUpdate;
use App\Models\SecretInfo;
use App\Models\CaseFollower;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Interfaces\CaseRepositoryInterface;
use Illuminate\Support\Facades\DB;
class CaseRepository extends BaseRepository implements CaseRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;
    protected $modelDonor;
    protected $modelSecretInfo;
    protected $modelCaseDonor;
    protected $modelCaseFollower;
    protected $modelCaseUpdate;
    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(CaseDonation $model, CaseDonor $modelDonor ,SecretInfo  $modelSecretInfo,CaseDonor $modelCaseDonor ,CaseFollower $modelCaseFollower ,CaseUpdate $modelCaseUpdate )
    {
       // $this->model = $model::where('is_active',1)->where('status','!='//,'draft');
        $this->model = $model::where('is_active',1)->where('is_published',1);
        $this->modelDonor = $modelDonor;
        $this->modelSecretInfo = $modelSecretInfo;
        $this->modelCaseDonor=$modelCaseDonor;
        $this->modelCaseFollower=$modelCaseFollower;
        $this->modelCaseUpdate=$modelCaseUpdate;
    }


    public function getDonorCount(): int
    {
        return $this->modelDonor->count();
    }

    public function getSecretInfo($case_id): ?SecretInfo
    {
        $case=$this->model->where('id', $case_id )->first();
        if(!is_null($case))
            return $this->modelSecretInfo->with(['provider'])->where('id',$case->secret_info_id)->first();
        else
           return null;
    }


    

      
    public function donate(array $payload): ?CaseDonor
    {
        $payload['created_at']= Carbon::now();
        $model = $this->modelCaseDonor->create($payload);

        return $model->fresh();
    }


    public function CheckDonorFollow($donor_id,$case_id): bool
    {
        $temp= $this->modelCaseFollower->where('case_id',$case_id)->where('donor_id',$donor_id)->first();
        return is_null($temp);
    }

    public function followCase(array $payload): ?CaseFollower
    {
        
        return $this->modelCaseFollower->create($payload);
    }

    public function CheckExist($case_id): ?bool
    {
       // $amount = $this->model->with('wallet')->findOrfail($donor_id)->wallet->amount;

        return $this->model->where('id', $case_id )->exists();
    }

    public function GetDonors($limit = null)
    {
     
        return $this->modelCaseDonor
        ->selectRaw("SUM(amount) as total_amount")
        ->selectRaw("donor_id as donor_id")
        ->orderBy('total_amount', 'desc')
       ->groupBy('donor_id')
        ->paginate($limit);;
    }




    public function GetDonations($donor_id,$limit=null)
    {
     
        return $this->modelCaseDonor
        ->with(["case"])
        ->where('donor_id',$donor_id)
        ->orderBy('amount', 'desc')
        ->paginate ($limit);
    }
     public function GetSumDonationsByDonor($donor_id)
    {
        return $this->modelCaseDonor
        ->where('donor_id',$donor_id)
        ->sum('amount');
    }

    public function GetSumCaseDonationsByDonor($donor_id)
    {
       return  $this->modelCaseDonor
        ->where('donor_id',$donor_id)
         ///->selectRaw("case_id as donor_id")
        ->select('case_id', DB::raw('count(*) as total'))
        ->groupBy('case_id')
        ->get();
        //->get();
    }


    public function GetRemainingAmountForCase($case_id)
    {
       $case=$this->model->with(['costs'=>function ($q){
        $q->where('is_active', 1);},'donors'])->find($case_id);
       
       $remaining_value=array_sum(array_column($case->costs->toArray(), 'value'))-array_sum(array_column($case->donors->toArray(), 'amount'));

      return  $remaining_value;
     
    }


    public function CompleteCase($case_id)
    {
       $case=$this->model->find($case_id);
       $case->status='completed';
       $case->update();
      return  $case;
     
    }

    public function IncreaseViewCountUpdate($case_id)
    {
       $updates=$this->modelCaseUpdate->where('case_id', $case_id)->get();
       foreach($updates as $item){
        $item->views_count= $item->views_count+1;
        $item->update();
       }
     
    }


    public function checkDonationCaseByDonor($case_id,$donor_id): bool
    {
       return !is_null($this->modelCaseDonor->where('case_id',$case_id)->where('donor_id',$donor_id)->first()) ;
     
    }
    
    
}

