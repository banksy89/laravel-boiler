<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Laravel PHP Framework</title>
</head>
<body>
	<div class="welcome">
		{{ Form::open(array('action' => 'UserController@store')) }}
	
			<p>{{ Form::label('email', 	'Email address') }} {{ Form::text('email', null, array('class' => '123')) }} </p>
			<p>{{ Form::label('password', 	'Password') }} {{ Form::password('password', null, array('class' => '123')) }} </p>
			<p>{{ Form::submit('save') }} </p>

		{{ Form::close() }}		
	</div>
</body>
</html>
