<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Employee;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

           // create admin account
           $AdminUser = User::create([
            'id'=>1,
            'name' => 'Superadmin',
            'email' => 'admin@example.com',
            'password' => \Hash::make('123456') ,
           // 'email_verfied'=>
            //'remember_token' => str_random(10),
            'last_login' => \Carbon\Carbon::now(),
           // 'activation_key' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
            'is_active'=>1,
         
        ]);


        // create admin account
         $employeeUser = Employee::create([
                    'id'=>1,
                    'user_id' => 1,
                 
        ]);
       $AdminUser->assignRole('superadmin');
 
      /*  app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        //add static roles 
        foreach(config('constants.roles')  as $name){
                 $StaticRole = Role::create([
                    'name' => $name,
                    'guard_name'=>'api',
                ]);
        }*/

    }
    
}
