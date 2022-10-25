<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Order extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $date = new DateTime();
        $unixTimeStamp = $date->getTimestamp();

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mobile')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('email_verfied')->unique();
            $table->boolean('is_active')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->string('fcm_token')->nullable();
        });


  



              /*
    |--------------------------------------------------------------------------
    | ------------------------------employees--------------------------------------
    |--------------------------------------------------------------------------
    */
        Schema::connection('mysql')->create('employees', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });


        Schema::connection('mysql')->table('employees', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
    });


              /*
    |--------------------------------------------------------------------------
    | ------------------------------driver--------------------------------------
    |--------------------------------------------------------------------------
    */

    Schema::connection('mysql')->create('drivers', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->integer('user_id')->unsigned();
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });


    Schema::connection('mysql')->table('drivers', function (Blueprint $table) {
        $table->foreign('user_id')->references('id')->on('users');
    });
 




              /*
    |--------------------------------------------------------------------------
    | ------------------------------client--------------------------------------
    |--------------------------------------------------------------------------
    */
            Schema::connection('mysql')->create('clients', function (Blueprint $table) {
                $table->increments('id', true)->unsigned();
                $table->integer('user_id')->unsigned();
                $table->integer('created_by')->nullable();
                $table->integer('updated_by')->nullable();
                $table->boolean('is_deleted')->default(0);
                $table->timestamps();
                $table->engine = 'InnoDB';
            });


            Schema::connection('mysql')->table('clients', function (Blueprint $table) {
                $table->foreign('user_id')->references('id')->on('users');
            });


          /*
    |--------------------------------------------------------------------------
    | ------------------------------address--------------------------------------
    |--------------------------------------------------------------------------
    */






    
    Schema::connection('mysql')->create('address', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->string('name', 99);
        $table->text('description', 99);
        $table->float('lat');
        $table->float('lan');
        $table->integer('user_id')->unsigned();
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });

        Schema::connection('mysql')->table('address', function (Blueprint $table) {
                $table->foreign('user_id')->references('id')->on('users');
        });


    /*
        |--------------------------------------------------------------------------
        | ------------------------------status--------------------------------------
        |--------------------------------------------------------------------------
        */

        Schema::connection('mysql')->create('status', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 99);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
    
        /*
        |--------------------------------------------------------------------------
        | ------------------------------order--------------------------------------
        |--------------------------------------------------------------------------
        */
        Schema::connection('mysql')->create('orders', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 99);
            $table->text('description');
            $table->boolean('is_active')->default(1);
            $table->integer('driver_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->float('fee');
            $table->float('price');
            $table->float('copon_price')->nullable();
            $table->boolean('with_copon')->nullable();

            $table->integer('status_id')->unsigned();


            $table->integer('address_id')->unsigned();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
        Schema::connection('mysql')->table('orders', function (Blueprint $table) {
            $table->foreign('address_id')->references('id')->on('address');
        });
        Schema::connection('mysql')->table('orders', function (Blueprint $table) {
            $table->foreign('driver_id')->references('id')->on('drivers');
        });
        Schema::connection('mysql')->table('orders', function (Blueprint $table) {
            $table->foreign('client_id')->references('id')->on('clients');
        });
        
        Schema::connection('mysql')->table('orders', function (Blueprint $table) {
            $table->foreign('status_id')->references('id')->on('status');
        });

        
        Schema::connection('mysql')->create('sub_order', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 99);
            $table->string('description')->default('');
            $table->integer('order_id')->unsigned();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
        
        Schema::connection('mysql')->table('sub_order', function (Blueprint $table) {
            $table->foreign('order_id')->references('id')->on('orders');
        });
    

        Schema::connection('mysql')->create('files', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('path', 99);
            $table->integer('page_count')->unsigned();
            $table->integer('copy_count')->unsigned();

            $table->integer('created_by')->nullable();
            $table->integer('sub_order_id')->unsigned();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        Schema::connection('mysql')->table('files', function (Blueprint $table) {
            $table->foreign('sub_order_id')->references('id')->on('sub_order');
        });


        Schema::connection('mysql')->create('features', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 99);

            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        DB::connection('mysql')->table('features')->insert([
            [
                'name' => 'size',
            ],
            [
                'name' => 'color',
            ],
            [
                'name' => 'binding',
            ],
            [
                'name' => 'is_double',
            ],
           
        ]);


        Schema::connection('mysql')->create('feature_sub_order', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 99);
            $table->integer('sub_order_id')->unsigned();
            $table->integer('feature_id')->unsigned();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
        Schema::connection('mysql')->table('feature_sub_order', function (Blueprint $table) {
            $table->foreign('sub_order_id')->references('id')->on('sub_order');
        });

        Schema::connection('mysql')->table('feature_sub_order', function (Blueprint $table) {
            $table->foreign('feature_id')->references('id')->on('features');
        });




        Schema::connection('mysql')->create('options', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('value', 99);
            $table->integer('feature_id')->unsigned();

            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        Schema::connection('mysql')->table('options', function (Blueprint $table) {
            $table->foreign('feature_id')->references('id')->on('features');
        });

  
        DB::connection('mysql')->table('options')->insert([
            [
                'value' => 'A4',
                'feature_id' => 1,
            ],
            [
                'value' => 'A5',
                'feature_id' => 1,
            ],


            [
                'value' => 'colored',
                'feature_id' => 2,
            ],
            [
                'value' => 'w/B',
                'feature_id' => 2,
            ],
           
        ]);




        Schema::connection('mysql')->create('compination', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('price', 99);
            $table->integer('option1')->unsigned();
            $table->integer('option2')->unsigned();
            $table->boolean('is_active')->default(1);
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
            $table->engine = 'InnoDB';
        });

        DB::connection('mysql')->table('compination')->insert([
            [
                'option1' => 1,
                'option2' => 3,
                'price' => 30,
            ],
            [
                'option1' => 1,
                'option2' => 4,
                'price' => 20,
            ],

            [
                'option1' => 2,
                'option2' => 3,
                'price' => 40,
            ],

            [
                'option1' => 2,
                'option2' => 4,
                'price' =>35,
            ],
           
        ]);

    /*
    |--------------------------------------------------------------------------
    | ------------------------------copony--------------------------------------
    |--------------------------------------------------------------------------
    */
    Schema::connection('mysql')->create('copony', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->date('start_date');
        $table->date('end_date');
        $table->enum('type',['fixed','percentage']);
        $table->string('code');
        $table->float('value');
        $table->float('min_price')->nullable();
 

        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });

    Schema::connection('mysql')->create('copony_user', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->integer('user_id')->unsigned();
        $table->integer('copony_id')->unsigned();
        $table->boolean('is_used')->default(0);
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });
    Schema::connection('mysql')->table('copony_user', function (Blueprint $table) {
        $table->foreign('copony_id')->references('id')->on('copony');
    });
    Schema::connection('mysql')->table('copony_user', function (Blueprint $table) {
        $table->foreign('user_id')->references('id')->on('users');
    });


    /* |--------------------------------------------------------------------------
    | Balance
    |--------------------------------------------------------------------------
    */


    Schema::connection('mysql')->create('balance', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->integer('user_id')->unsigned();
        $table->float('value');
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });
    Schema::connection('mysql')->table('balance', function (Blueprint $table) {
        $table->foreign('user_id')->references('id')->on('users');
    });


    /*
    |--------------------------------------------------------------------------
    | payments
    |--------------------------------------------------------------------------
    */


    Schema::create('driver_payout', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->string('description')->default('');
        $table->integer('order_id')->unsigned();
        $table->integer('driver_id')->unsigned();
        $table->float('amount')->unsigned();
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->unsignedInteger('user_id');
      $table->engine = 'InnoDB';
    });
    
    Schema::connection('mysql')->table('driver_payout', function (Blueprint $table) {
        $table->foreign('user_id')->references('id')->on('users');
    });

    Schema::connection('mysql')->table('driver_payout', function (Blueprint $table) {
        $table->foreign('order_id')->references('id')->on('orders');
    });

    /*
    |--------------------------------------------------------------------------
    | user_code
    |--------------------------------------------------------------------------
    */
    Schema::create('user_code', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->string('otp')->default('');
        $table->integer('user_id')->unsigned();
      //  $table->integer('expired_date')->unsigned();
        $table->date('expired_date');
        $table->integer('number_of_times')->unsigned();
        $table->date('last_date');
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
      $table->engine = 'InnoDB';
    });


    Schema::connection('mysql')->table('user_code', function (Blueprint $table) {
        $table->foreign('user_id')->references('id')->on('users');
    });



    
    /*
    |--------------------------------------------------------------------------
    | binding_range
    |--------------------------------------------------------------------------
    */
    Schema::connection('mysql')->create('binding_range', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->integer('value')->unsigned();
        $table->float('price');
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });


       /*
    |--------------------------------------------------------------------------
    | ------------------------------system key--------------------------------------
    |--------------------------------------------------------------------------
    */

    Schema::connection('mysql')->create('system_config', function (Blueprint $table) {
        $table->increments('id', true)->unsigned();
        $table->string('key', 191);
        $table->text('value');
        $table->integer('created_by')->nullable();
        $table->integer('updated_by')->nullable();
        $table->boolean('is_deleted')->default(0);
        $table->timestamps();
        $table->engine = 'InnoDB';
    });



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql')->drop('features');
        Schema::connection('mysql')->drop('sub_order');
        Schema::connection('mysql')->drop('driver_payout');
        Schema::connection('mysql')->drop('orders');
        Schema::connection('mysql')->drop('copony_user');
        Schema::connection('mysql')->drop('copony');
        Schema::connection('mysql')->drop('balance');
        Schema::connection('mysql')->drop('address');
        Schema::connection('mysql')->drop('user_code');
        Schema::connection('mysql')->drop('binding_range');
        Schema::connection('mysql')->drop('compination');
        
        Schema::connection('mysql')->drop('users');
        


    }
}