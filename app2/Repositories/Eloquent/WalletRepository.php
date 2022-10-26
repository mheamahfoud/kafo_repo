<?php

namespace App\Repositories\Eloquent;
use App\Models\Wallet;
use App\Repositories\Interfaces\WalletRepositoryInterface;
class WalletRepository extends BaseRepository implements WalletRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;
 
    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Wallet $model )
    {
        $this->model = $model;
    
    }



  


}