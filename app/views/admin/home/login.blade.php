<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en" class="login-holder"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta name="author" content="Storm Creative" />
        <title>CMS Login</title>
        <meta name="description" content="">
        <script src="/assets/scripts/utils/modernizr.min.js"></script>
        <!--<meta name="viewport" content="" class="js-viewport">-->
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <?php if (1==1): ?>
            <!--[if lte IE 8]>
            <link rel="stylesheet" href="/assets/assets/admin/styles/nomq.css">
            <![endif]-->
        <?php else: ?>
            
                <!--[if lte IE 8]>
                <link rel="stylesheet" href="/assets/admin/styles/layout.css">
                <![endif]-->
            
        <?php endif; ?>
        
        <!--[if gt IE 8]>-->
        <link rel="stylesheet" href="/assets/admin/styles/layout.css">
        <!--<![endif]-->
        
    </head>
    <body class="login-holder">
        <div class="login">
            <h1 class="login__logo">Storm Logo</h1>
            <p class="alert alert--error alert--login-alert js-alert">
                <i class="fa fa-exclamation"></i>
                <span class="js-alert-msg"></span>
                <i class="fa fa-times js-fade-close alert__close"></i>
            </p>
            <div class="js-login-form">
                <form method="POST" action="/admin/login/login" class="form" id="login-form">
                    <p class="form__text">
                        <!--[if lte IE 8]>
                        <label class="form__label">Username</label>
                        <!--<![endif]-->
                        <input type="text" class="form__input form__input--login" name="username" placeholder="Enter username" />
                    </p>
                    <p class="form__text">
                        <!--[if lte IE 8]>
                        <label class="form__label">Password</label>
                        <!--<![endif]-->
                        <input type="password" class="form__input form__input--login" name="password" placeholder="Enter password" />
                    </p>
                    <input type="submit" class="btn btn--save btn--login js-action-btn" data-action="login" value="Login" />
                </form>
                <p class="login__forgotten-prompt js-forgot" data-action="forgotten-password">Forgotten password?</p>
            </div>
            <div class="forgotten-password js-forgotten-password">
                <form method="" action="" class="form" id="forgotten-form">
                    <p class="form__text">
                        <!--[if lte IE 8]>
                        <label class="form__label">Username</label>
                        <!--<![endif]-->
                        <input type="text" class="form__input form__input--login" name="username" placeholder="Enter username" />
                    </p>
                    <input type="submit" class="btn btn--save btn--login js-action-btn" data-action="forgotten" value="Retrieve new password" />
                </form>
                <p class="login__forgotten-prompt js-forgot" data-action="login-form">Back to login.</p>
            </div>
        </div>
        
    <script>
    var site_path = "/"; 
    </script>
    
    <script data-main="/assets/admin/scripts/app/login" src="/assets/admin/scripts/require.min.js"></script>
    
    </body>
</html>
