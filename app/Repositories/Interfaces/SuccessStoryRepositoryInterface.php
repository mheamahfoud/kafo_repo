<?php

namespace App\Repositories\Interfaces;

interface SuccessStoryRepositoryInterface extends EloquentRepositoryInterface {

    public function increaseViews($story_id);
 
}