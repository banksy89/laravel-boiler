<!doctype html>
<!--[if IE 8]><html class="ie8" dir="ltr" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9" dir="ltr" lang="en"><![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta name="author" content="Ashley Banks" />

        <meta http-equiv="Cache-control" content="NO-CACHE">
        <meta name="robots" content="index, follow">
        <meta name="revisit-after" content="7 days"/>
        <link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
        <script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
        <script src="/assets/scripts/utils/modernizr.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
        <link rel="stylesheet" href="/assets/styleguide/layout.css?v1">
        <link rel="stylesheet" href="/assets/styles/{{$stylesheet}}.css?v1">
    </head>
    <body>
        <div class="wrapper">
            <h1 class="header">Choice Discount - Styleguide</h1>
            <aside class="aside">
                <ul>
                	@foreach ($pages as $page)
                    <li>
                        <h3>
                            <a href="/styleguide/{{$page}}">{{ucwords($page)}}</a>
                        </h3>
                    </li>
                    @endforeach
                </ul>
            </aside>
            <div class="contents">
                <div class="contents__start">
                    <h2 class="contents__header">{{$header}}</h1>
                </div>
                @foreach ($styles as $style)
                <div class="contents-item">
                    <div class="styleguide-element">
                        <span class="styleguide-element__elem">{{ $style['html'] }}</span>

                        <span class="styleguide-element__class">{{ $style['class'] }}</span>
                    </div>
                    <p class="styleguide-element__title">{{(array_key_exists('title', $style)?$style['title']:"")}}</p>
                     <pre>
                        <code>
                            {{ highlight_string($style['html_render'], true) }}
                        </code>
                    </pre>
                </div>
                @endforeach
            </div>
        </div>
    </body>
</html>