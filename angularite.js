/* Module registry.
{
    'xxx': <module obj>,
    'yyy': <module obj>
}
*/
var _mods = {};

var _defaultTemplateDelimiter = {
    startSymbol: '[[',
    endSymbol: ']]'
};

// Bootstrap registered modules when DOM is ready.
angular.element(document).ready(function() {
    angular.bootstrap(document, _.keys(_mods));
});

// Exported functions.
Angularite = {};

// Set default template delimiter.
//  Any modules created later will be assigned this defaul delimter.
Angularite.setTemplateDelimeter = function(startSymbol, endSymbol) {
    _defaultTemplateDelimiter.startSymbol = startSymbol;
    _defaultTemplateDelimiter.endSymbol = endSymbol;
};

// Define a new module.
Angularite.module = function(modname, deps) {

    // Return the module object if already initialied.
    if (_.has(_mods, modname)) {
        return _mods[modname];
    }

    // Create new module and initilaize.
    var mod = angular.module(modname, deps);
    _mods[modname] = mod;

    // Extend module object with some helpers.
    _.extend(mod, {

        // Override template delimeter for this module.
        setTemplateDelimeter: function(startSymbol, endSymbol) {
            var self = this;
            self.config(['$interpolateProvider',
                function ($interpolateProvider) {
                    $interpolateProvider.startSymbol(_defaultTemplateDelimiter.startSymbol);
                    $interpolateProvider.endSymbol(_defaultTemplateDelimiter.endSymbol);
                }
            ]);
        }
    });

    // Set default template delimiter.
    if (_defaultTemplateDelimiter.startSymbol !== ''
        && _defaultTemplateDelimiter.startSymbol !== '') {
            mod.setTemplateDelimeter(
                _defaultTemplateDelimiter.startSymbol,
                _defaultTemplateDelimiter.endSymbol);
    }

    return mod;
};
