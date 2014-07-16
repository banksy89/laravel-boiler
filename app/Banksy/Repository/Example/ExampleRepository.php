<?php namespace Banksy\Repository\Example;

use Banksy\Repository\AbstractRepository;

use Example;

class ExampleRepository extends AbstractRepository implements InterfaceExampleRepository {

	public function __construct(Example $model)
	{
		parent::__construct($model);
	}


}
