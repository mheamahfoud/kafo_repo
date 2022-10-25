<?php

namespace App\Http\Middleware;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;

class UserActivateAccessible
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
        if(!Auth::guard('api')->user()->is_active){
              return Response::respondErrorUnAuthorize(__('site.unAuthorize',[],$lang));
        }

        return $next($request);
    }
}
