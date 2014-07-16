<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOpeningTimesToStore extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('stores', function(Blueprint $table)
		{
			$table->string('monday_from');
			$table->string('monday_to');

			$table->string('tuesday_from');
			$table->string('tuesday_to');

			$table->string('wednesday_from');
			$table->string('wednesday_to');

			$table->string('thursday_from');
			$table->string('thursday_to');

			$table->string('friday_from');
			$table->string('friday_to');

			$table->string('saturday_from');
			$table->string('saturday_to');

			$table->string('sunday_from');
			$table->string('sunday_to');

			$table->string('latitude');			
			$table->string('longitude');			

			$table->string('types');			
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
