<?php

namespace App\Http\Controllers\Admin\SetUp;
use App\Components\Core\Utilities\Helpers;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\Admin\FAQResources;
use App\Models\FAQ;
use Carbon\Carbon;
use Lang;

class FAQController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lang=$request->cookie('current_language');
           // Provider::all()->each->delete();
           // $rowsPerPage = ($request->get('rowsPerPage') > 0) ? $request->get('rowsPerPage') : 0;
            $sort_by = $request->get('sort_by');
            $descending = $request->get('descending');
    
            if ($descending == 'false') {
                $orderby = 'asc';
            } elseif ($descending == 'true') {
                $orderby = 'desc';
            } elseif ($descending == '') {
                $orderby = 'desc';
                $sort_by = 'id';
            }
           
           
            $faqs = FAQ::with( ['creator'])->get();
            
            $data=[
                'data' => FAQResources::collection($faqs),
                'total' => count($faqs),
            ];
            return Response::respondSuccess($data);

           
      
        //
    }

 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {
        $lang=$request->cookie('current_language');
            $validate = validator($request->all(), [
                    'ar_question' => 'required',
                    'en_question' => 'required',
                ],
                [
                    'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }

            try {
                DB::beginTransaction();
                $data= $request->all();
                $data['created_at'] = Carbon::now();
                $data['created_by'] = Auth::guard('api')->user()->id;
                $faq = FAQ::create($data);
               DB::commit();
                $message = Lang::get('site.success_added',[],$lang);
                return Response::respondSuccess($faq);
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
            $lang=$request->cookie('current_language');
            $faq = FAQ::find($id);
            if(!is_null($faq)){
                $validate = validator($request->all(), [
                    'ar_question' => 'required',
                    'en_question' => 'required',
                ],
                [
                    'required'  => Lang::get('site.required',['name'=>':attribute'],$lang),
                ]
            );

            if ($validate->fails()) {
                return Response::respondErrorValidation($validate->errors()->first());
            }
            }
            else{
                $message = __('site.object_not_found',['name'=>__('site.driver',[],$lang)],$lang);
                return Response::respondError($message);
            }
            try {
                $faq = FAQ::find($id);
                if(!is_null($faq)){
                    DB::beginTransaction();
                    $input=$request->all();
                    $input['updated_at'] = Carbon::now();
                    $faq->update($input);
                    DB::commit();
                    return Response::respondSuccess($faq);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
     
    }



    public function activateDeactive(Request $request)
    {
        $lang=$request->cookie('current_language');
            try{
                $faq = FAQ::find($request->id) ;
                if(!is_null($faq)){
                    DB::beginTransaction();
                    $data['updated_at'] = Carbon::now();
                    $data['is_active'] =!$faq->is_active;
                    $faq->update($data);
                    DB::commit();
                    return Response::respondSuccess($faq);
                }
                else{
                    $message = Lang::get('site.user_not_found',[],$lang);
                    return Response::respondError($message);
                }
            }
            catch (Exception $e) {
                DB::rollBack();
                return Response::respondError($e);
            }
      
    }



}
