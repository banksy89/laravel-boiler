<?php

class ExampleProduct extends \Eloquent {

	public static $unguarded = true; 

	protected $table = 'products';

	public function productCategory()
	{
		return $this->belongsTo('ProductCategory');
	}

	public function category()
	{
		return $this->belongsTo('Category', 'category_id');
	}

	public function subCategory()
	{
		return $this->belongsTo('SubCategory', 'sub_category_id');
	}

	public function sale()
	{
		return $this->belongsTo('Sale');
	}

	public function sizeGuide()
	{
		return $this->belongsTo('SizeGuide');
	}

	public function productColour()
	{
		return $this->belongsTo('ProductColour', 'colour');
	}

	public function productSize()
	{
		return $this->hasMany('ProductSize');
	}

	public function image()
	{
		return $this->hasMany('Image')->orderBy('order', 'ASC');
	}

	public function getDescriptionAttribute()
	{
		return strip_tags($this->attributes['description']);
	}

	public function getSavingTotalAttribute()
	{
		return Helpers::priceFormat($this->attributes['price_rrp']-$this->attributes['price']);
	}

	/**
	 * Retreive the quantity of all Products associated sizes
	 * 
	 * @return string
	 */
	public function getQuantityAttribute()
	{
		if ($this->productSize->count() > 0) {
			return $this->productSize->sum('quantity');
		} else {
			return $this->attributes['quantity'];
		}
	}

	public function setTitleAttribute($title)
	{
		$this->attributes['title'] = ucfirst($title);
	}

	public function setUrltitleAttribute()
	{
		$this->attributes['urltitle'] = Str::slug($this->attributes['title']).'-product-id-'.$this->attributes['sku_product_id'];
	}

	/**
	 * Query for finding associated gender
	 * 
	 * @param \Laravel\Eloquent\Model
	 * @param array $genders
	 * 
	 * @return \Laravel\Eloquent\Model
	 */
	public function scopeGender($query, $genders)
	{
		$genders = (!is_array($genders)?explode(',', $genders):$genders);
		
		$i=0;
		foreach ($genders as $gender) {

			$query->where('gender', '=', $gender);

			$i++;
		}

		return $query;
	}

	public function scopePrice($query, $from, $binds=array())
	{
		return $query->whereRaw($from, $binds);
	}

	/**
	 * Find products where sizes within the product sizes table
	 * are matched within the colour colours array
	 * 
	 * @param \Laravel\Eloquent\Model
	 * @param array $colours
	 * 
	 * @return \Laravel\Eloquent\Model
	 */
	public function scopeSizes($query, $sizes)
	{
		$output = $query->whereHas('productSize', function($query) use ($sizes) {
			
			$sizes = (!is_array($sizes)?explode(',', $sizes):$sizes);

			$i=0;
			foreach ($sizes as $cat) {

				$query->where('size', '=', $cat);

				$i++;
			}

		});

		return $output;
	}

	/**
	 * Filter for colours associated to products
	 * 
	 * @param \Laravel\Eloquent\Model
	 * @param array $colours
	 * @param string optional $join
	 * 
	 * @return \Laravel\Eloquent\Model
	 */
	public function scopeColours($query, $colours, $join="")
	{
		$colours = (!is_array($colours)?explode(',', $colours):$colours);

		$i=0;
		foreach ($colours as $colour) {

			$query->where('colour', '=', $colour, ($i==0 ? $join : 'OR'));

			$i++;
		}

		return $query;
	}

	/**
	 * Filter for categories associated to products
	 * 
	 * @param \Laravel\Eloquent\Model
	 * @param array $categories
	 * @param string optional $join
	 * 
	 * @return \Laravel\Eloquent\Model
	 */
	public function scopeSubCategories($query, $categories, $join="")
	{
		$categories = (!is_array($categories)?explode(',', $categories):$categories);
		
		$i=0;
		foreach ($categories as $colour) {

			$query->where('sub_category_id', '=', $colour, ($i==0 ? $join : 'OR'));

			$i++;
		}

		return $query;
	}

	/**
	 * Filter for categories associated to products
	 * 
	 * @param \Laravel\Eloquent\Model
	 * @param array $categories
	 * @param string optional $join
	 * 
	 * @return \Laravel\Eloquent\Model
	 */
	public function scopeCategories($query, $categories, $join="")
	{
		$categories = (!is_array($categories)?explode(',', $categories):$categories);
		
		$i=0;
		foreach ($categories as $colour) {

			$query->where('category_id', '=', $colour, ($i==0 ? $join : 'OR'));

			$i++;
		}

		return $query;
	}
}
