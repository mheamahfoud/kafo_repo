<?php

namespace App\Repositories\Eloquent;
use App\Models\System;
use App\Repositories\Interfaces\SystemRepositoryInterface;
class SystemRepository extends BaseRepository implements SystemRepositoryInterface
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
    public function __construct(System $model )
    {
       
    
    }



}