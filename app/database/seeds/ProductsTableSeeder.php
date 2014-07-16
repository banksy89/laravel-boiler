<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Product::create([
				'title' => $faker->sentence,
				'sizes' => '123',
				'sku_product_id' => $faker->randomDigitNotNull,
				'colour' => $faker->colorName,
				'gender' => 'Male',
				'product_category_id' => $faker->randomDigitNotNull,
				'description' => $faker->sentence,
				'price_rrp' => $faker->randomDigitNotNull,
				'price' => $faker->randomDigitNotNull,
				'sale_id' => '34',
				'size_guide' => 'asdsd',
				'outlet' => '',
				'outlet_category_id' => '',
				'outlet_sub_category_id' => '',
				'quantity' => '23',
				'seo_title' => $faker->sentence,
				'seo_description' => $faker->sentence,
				'created_at' => date('Y-m-d H:i:s')
			]);
		}
	}

}