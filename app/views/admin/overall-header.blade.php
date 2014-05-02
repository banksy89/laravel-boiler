<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">

        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="author" content="" />

        <title><?php echo SITE_NAME; ?> - <?php echo $title; ?></title>

        <script src="assets/admin/scripts/utils/modernizr.min.js"></script>
        
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <?php if (MEDIA_QUERIES): ?>
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
        <?php include "assets/admin/includes/header.php"; ?>
        <div class="wrapper">
            <?php include "assets/admin/includes/navigation.php"; ?>
            <section class="container">
                <div class="content grid">
