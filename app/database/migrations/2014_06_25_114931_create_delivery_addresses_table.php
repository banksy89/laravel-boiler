<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDeliveryAddressesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('delivery_addresses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('address');
			$table->string('address_two');
			$table->string('town');
			$table->string('county');
			$table->string('postcode_one');
			$table->string('postcode_two');
			$table->string('title');
			$table->string('forename');
			$table->string('surname');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('delivery_addresses');
	}

}
