<?php

class AdminAjaxController extends \BaseController
{
	public function delete()
	{
		$response = array('status' => 500);

		if (Request::ajax()) {
			$model = ucfirst($_POST['table']);
			$model = new $model();

			if (!!Input::get('ids')) {
				$output = $model->destroy(Input::get('ids'));

				if ($output) {
					$response['status'] = 200;
				}
			}
		}

		exit (json_encode($response));
	}

	public function listing()
	{
		$response = array('status' => 500);
		
		if (Request::ajax()) {
			$table = $_POST['table'];

			// pluraise the table
			$model = DB::table($table.'s');

			foreach (Input::get('params') as $param) {
				if (!!$param['value']) {
					$model->where($param['type'], 'LIKE', "%".$param['value']."%");
				}
			}

			$data = $model->get();
			
			if (!!$data) {

				$response = array('status' => 200, 'results' => $data);
			}
		}

		exit(json_encode($response));
	}
}

?> 