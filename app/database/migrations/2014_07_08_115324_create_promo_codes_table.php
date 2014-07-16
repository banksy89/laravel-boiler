<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromoCodesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('promo_codes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title');
			$table->string('discount');
			$table->string('type');
			$table->string('code');
			$table->string('amount');
			$table->integer('status');
			$table->date('end_date');
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
		Schema::drop('promo_codes');
	}

}
