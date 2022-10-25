<?php

namespace App\Http\Controllers\Admin\Reports;
use App\Models\User;
use App\Models\City;
use App\Http\Resources\AdminExportExcel\CityResources;
use App\Http\Resources\AdminExportExcel\CountryResources;
use App\Models\Country;

use App\Http\Resources\AdminExportExcel\ProviderResources;
use App\Models\Provider;

use App\Http\Resources\AdminExportExcel\RelationResources;
use App\Models\Relation;


use App\Http\Resources\AdminExportExcel\ValidationTypeResources;
use App\Models\ValidationType;


use App\Models\Admin;
use App\Http\Resources\AdminExportExcel\AdminResouces;


use App\Models\Donor;
use App\Http\Resources\AdminExportExcel\DonorResouces;

use App\Models\SuccessStory;
use App\Http\Resources\AdminExportExcel\SuccessStoryResouces;


use App\Models\RequestWallet;
use App\Http\Resources\AdminExportExcel\RequestResouces;

use App\Models\Validation;
use App\Http\Resources\AdminExportExcel\ValidationResouces;


use App\Models\Cost;
use App\Http\Resources\AdminExportExcel\CostResouces;





use App\Models\CaseFollower;
use App\Http\Resources\AdminExportExcel\CaseFollowersResouces;

use App\Models\CaseUpdate;
use App\Http\Resources\AdminExportExcel\CaseUpdateResouces;


use App\Models\CaseDonor;
use App\Http\Resources\AdminExportExcel\CaseDonorsResouces;

