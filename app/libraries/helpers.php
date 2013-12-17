<?php

class Helpers 
{
	public static function friendly_url($string)
	{
	    $string = preg_replace( "`\[.*\]`U", "", $string );
	    $string = preg_replace( '`&(amp;)?#?[a-z0-9]+;`i', '-', $string );
	    $string = htmlentities( $string, ENT_COMPAT, 'utf-8' );
	    $string = preg_replace( "`&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);`i", "\\1", $string );
	    $string = preg_replace( array( "`[^a-z0-9]`i","`[-]+`") , "-", $string );

	    return strtolower( trim( $string, '-' ) );
	}

	public static function download($filename, $title = "", $location = 'admin/assets/uploads/documents')
	{
	    if ( !$filename )
	        die ( 'must provide a file to download!' );
	    else {
	        $path =  PATH . $location . '/' . $filename;

	        $ext = pathinfo ( $filename, PATHINFO_EXTENSION );

	        if ( file_exists( $path ) ) {

	            $size = filesize( $path );
	            header( 'Content-Type: application/octet-stream' );
	            //header( 'Content-Length: ' . $size );
	            header( 'Content-Disposition: attachment; filename=' . $title . '.' . $ext );
	            header( 'Content-Transfer-Encoding: binary' );

	            $file = fopen( $path, 'rb' );

	            if ($file) {
	                fpassthru( $file );
	                exit;
	            } else {
	                echo $err;
	            }
	        } else
	            die ( 'Appears to be a problem with downloading that file.' );
	    }
	}

	/**
	 * This public static function is used by the work zone section to get the document type from the document name in a multidimensional array,
	 * then add it to the multidimensional array and return the array
	 *
	 * @param array ( multi-dimensional ) $array
	 * @param string $file_key
	 *
	 * @return array ( multi-dimensional )
	 */
	public static function get_file_type($array, $file_key)
	{

	    $i = 0;
	    foreach ($array as $value) {
	        $sections = explode ( '.', $value[ $file_key ] );

	        switch ($sections[ 1 ]) {
	            case ( 'doc' ) :
	                $array[ $i ][ 'div' ] = 'word';
	            break;

	            case ( 'docx' ) :
	                $array[ $i ][ 'div' ] = 'word';
	            break;

	            case ( 'ppt' ) :
	                $array[ $i ][ 'div' ] = 'powerpoint';
	            break;

	            case ( 'pptx' ) :
	                $array[ $i ][ 'div' ] = 'powerpoint';
	            break;

	            case ( 'xlsx' ) :
	                $array[ $i ][ 'div' ] = 'excel';
	            break;

	            case ( 'xls' ) :
	                $array[ $i ][ 'div' ] = 'excel';
	            break;

	            case ( 'pdf' ) :
	                $array[ $i ][ 'div' ] = 'pdf';
	            break;
	        }

	        $i++;
	    }

	    return $array;
	}

	public static function word_limiter($str, $limit = 100, $end_char = '&#8230;')
	{
	    if ( trim( $str ) == '' )
	        return $str;

	    preg_match( '/^\s*+(?:\S++\s*+){1,' . (int) $limit .'}/', $str, $matches );

	    if ( strlen( $str ) == strlen( $matches[0] ) )
	        $end_char = '';

	    //return rtrim ( $matches[0] ) . $end_char;
	    return strip_tags( rtrim ( $matches[0] ) . $end_char );
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