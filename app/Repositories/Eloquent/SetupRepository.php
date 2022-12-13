<?php

namespace App\Repositories\Eloquent;
use App\Models\FAQ;
use App\Repositories\Interfaces\SetupRepositoryInterface;
class SetupRepository extends BaseRepository implements SetupRepositoryInterface
{
    /**
     * @var Model
     */
    protected $modelFAQ;
 
    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(FAQ $modelFAQ )
    {
        $this->modelFAQ = $modelFAQ::where('is_active',1);
    
    }

  

}