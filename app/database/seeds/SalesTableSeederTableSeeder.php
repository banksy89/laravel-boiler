<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class SalesTableSeederTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Sale::create([
				'status' => '1',
				'title' => $faker->sentence,
				'description' => $faker->sentence,
				'start_date' => date('d-m-Y'),
				'end_date' => date('d-m-Y'),
				'target_gender' => 'm',
			]);

			Sale::create([
				'status' => '1',
				'title' => $faker->sentence,
				'description' => $faker->sentence,
				'start_date' => date('d-m-Y'),
				'end_date' => date('d-m-Y'),
				'target_gender' => 'f',
			]);

			Sale::create([
				'status' => '0',
				'title' => $faker->sentence,
				'description' => $faker->sentence,
				'start_date' => date('d-m-Y'),
				'end_date' => date('d-m-Y'),
				'target_gender' => 'f',
			]);
		}
	}

}