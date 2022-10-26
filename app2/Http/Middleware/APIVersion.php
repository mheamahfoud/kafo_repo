<?php


namespace App\Http\Middleware;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request

/**
 * Class APIVersion
 * @package App\Http\Middleware
 * 
 * 
 * 
 */
class APIVersion
{
    /**
     * Handle an incoming request.
     *
     * @param  Request $request
     * @param  Closure $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $guard)
    {
        config(['app.api.version' => $guard]);
        return $next($request);
    }
}
