<?php

namespace App\Http\Controllers\Api\V1\Mobile\CaseManagment;
use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Repositories\Interfaces\CaseRepositoryInterface;
use App\Repositories\Interfaces\SuccessStoryRepositoryInterface;
use App\Http\Resources\Mobile\V1\CaseResources;
use App\Http\Resources\Mobile\V1\CaseViewResources;
use App\Repositories\Interfaces\DonorRepositoryInterface;
use App\Models\CaseFollower;
use App\Models\System;
use App\Events\TestEvent;
use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Lang;

class CaseController extends Controller
{
    //
    private $caseRepository;
    private $successStoryRepository;
    private $donorRepository;

    public function __construct(CaseRepositoryInterface $caseRepository,  SuccessStoryRepositoryInterface  $successStoryRepository,donorRepositoryInterface $donorRepository )
    {
        $this->caseRepository = $caseRepository;
        $this->successStoryRepository = $successStoryRepository;
        $this->donorRepository = $donorRepository;
        
    }
    public function index(Request $request)
    {
            $lang= $request->header('lang');;
            $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
        
            $cases=$this->caseRepository->paginate(  $limit = $rowsPerPage, $columns = ['*'],$relations=['donors','costs'=>function ($q) {
                $q->where('is_active', 1);},'media'=> function ($q) {
                $q->where('collection_name', 'Cover_Photo');}]);
           
            $data=[
                'items' => CaseResources::collection($cases),
                'total' => $cases->total(),
            ];
            return Response::respondSuccess($data);
    }



