<?php

class AdminLoginController extends \BaseController {

	public function loginAction()
	{
		if (Auth::access()->attempt(array('email' => $_POST['username'], 'password' => $_POST['password']))) {

			if (Request::ajax()) {
		    	$result = array('status' => 200);
		    } else {
		    	return Redirect::intended('admin/dashboard');
		    }

		} else {
			$result = array('status' => 500);
			$result['msg'] = "Your credentials are incorrect";
		}

		exit (json_encode($result));
	}

	public function forgottenPasswordAction()
	{
		// If coming through ajax we handle it

		$response = array('status' => 500);

		if (Request::ajax()) {

			$new_password = Helpers::random_string(8);

			$password = Hash::make($new_password);

			$username = Input::get('username');

			$result = DB::table('access')->where('email', $username)->update(array('password' => $password));

			if ($result) {

				Mail::send('emails/admin/forgotten-password', array('password' => $new_password), function($message)
				{
				    $message->to('ash@stormcreative.co.uk', 'CMS User')
				    		->from('no-reply@stormcreative.co.uk')
				    		->subject('CMS New password request');
				});

				$response['status'] = 200;
				$response['msg'] = "Password has been sent to your email";
				
			} else {
				$response['msg'] = "Username not found in system";
			}

		}

		exit (json_encode($response));
	}

}

?>