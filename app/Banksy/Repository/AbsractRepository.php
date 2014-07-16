<?php namespace Banksy\Repository;

use Banksy\Repository\InterfaceRepository;

abstract class AbstractRepository implements InterfaceRepository {

	protected $model;

	public function __construct($model)
	{
		$this->model = $model;
	}

	/**
	 * Handling the saving of the product
	 * Including determining whether to create or update
	 * 
	 * @param optional int $id
	 * @return bool
	 */
	public function saveItem($data=array(), $id="")
	{
		if (!!$id) {
			$result = $this->find($id)->update($data);
		} else {
			$result = $this->create($data);
		}
		
		return $result;
	}

	public function make(array $with = array())
	{
		$this->model->with($with);
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
	 * Create
	 *
	 * @param array $data
	 * @return boolean
	 */
	public function create(array $data)
	{
		return $this->model->create($data);
	}

	/**
	 * Update
	 *
 	 * @param array $data
 	 * @return boolean
	 */
	public function update(array $data)
	{
		return $this->model->update($data);
	}

	/**
	 * Delete
	 *
	 * @return boolean
	 */
	public function delete($id)
	{
		return $this->model->find($id)->delete();
	}

}