    // 'secretInfo'=>function ($q) {
    //     $q->with(['provider'=>function ($q) {
    //         $q->with('media');}]);}
     /**
     * 
     * show Case Details
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request, $id)
    {
        $lang= $request->header('lang');
        try{
            $case =$this->caseRepository->findById($id,$columns = ['*'],$relations = ['media','follower', 'donors'=>function ($p){$p->with('donor');  } ,'updates'=>function ($p){
                $p->where('is_active', 1)->with('media');},'validations'=>function ($q) {$q->with(['type','provider'=>function ($p){
                    $p->with('media');},'media']);},'costs'=>function ($q){
                        $q->where('is_active', 1);}], $appends = []);
                       
            $this->caseRepository->IncreaseViewCountUpdate($id);
            if(!is_null($case)){
                $donor_id = $this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
            $donor = $this->donorRepository->findById($donor_id, $columns = ['*'], $relations = ['wallet'], $appends = []);
            
                $case->setAttribute('wallet_amount', $donor->wallet->amount);
                $array=[];
                array_push($array,$case);
                $res=CaseViewResources::collection($array)[0];

                return Response::respondSuccess($res);
            }
            else{
                $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                return Response::respondError($message);
            }
 
        }
        catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }

    }



    public function getSummery(Request $request)
    {
            $lang= $request->header('lang');
            $cases = $this->caseRepository->getCount();
            $success_stories = $this->successStoryRepository->getCount();
            $donations = 100;///$this->caseRepository->getDonorCount(); 
            
            $data=[
                'success_stories' =>Helpers::number_format_short( $success_stories),
                'donations' => Helpers::number_format_short($donations),
                'open_cases' => Helpers::number_format_short($cases),
            ];
            return Response::respondSuccess($data);
    }

    public function getSecretInfo(Request $request , $id)
    {
            $lang= $request->header('lang');
            try{
                if (!$this->caseRepository->CheckExist($id)) {
                    $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }
            $secret_info = $this->caseRepository->getSecretInfo($id);
       
                if(!is_null($secret_info) ){
                     $data=[

                        'id' => $secret_info->id,
                        'person_name' => $secret_info->person_name ,
                        'phone_number'=>$secret_info->phone_number,
                        'address'=>$secret_info->address,
                     
                       'provdier_image' =>!is_null($secret_info->provider) ? is_null($secret_info->provider->image_path)?null: env('APP_URL').'/'. $secret_info->provider->image_path  : null, 
                        'provdier_name'=>!is_null($secret_info->provider) ?   $lang =='en'?  $secret_info->provider->name :  $secret_info->provider->ar_name  : null,
                        'note'=>$secret_info->note,
                       // 'relation_name'=>  $lang =='en' ? $secret_info->relation_name : $secret_info->relation_name,
                        'relation_name'=>!is_null($secret_info->relation_id) ? $lang =='en' ?   $secret_info->relation->name : $secret_info->relation->ar_name : null,
                     ];
                    return Response::respondSuccess($data);
                }
                else{

            
                    return Response::respondSuccess(null);
                 
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
    }





    public function donate(Request $request )
    {
            $lang= $request->header('lang');
            $validate = validator($request->all(), [
                'case_id' => 'required',
                'amount' => 'required|numeric|min:1',
                //'kafo_amount' => 'numeric|min:1',
               // 'donor_id' => 'required',
            
            ],
            [
                'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
                'min'  => Lang::get('site.min',['name'=>':attribute'],$lang),
                'numeric'=>Lang::get('site.numeric',['name'=>':attribute'],$lang),
            ]
           );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
            try{
                
                $donor_id=$this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
                if (!$this->caseRepository->CheckExist($request->case_id)) {
                    $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }

                DB::beginTransaction();
                $input['donor_id']=$donor_id;
                $input['case_id']=$request->case_id;


                 $total_donation=$request->amount +  $request->kafo_amount;

                //check if wallet is enough for donation
                $wallet_amount = $this->donorRepository->getWalletAmount($donor_id);
                if($total_donation > $wallet_amount ){
                    $message = Lang::get('site.wallet_not_enough',[],$lang);
                    return Response::respondError($message);
                }


                if($request->kafo_amount > 0 ){
                    System::DonateForKafo($request->kafo_amount);
                    $kafo_transaction["donor_id"]=$donor_id;
                    $kafo_transaction["amount"]=$request->kafo_amount;
                    $kafo_transaction["type"]="donation";
                    $this->donorRepository->CreateRequest($kafo_transaction);
                }

                $refund=0;
                
               $remaining_value= $this->caseRepository->GetRemainingAmountForCase($request->case_id);

              if($request->amount > $remaining_value || $request->amount == $remaining_value  ){
                $refund=$request->amount - $remaining_value;

                $input['amount']=$remaining_value;

                $this->caseRepository->CompleteCase($request->case_id);
              }
              else{
              
                $input['amount']=$request->amount;

              }
            ///donate
              $donate = $this->caseRepository->donate($input);
                
                if($remaining_value > 0){
                    $case_transaction=$input ;
                    $case_transaction["type"]="donation";
                    $this->donorRepository->CreateRequest($case_transaction);
                }
                


                $this->donorRepository->minusWallet($donor_id,$total_donation);
                DB::commit();
                
                if($refund > 0 ){
                    $message = Lang::get('site.donation_bigger_remainging',['name' => $refund],$lang);
                    return Response::respondSuccess($message);
                    
                }
                else{
                    $message =   Lang::get('site.success_donated',[],$lang);
                  
                    return Response::respondSuccess($message);
                }

                 
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
    }




    


    public function followCase(Request $request )
    {
            $lang= $request->header('lang');
            $validate = validator($request->all(), [
                'case_id' => 'required',
            //    'donor_id' => 'required',
            
            ],
            [
                'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
            ]
           );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
            try{

                // if (!$this->donorRepository->CheckExist($request->donor_id)) {
                //     $message = Lang::get('site.object_not_found',['name'=>__('site.donor',[],$lang)],$lang);
                //     return Response::respondError($message);
                // }

                if (!$this->caseRepository->CheckExist($request->case_id)) {
                    $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }

                DB::beginTransaction();
                $donor_id=$this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
                $temp=CaseFollower::where('case_id',$request->case_id)->where('donor_id',$donor_id)->first();
                if(is_null($temp))
                {
                   // $input = $request->only('donor_id', 'case_id');
                    $input=[
                        'case_id'=> $request->case_id ,
                        'donor_id'=> $donor_id
                    ];
                     $follower = $this->caseRepository->followCase($input);
                     DB::commit();
                      $message = Lang::get('site.success_process',[],$lang);
                     return Response::respondSuccess($message);

                    // return Response::respondSuccess($follower);
                }
                else{
                    $message = Lang::get('site.already_follower',[],$lang);
                    return Response::respondError($message);
                }
              
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
    }

    public function unFollowCase(Request $request )
    {
            $lang= $request->header('lang');
            $validate = validator($request->all(), [
                'case_id' => 'required',
            //    'donor_id' => 'required',
            
            ],
            [
                'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
            ]
           );

        if ($validate->fails()) {
            return Response::respondErrorValidation($validate->errors()->first());
        }
            try{

                // if (!$this->donorRepository->CheckExist($request->donor_id)) {
                //     $message = Lang::get('site.object_not_found',['name'=>__('site.donor',[],$lang)],$lang);
                //     return Response::respondError($message);
                // }

                if (!$this->caseRepository->CheckExist($request->case_id)) {
                    $message = Lang::get('site.object_not_found',['name'=>__('site.case',[],$lang)],$lang);
                    return Response::respondError($message);
                }

                DB::beginTransaction();
                $donor_id=$this->donorRepository->GetDonorId(Auth::guard('api')->user()->id);
                $temp=CaseFollower::where('case_id',$request->case_id)->where('donor_id',$donor_id)->first();
                if(!is_null($temp))
                {
                    $temp=CaseFollower::where('case_id',$request->case_id)->where('donor_id',$donor_id)->delete();
                     DB::commit();

                     $message = Lang::get('site.success_process',[],$lang);
                     return Response::respondSuccess($message);

       
                }
                else{
                    $message = Lang::get('site.not_follower',[],$lang);
                    return Response::respondError($message);
                }
              
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
    }




    
    public function listDonors(Request $request )
    {
            $lang= $request->header('lang');
            try{
                $temp=[];
                $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
                $donors = $this->caseRepository->getDonors($limit = $rowsPerPage,);
                foreach($donors as $item){
                    array_push(
                        $temp,
                        [
                            'total_amount'=>Helpers::number_format_short( $item->total_amount),
                              'secret_name'=> $this->donorRepository->findById($item->donor_id)->secret_name
                        ]
                        );
                }
                $data=[
                    'items' =>$temp,
                    'total' => $donors->total(),
                ];
                 return Response::respondSuccess($data);
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
    }
}
