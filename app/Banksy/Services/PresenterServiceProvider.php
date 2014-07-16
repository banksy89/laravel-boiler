<?php namespace Banksy\Services;

use Illuminate\Support\ServiceProvider;
use Example;
use Banksy89\Presenter\Example\ExamplePresenter;

class PresenterServiceProvider extends ServiceProvider {

    // Triggered automatically by Laravel
    public function register()
    {
        $this->registerExamplePresenter();
    }

    /**
     * Example Presenter
     *
     * @return Banksy\Presenter\Example\ExamplePresenter
     */
    public function registerExamplePresenter()
    {
        $this->app->bind('Banksy\Presenter\Example\InterfaceExamplePresenter', function($app)
        {
            return new ExamplePresenter(new Example);
        });

        // Register the facade

        $this->app['examplepresenter'] = $this->app->share(function($app)
        {
            return new \Banksy\Presenter\Example\ExamplePresenter;
        });

        // Shortcut so developers don't need to add an Alias in app/config/app.php
        $this->app->booting(function()
        {
            $loader = \Illuminate\Foundation\AliasLoader::getInstance();
            $loader->alias('ExamplePresenter', 'Banksy\Facades\ExamplePresenter');
        });

    }

}

?>
