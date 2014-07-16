<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFilterPricesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('filter_prices', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('to');
			$table->string('operator');
			$table->string('from');
			$table->integer('sale_id');
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
		Schema::drop('filter_prices');
	}

}
