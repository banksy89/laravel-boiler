<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="author" content="" />

        <title></title>

        <script src="/assets/admin/scripts/utils/modernizr.min.js"></script>
        
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <?php if (1==1): ?>
            <!--[if lte IE 8]>
            <link rel="stylesheet" href="assets/admin/styles/nomq.css">
            <![endif]-->
        <?php else: ?>
            <?php foreach( $stylesheets as $style ): ?>
                <!--[if lte IE 8]>
                <link rel="stylesheet" href="<?php echo $style; ?>">
                <![endif]-->
            <?php endforeach; ?>
        <?php endif; ?>
        <?php foreach( $stylesheets as $style ): ?>
            <!--[if gt IE 8]>-->
            <link rel="stylesheet" href="<?php echo $style; ?>">
            <!--<![endif]-->
        <?php endforeach; ?>
    </head>
    <body>
        <?php include "public/assets/admin/includes/header.php"; ?>
        <div class="wrapper">
            <?php include "public/assets/admin/includes/navigation.php"; ?>
            <section class="container">
                <div class="content grid">
					<?php echo $view_to_load; ?>
				</div>
            </section>
        </div>
        <script>
            var site_path = "/"; 
        </script>
        <?php if (!!$script): ?>
            <script data-main="/assets/admin/scripts/app/<?php echo $script; ?>" src="/assets/admin/scripts/require.min.js"></script>
        <?php endif; ?>
    </body>
</html>