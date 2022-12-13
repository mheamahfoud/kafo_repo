<?php

namespace App\Http\Middleware;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;

class VerifyMobileNumber
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $lang= $request->header('lang');
        if(!isset($lang))
            $lang=$request->cookie('current_language');
          
        if(!Auth::guard('api')->user()->mobile_verfied){
            return Response::respondErrorVerificationCode(__('site.verify_mobile_number',[],$lang));
        }

        return $next($request);
    }
}
