<?php namespace Banksy\Presenter;

use Banksy\Presenter\InterfacePresenter;

abstract class AbstractPresenter implements InterfacePresenter {

	protected $model;

	public function __construct($model)
	{
		$this->model = $model;
	}

	/**
	 * Find
	 *
	 * @return Illuminate\Database\Eloquent\Model
	 */
	public function find($id)
	{
		return $this->model->find($id);
	}

	/**
	 * All
	 * 
	 * @return Illuminate\Database\Eloquent\Model
	 */
	public function all()
	{
		return $this->model->all();
	}
}