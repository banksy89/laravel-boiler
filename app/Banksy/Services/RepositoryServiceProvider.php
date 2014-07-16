<?php namespace Banksy\Services;

use Illuminate\Support\ServiceProvider;
use Example;
use Banksy89\Repository\Example\ExampleRepository;

class RepositoryServiceProvider extends ServiceProvider {

    // Triggered automatically by Laravel
    public function register()
    {
        $this->registerExampleRepository();
    }

    /**
     * Example Repository
     *
     * @return Banksy\Repository\Example\ExampleRepository
     */
    public function registerExampleRepository()
    {
        $this->app->bind('Banksy\Repository\Example\InterfaceExampleRepository', function($app)
        {
            return new ExampleRepository(new Example);
        });

        // Register the facade

        $this->app['examplerepository'] = $this->app->share(function($app)
        {
            return new \Banksy\Repository\Example\ExampleRepository;
        });

        // Shortcut so developers don't need to add an Alias in app/config/app.php
        $this->app->booting(function()
        {
            $loader = \Illuminate\Foundation\AliasLoader::getInstance();
            $loader->alias('ExampleRepository', 'Banksy\Facades\ExampleRepository');
        });

    }

}

?>
