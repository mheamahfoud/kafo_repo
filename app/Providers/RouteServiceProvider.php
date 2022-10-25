<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';
    protected $apiNamespace ='App\Http\Controllers\Api';

    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware(['api','user_accessible'])
                ->namespace($this->namespace)
                ->group(base_path('routes/Admin/api.php'));

                Route::prefix('api')
                ->middleware(['api'])
                ->namespace($this->namespace)
                ->group(base_path('routes/Auth/api.php'));


                
            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));

               
                Route::group([
                    'middleware' => ['api'],
                    'namespace'  => "{$this->apiNamespace}\V1",
                    'prefix'     => 'api/v1',
                ], function ($router) {
                    require base_path('routes/Mobile/api_v1_auth.php');
                });   

                Route::group([
                    'middleware' => ['api','user_accessible'],
                    'namespace'  => "{$this->apiNamespace}\V1",
                    'prefix'     => 'api/v1',
                ], function ($router) {
                    require base_path('routes/Mobile/api_v1.php');
                });    
                
                Route::group([
                    'middleware' => ['api', 'api_version:v2'],
                    'namespace'  => "{$this->apiNamespace}\V2",
                    'prefix'     => 'api/v2',
                ], function ($router) {
                    require base_path('routes/Mobile/api_v2.php');
                });
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by(optional($request->user())->id ?: $request->ip());
        });
    }
}
