/**
 * File Upload Library
 *
 * If the users browser supports the FileReader API then we will use a upload script that implements
 * that in order to display the file to the user. The file will be uploaded to the server when the
 * user clicks on the save button and that will be handled by PHP.
 *
 * If the users browser does not support the FileReader API we will fall back to the flash version
 * of uploadify. If the user doesn't have a up to date version of flash then they will not be able to
 * upload files and a message will need to be displayed.
 *
 * NOTE: The image paths seem to be the path of the file in /assets/scripts/app so you will need to take
 * that into account when requiring files
 *
 * @author Dave Jones
 */
var modules = [ '../utils/uploader/ControllerView',
				'../utils/uploader/UploadifyController',
				'../utils/uploader/CropperView',
				'../utils/swfobject/swfobject',
				'../utils/uploader/error_handlers',
				'../utils/uploader/base' ];

require( modules, function( ControllerView, UploadifyController, CropperView ) {

	error_handlers.base();
	var cropperview = new CropperView();

	if( error_handlers.filereader === true ) {
		base.init();
		var controllerview = new ControllerView();
	}
	else {
		$( '#js-upload-button' ).hide();
		var uploadifycontroller = new UploadifyController();
	}
});