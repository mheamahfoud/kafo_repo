<?php

namespace App\Http\Controllers\Admin\SetUp;

use App\Models\User;
use App\Components\Core\Utilities\Helpers;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\System;
use Carbon\Carbon;

use Lang;

class TermsConditionController extends Controller
{
    
    public function updateTermCondition(Request $request)
    {
        $lang = $request->cookie('current_language');
        $validate = validator(
            $request->all(),
            [
                'en_description' => 'required',
                'ar_description' => 'required',
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
            System::updateArabicTermCondition($request->ar_description);
            System::updateEnglishTermCondition($request->en_description);
            DB::commit();
            return Response::respondSuccess('success');
        }
        catch (Exception $e) {
            DB::rollBack();
            return Response::respondError($e);
        }
            
    }


    public function getTermCondition(Request $request)
    {
             $ar_desc= System::getArabicTermCondition();
             $en_desc= System::getEnglishTermCondition();
            return Response::respondSuccess([
                "ar_description"=>$ar_desc  ,
                "en_description"=> $en_desc ,
            ]);
    }

}
