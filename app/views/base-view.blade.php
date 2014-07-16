<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta name="author" content="Storm Creative" />
    <title></title>
    <!--<meta name="keywords" content="">-->
    <meta name="description" content="">
    <link rel="shortcut icon" href="<?php echo $root; ?>/favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?php echo $root; ?>/favicon.ico" type="image/x-icon">
    <script src="<?php echo $root; ?>/assets/scripts/utils/modernizr.min.js"></script>
    <meta name="viewport" content="width=1200">
    
    <?php foreach ($stylesheets as $style): ?>
        <link rel="stylesheet" href="<?php echo $style; ?>" />
    <?php endforeach; ?>
</head>
<body>
    <div class="wrapper <?php echo !!$wrapper_alt?'wrapper--alt':''; ?>">
        @include ("includes/navigation")
        
        <!--<div class="container">-->
            
            <?php echo $view_to_load; ?>
            
        <!--</div>-->
        <a href="#" class="btn btn--back-top js-scroll">Back to <b>top</b></a>
   </div>
<script>
	var site_path = "<?php echo $root; ?>/"; 
    var imagePath = "<?php echo $image_path; ?>"; 
</script>
<?php if ( !!$script ): ?>
    <script data-main="<?php echo $root; ?>/assets/scripts/<?php echo App::environment(); ?>/<?php echo $script; ?>" src="<?php echo $root; ?>/assets/scripts/require.min.js"></script>
<?php endif; ?>
<!--[if lte IE 8]>
    <script type="text/javascript" src="<?php echo $root; ?>/assets/scripts/utils/selectivizr.js"></script>
<![endif]-->
</body>
</html>