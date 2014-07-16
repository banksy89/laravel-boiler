<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class CategoriesTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		$cats = array('T-shirts',
					  'Shoes',
					  'Trousers',
					  'Jeans',
					  'Shirts',
					  'Skirts',
					  'Jumpers',
					  'Shorts'
				);

		$i=0;
		foreach(range(1, 8) as $index)
		{
			Category::create([
				'title' => $cats[$i]
			]);

			$i++;
		}
	}

}