use App\Exports\ExcelExport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\AdminExportExcel\CaseDonationsResouces;
use App\Models\CaseDonation;
use App\Http\Controllers\Controller;
use Lang;
class ExportReportController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($type ,$case_id)
    {
          
    //  echo json_encode($id);
     // echo json_encode($type);
    //  die();
        switch($type) {

            #region setUp
            case('cities'):
               $cities = City::with('creator')->get();
                $data=CityResources::collection($cities); 
                $header=[
                    'Id',
                    'Name'  ,
                    'Created At ',
                    'Created By',
                ];;
                return Excel::download(new ExcelExport($data,$header ), 'cities.xlsx');
 

            case('providers'):
                $providers = Provider::with( ['creator', 'media','validations','cases'])->get();
                $data=ProviderResources::collection($providers); 
                $header=[
                    'Id',
                    'Name'  ,
                    'Image Url',
                    'Description' ,
                    'Created At ',
                    'Created By',
                    'Related Cases Count',
                    'Related Validation Count',
                    ];;
                return Excel::download(new ExcelExport($data,$header ), 'providers.xlsx');
            case('countries'):
                $countries = Country::with('creator')->get();
                    $data=CountryResources::collection($countries); 
                    $header=[
                        'Id',
                        'Name'  ,
                    'Created At ',
                        'Created By',
                    ];;
                    return Excel::download(new ExcelExport($data,$header ), 'countries.xlsx');
           case('relations'):
                    $relations = Relation::with('creator')->get();
                    $data=RelationResources::collection($relations); 
                    $header=[
                        'Id',
                        'Name'  ,
                        'Created At ',
                        'Created By',
                    ];;
                    return Excel::download(new ExcelExport($data,$header ), 'relations.xlsx');


            case('validationTypes'):
                    $validationsType = ValidationType::with('creator')->get();
                    $data=ValidationTypeResources::collection($validationsType); 
                    $header=[
                        'Id',
                        'Name'  ,
                        'Created At ',
                        'Created By',
                    ];;
                    return Excel::download(new ExcelExport($data,$header ), 'validationTypes.xlsx');







          
          #regin User Managment
            case('admins'):
               $admins = Admin::with(['user' => function ($q) { $q->orderBy('full_name', 'asc');} , 'creator'])->get();
                $data=AdminResouces::collection($admins); 
                $header=[
                    'Id',
                    'Full Name'  ,
                    'User Name',
                    'Email',
                    'Created At ',
                    'Created By',
                ];;
                return Excel::download(new ExcelExport($data,$header ), 'admins.xlsx');

            case('donors'):
                $donors =  Donor::with(['donations','user' => function ($q) { $q->orderBy('full_name', 'asc');} , 'city','country','media'=> function ($q) {$q->where('collection_name', 'Donors');}])->get();
                $data=DonorResouces::collection($donors); 
                $header=[
                    'Id',
                    'Full Name'  ,
                    'Image Url',
                    'Phone Number',
                    'Gender',
                    'Donation Count',
                    'Total Donation Amount',
                    'Created At',
                    'Status',
                ];
                return Excel::download(new ExcelExport($data,$header ), 'users.xlsx');
                   



            case('cases'):
                $query = CaseDonation::with(['validations','donors','costs'=>function ($q) {
                    $q->where('is_active', 1);},'media'=> function ($q) {
                    $q->where('collection_name', 'Cover_Photo');}]);
                $data=CaseDonationsResouces::collection($query->get()); 
                $header=[
                    'Id',
                    'Name'  ,
                    'Image Url',
                    'Percentage Completed' ,
                    'Total Needed Amount',
                    'Remaining Amount',
                    'Status',
                    'Is Active' , 
                  'Created At ',
                    'Created By',
                ];
                return Excel::download(new ExcelExport($data,$header ), 'cases.xlsx');
 



            case('successStories'):

                $successStories = SuccessStory::with(['case','media'=> function ($q) { $q->where('collection_name', 'Cover_Photo');}])->get();
                $data=SuccessStoryResouces::collection($successStories); 
                $header=[
                        'Id',
                        'Case Name'  ,
                        'Image Url',
                        'Description',
                        'Views Count',
                        'Created By',
                        'Created At '
                    ];
                    return Excel::download(new ExcelExport($data,$header ), 'successStories.xlsx');










            case('requests'):
                $requests =   RequestWallet::with(['donor' => function ($q) {
                    $q->with(['user'=> function ($q1) {
                        $q1->orderBy('full_name', 'asc');}]) ;
                    } ])->get();
                $data=RequestResouces::collection($requests); 
                $header=[

                    'Id',
                    'Reuester Name' ,
                    'Requester  Phone Number',
                    'Amount',
                    'Request Date Time',
                    'Status',
                ];
                return Excel::download(new ExcelExport($data,$header ), 'requests.xlsx');




                
            case('validations'):
                $validations = Validation::where('case_id',$case_id)->with(['type','provider'=> function ($q) {$q->with('media');}])->get();
                $data=ValidationResouces::collection($validations); 
                $header=[
                    'Id' ,
                    'Name'  ,
                    'Type',
                    'Description',
                    'Status',
                    'Provider Name',
                    'Provider Image Url' 
                
                ];
                return Excel::download(new ExcelExport($data,$header ), 'validations.xlsx');




            case('costs'):
                $costs =  Cost::where('case_id',$case_id)->orderBy('name', 'asc')->get();
                $data=CostResouces::collection($costs); 
                $header=[

                    'Id' ,
                    'Name'  ,
                    'Value' ,
                    'Status',
                 
                ];
                return Excel::download(new ExcelExport($data,$header ), 'costs.xlsx');






            case('case_donors'):
                $case_donors = CaseDonor::where('case_id',$case_id)->with(['case','donor'])->get();
                $data=CaseDonorsResouces::collection($case_donors); 
                $header=[
                    'Id' ,
                    'Secret Name',
                    'Amount' ,
                    'Donation Percentag',
                    'Donation Date And Time',
                    
                ];
                return Excel::download(new ExcelExport($data,$header ), 'caseDonors.xlsx');





            case('followers'):
                $followers =CaseFollower::where('case_id',$case_id)->with(['donor'=>function ($q) {  $q->with('media','user');}])->get();
                $data=CaseFollowersResouces::collection($followers); 
                $header=[

                    'Id',
                    'Full Name' ,
                    'Following Ddate',
                    'Image Url' ,
                    
                ];
                return Excel::download(new ExcelExport($data,$header ), 'Followers.xlsx');



            case('case_updates'):
                $case_updates =  CaseUpdate::where('case_id',$case_id)->with(['media','creator'])->get();
                $data=CaseUpdateResouces::collection($case_updates); 
                $header=[

                    'Id',
                    'Description',
                    'Image Url' ,
                    'Created At'  ,
                    'Views Count',
                    'Created By',
                    
                ];
                return Excel::download(new ExcelExport($data,$header ), 'CaseUpdates.xlsx');



            default:
                $msg = 'Something went wrong.';


                
        
        
            }
    }

 
  


}
