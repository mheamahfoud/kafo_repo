<?php

namespace App\Http\Controllers\Api\V1\Mobile\CaseManagment;
use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Http\Resources\Mobile\V1\SuccessStoryResourcces;

use App\Repositories\Interfaces\SuccessStoryRepositoryInterface;



use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Lang;

class SuccessStoryController extends Controller
{
    //
    private $successStoryRepository;


    public function __construct(SuccessStoryRepositoryInterface $successStoryRepository )
    {
        $this->successStoryRepository = $successStoryRepository;
  
    }
    public function index(Request $request)
    {
            $lang= $request->header('lang');;
            $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
            $stories=$this->successStoryRepository->paginate(  $limit = $rowsPerPage, $columns = ['*'],$relations=['case','media'=> function ($q) {
                $q->where('collection_name', 'Cover_Photo');}]);
            $data=[
                'items' => SuccessStoryResourcces::collection($stories),
                'total' => $stories->total(),
            ];
            return Response::respondSuccess($data);
    }

    
     /**
     * show Case Details
     * @param  int  $request
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request, $id)
    {
        $lang= $request->header('lang');
        try{
            $story =$this->successStoryRepository->findById($id,$columns = ['*'],$relations = ['media', 'case'], $appends = []);
           
            if(!is_null($story)){
              

              $cover_photo=array_filter( $story->media->toArray(),function($val){  return $val['collection_name'] === 'Cover_Photo';  }) ;
             
             $images =array_filter( $story->media->toArray(),function($val){  return $val['collection_name'] === 'images_Success_stories';  }) ;
                $data=[

                    'id' => $story->id,




       'case_id' =>$story->case->id,
                    'case_name' =>   $lang=='en' ? $story->case->name : is_null( $story->case->ar_name) ?  "" : $story->case->ar_name,
                   'cover_photo_url' => count($cover_photo)>0  ? !isset($cover_photo[0]['full_url'])?  null: $cover_photo[0]['full_url'] :null,
                   'vedio_url' => $story->vedio_url,
                    'images'  => array_column($images, 'full_url') ,
                   'description' => $lang=='en' ?   $story->description : $story->ar_description,
                    'created_at' => $story->created_at,
               
                 ];
                 return Response::respondSuccess($data);
            }
            else{
                $message = Lang::get('site.object_not_found',['name'=>__('site.story',[],$lang)],$lang);
                return Response::respondError($message);
            }
 
        }
        catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }

    }



}
