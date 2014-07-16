<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('customer_id');
			$table->integer('delivery_id');
			$table->integer('billing_id');
			$table->integer('promo_code_id');
			$table->integer('status');
			$table->string('sub_total');
			$table->string('total');
			$table->string('delivery_total');
			$table->string('payment_reference');
			$table->text('comments');
			$table->string('order_reference');
			$table->integer('order_id');
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
		//
	}

}
