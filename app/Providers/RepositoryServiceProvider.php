<?php

namespace App\Providers;

use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\Eloquent\CaseRepository;
use App\Repositories\Eloquent\SuccessStoryRepository;
use App\Repositories\Eloquent\SystemRepository;
use App\Repositories\Eloquent\WalletRepository;
use App\Repositories\Eloquent\DonorRepository;
use App\Repositories\Eloquent\SetupRepository;
use App\Repositories\Interfaces\EloquentRepositoryInterface;
use App\Repositories\Interfaces\CaseRepositoryInterface;
use App\Repositories\Interfaces\SuccessStoryRepositoryInterface;

use App\Repositories\Interfaces\SystemRepositoryInterface;
use App\Repositories\Interfaces\WalletRepositoryInterface;
use App\Repositories\Interfaces\DonorRepositoryInterface;
use App\Repositories\Interfaces\SetupRepositoryInterface;


use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(CaseRepositoryInterface::class, CaseRepository::class);
        $this->app->bind(SuccessStoryRepositoryInterface::class, SuccessStoryRepository::class);

        $this->app->bind(SystemRepositoryInterface::class, SystemRepository::class);
        $this->app->bind(WalletRepositoryInterface::class, WalletRepository::class);
        $this->app->bind(DonorRepositoryInterface::class, DonorRepository::class);
        $this->app->bind(SetupRepositoryInterface::class, SetupRepository::class);
        
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}