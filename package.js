Package.describe({
    summary: "A lightweight meteor-angular bridge, which only do angular bootstrap, nothing more."
});

Package.on_use(function (api) {
    api.use('underscore', 'client');
    api.use('bower', 'client');

    api.export('Angularite', 'client');

    // Install bower components.
    api.add_files('smart.json', 'client');

    api.add_files('bower_components/angular/angular.js', 'client');
    api.add_files('angularite.js', 'client');
});
