<?php

namespace App\Http\Controllers\Api\V1\Mobile\Setup;

use App\Models\User;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Components\Core\Utilities\Helpers;
use App\Repositories\Interfaces\DonorRepositoryInterface;
use App\Models\City;
use App\Models\Country;


use Carbon\Carbon;
use Spatie\MediaLibrary\Models\Media;
use Lang;

class SetupController extends Controller
{
    //
    private $donorRepository;


    public function __construct(DonorRepositoryInterface $donorRepository)
    {
        $this->donorRepository = $donorRepository;
    }




    public function index_city(Request $request)
    {
        $lang = $request->header('lang');
        if ($lang == 'en')
            return   Response::respondSuccess(City::select('id as value', 'name as text','country_id as country_id' )->get());

        else{
            return   Response::respondSuccess(City::select('id as value', 'ar_name as text','country_id as country_id' )->get());
        }
    }
    


    public function index_country(Request $request)
    {
        $lang = $request->header('lang');
        if ($lang == 'en')
            return   Response::respondSuccess(Country::select('id as value', 'name as text')->get());

        else{
            return   Response::respondSuccess(Country::select('id as value', 'ar_name as text')->get());
        }

    }
}
