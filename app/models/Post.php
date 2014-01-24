<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class Post extends Eloquent {

	protected $guarded = array('id');

	protected $fillable = array('title', 'users_id');

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';

	public function item() 
	{
        return $this->belongsTo('User');
    }

}