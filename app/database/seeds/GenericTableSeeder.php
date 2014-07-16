<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class GenericTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		Generic::create([
			'type' => 'returns',
			'content' => 'Returns content information'
		]);

		Generic::create([
			'type' => 'delivery',
			'content' => 'Delivery content information'
		]);
	}

}