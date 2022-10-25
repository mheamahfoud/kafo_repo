<?php

namespace App\Repositories\Interfaces;
use App\Models\Donor;
use App\Models\User;
use App\Models\RequestWallet;
interface DonorRepositoryInterface extends EloquentRepositoryInterface {


    public function getWalletAmount($donor_id): ?float;

    public function editProfile(array $payload,  $donor_id): ?Donor;
    public function singup(array $payload): ?Donor;
    public function singin($mobile): ?User;


    public function CheckExist($donor_id): ?bool;


    public function GetDonorId($user_id): ?int;

    public function CreateRequest(array $payload): ?RequestWallet;
}