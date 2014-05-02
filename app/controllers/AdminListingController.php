<?php

class AdminListingController extends \AdminController {

	public function __Construct()
	{
		parent::__Construct();
		
		$this->addStyle( 'layout' );
		
	}

	public function table($table="")
	{
		$this->render_listing($table);

		return $this->render('admin/listing/index');
	}

	public function tabbed($table="")
	{
		$this->render_listing($table);

		return $this->render('admin/listing/tabbed');
	}

	protected function render_listing($table)
	{
		$columns = $this->columns();
		$data = $this->data($table, $columns);

		$columns_clean = array_map('Helpers::clean_table', explode(',', $columns));

		$this->addTag('columns_clean', $columns_clean);
		$this->addTag('columns', explode(',', $columns));

		$this->addTag('data', $data);
		$this->addTag('table', $table);
	}

	protected function data($table, $columns)
	{
		$model = ucfirst($table);
		$model = new $model();

		if (Request::isMethod('post')) {
			foreach (Input::get('search') as $key => $value) {
				if (!!$value) {
					$model->where($key, 'LIKE', '%'.$value.'%');
				}
			}
		}

		$data = $model->get();

		return $data;
	}

	protected function columns()
	{
		if (Input::has('columns')) {
			$columns = $_GET['columns'];
			$columns .= ',created_at';
		} else {
			$columns = 'title,created_at';
		}

		return $columns;
	}

}

?>