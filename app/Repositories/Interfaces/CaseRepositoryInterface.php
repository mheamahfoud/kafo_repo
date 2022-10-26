<?php

namespace App\Repositories\Interfaces;
use App\Models\SecretInfo;
use App\Models\CaseDonor;
use App\Models\CaseFollower;
use Illuminate\Database\Eloquent\Collection;
interface CaseRepositoryInterface extends EloquentRepositoryInterface {


    public function getDonorCount(): int;
    public function getSecretInfo($case_id): ?SecretInfo;
      /**
     * Donate Case.
     *
     * @param int $payload
     * @return CaseDonor
     */
    public function donate(array $payload): ?CaseDonor;

         /**
     * Delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function CheckDonorFollow($donorId,$caseId): bool;

       /**
     * Delete model by id.
     *
     * @param int $modelId
     * @return bool
     */
    public function followCase(array $payload): ?CaseFollower;


    public function CheckExist($case_id): ?bool;

    public function GetDonors();

    public function checkDonationCaseByDonor($case_id,$donor_id): bool;
}