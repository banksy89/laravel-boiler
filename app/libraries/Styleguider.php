<?php

class Styleguider
{
	protected $file;

	public function __Construct($file="")
	{
		$this->setFile($file);
	}

	/**
	 * Setting the file allows for multiple uses
	 * 
	 * @param string
	 */
	public function setFile($file="")
	{
		$this->file = $file;
		
		return $this;
	}

	/**
	 * @return string
	 */
	protected function getContentOfFile()
	{
		return file_get_contents($this->file);
	}

	/**
	 * @return array
	 */
	public function getStyles()
	{
		return $this->getStyleGuideAtts();
	}

	/**
	 * Retreives the styleguide attributes from the stylesheet
	 * 
	 * @return array
	 */
	protected function getStyleGuideAtts()
	{
		$content = $this->getContentOfFile();
		
		// Returns anything between a /** */ comment
		preg_match_all("!/[*][*]doc(.*?)[*]/!s", $content, $matches);

		$styleguides = $this->cleanUpAtts($matches[1]);

		return $styleguides;
	}

	/**
	 * Tidy up the contents and arrange into an assoc array
	 * 
	 * @param array $styleguides
	 * @return array
	 */
	protected function cleanUpAtts(array $styleguides)
	{
		$clean = array();

		for ($i=0; $i<=count($styleguides); $i++) {

			if (array_key_exists($i, $styleguides)) {
				// Tidy the string up
				$item = trim(str_replace(array("\n"), '', $styleguides[$i]));

				if (!!$item) {
					// Get each item line by line seperated by ; - then get the connection
					// for the key => value - that seperates each one by :
					$items = explode(';', $item);

					foreach ($items as $_item) {
						$_item_s = explode(' : ', trim($_item));

						if (array_key_exists(1, $_item_s)) {
							if ($_item_s[0] == 'html') {
								
								$clean[$i]['html_render'] = $this->formatHtml($_item_s[1]);
								
							}
							$clean[$i][$_item_s[0]] = $_item_s[1];	
						}
					}

				}
			}
		}

		return $clean;
	}

	protected function formatHtml($item) 
	{
		$html = preg_replace('/(\t)/', '<tab>', trim($item));

		$html = explode("<tab>", $html);
		
		$_html = '';

		foreach ($html as $elem) {

			if ($elem == "") {
				$_html .= "  ";
			} else {
				$_html .= $elem."\n";
			} 

		}

		return $_html;
	}
}

?>