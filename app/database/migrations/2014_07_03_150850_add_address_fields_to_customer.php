<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAddressFieldsToCustomer extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('customers', function(Blueprint $table)
		{
			$table->string('postcode_one');
			$table->string('postcode_two');
			$table->string('address');
			$table->string('address_two');
			$table->string('town');
			$table->string('county');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
