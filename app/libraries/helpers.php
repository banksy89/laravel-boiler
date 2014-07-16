<?php

class Helpers 
{
	public static function checkRemoteFileExists($file)
	{
		$ch = curl_init($file);

		curl_setopt($ch, CURLOPT_NOBODY, true);
		curl_exec($ch);

		$retcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		curl_close($ch);

		return $retcode;
	}

	public static function priceFormat($price)
	{
		return number_format($price, 2, '.', '');
	}

	public static function getQueryString()
	{
		$url = Request::fullUrl();
		$url = explode('?', $url);

		if (isset($url[1])) {
			return $url[1];
		} 
	}

	public static function days_till_date($date)
	{
		$date = date('d-m-Y', strtotime($date));

		$datetime1 = new DateTime($date);
		$datetime2 = new DateTime('now');
		$interval = $datetime1->diff($datetime2);

		return $interval->format('%d');
	}

	public static function last_query()
	{
		$queries = \DB::getQueryLog();
		$last_query = end($queries);

		die(print_r($last_query));
	}

	public static function array_filter_duplicates($data)
	{
		return $data = array_map("unserialize", array_unique(array_map("serialize", $data)));
	}

	/**
	 * Creates a random string
	 *
	 * @param int $Length ( default 20 )
	 *
	 * @return string $string
	 */
	public static function random_string($length = 20)
	{
	    $chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    srand ( (double) microtime () * 1000000 );
	    $i = 0;
	    $string = '' ;
	    while ($i <= $length) {
	        $num = rand () % 33;
	        $tmp = substr ( $chars, $num, 1 );
	        $string = $string . $tmp;
	        $i++;
	    }

	    return $string;
	}

}

?>