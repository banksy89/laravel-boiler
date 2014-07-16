<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreRowsToProducts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('products', function($table)
		{
		    $table->string('product_type');
		    $table->string('tax');
		    $table->string('associated_products');
		    $table->string('material');
		    $table->string('washing_instructions');
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
