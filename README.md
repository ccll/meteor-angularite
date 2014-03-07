meteor-angularite
========================

A lightweight meteor-angular bridge, which only do angular bootstrap, nothing more.

### Install
```
mrt add angularite
```


### Design philosophy

angularite tries to be as small as possible.
> It does only one simple thing: bootstrap angular.

Extendable with other addon packages.
* [angular-ui-router](https://github.com/ccll/meteor-angular-ui-router)
* [angular-bootstrap](https://github.com/ccll/meteor-angular-bootstrap)
* [meteor-spiderable-ui-router](https://github.com/ccll/meteor-spiderable-ui-router)
* ...
* (consider writing you angular packages based on angularite)
* ...

So angularite is suitable for production:
* Choose packages depending on your needs.
* Will not waste precious loading time on JS code you never use.


### API
#### Angularite.setTemplateDelimeter(start, end)
Set the delimeter used in template interpolation. The default is '[[' and ']]'.

#### Angularite.module(modname, deps) -> mod
Define an angular module and it's dependencies. Returns an angular module object.

#### mod.setTemplateDelimeter(start, end)
Override template delimeter in specific module.


### Write your addon based on angularite

The best practise is make a 'weak' dependency on angularite and other bridges.
```
Package.on_use(function(api) {
    api.use('angularite', 'client', {weak:true});
    api.use('ngMeteor', 'client', {weak:true});

    ...
});
```

Then in your addon you can check which bridge is currently using:
```
if (typeof(angularite) !== undefined) {
    ...
} else if (typeof(ngMeteor) !== undefined) {
    ...
}
```

So your package can work with both angularite and ngMeteor, thus not bound to any specific bridge implementation.
