<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta name="author" content="Storm Creative" />
    <title></title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <script src="<?php echo $root; ?>/assets/scripts/utils/modernizr.min.js"></script>
    
    <?php foreach ( $stylesheets as $style ): ?>
        <!--[if lte IE 8]>
        <link rel="stylesheet" href="<?php echo $style; ?>">
        <![endif]-->
    <?php endforeach; ?>
    
    <?php foreach ( $stylesheets as $style ): ?>
        <!--[if gt IE 8]>-->
        <link rel="stylesheet" href="<?php echo $style; ?>">
        <!--<![endif]-->
    <?php endforeach; ?>
</head>
<body>
    <div class="wrapper">
        
        
        <div class="container content grid">
            
            <?php include($view_to_load); ?>
            
        </div>
    
   </div>
<script>
	var site_path = "<?php echo $root; ?>/"; 
</script>
<?php if ( !!$script ): ?>
    <script data-main="<?php echo $root; ?>/assets/scripts/<?php echo $script; ?>" src="<?php echo $root; ?>/assets/scripts/require.min.js"></script>
<?php endif; ?>
</body>
</html>