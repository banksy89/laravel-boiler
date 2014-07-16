<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSales extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sales', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('status');
			$table->string('title');
			$table->string('description');
			$table->date('start_date');
			$table->date('end_date');
			$table->string('target_gender');

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
		Schema::drop('sales');
	}

}
