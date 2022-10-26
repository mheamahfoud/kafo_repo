<?php

namespace App\Repositories\Eloquent;
use App\Models\SuccessStory;
use App\Repositories\Interfaces\SuccessStoryRepositoryInterface;
class SuccessStoryRepository extends BaseRepository implements SuccessStoryRepositoryInterface
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
    public function __construct(SuccessStory $model )
    {
        $this->model = $model::where('is_active',1);
    
    }



}