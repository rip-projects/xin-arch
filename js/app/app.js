;(function() {

    var ValueDirective = function() {

    };

    _.extend(ValueDirective.prototype, {
        matcher: function($el) {
            return $el.data('value');
        },

        run: function($el) {
            $el.html($el.data('value'));
        }
    });

    window.app = new xin.App({
        el: xin.$('body'),
        directives: {
            '[data-role=app]': xin.directive.AppDirective,
            '[data-role]': xin.directive.RoleDirective,
            '[data-uri]': xin.directive.URIDirective,
            '[data-bind]': xin.directive.BindDirective,
            '[data-value]': ValueDirective,
            '[data-background]': xin.directive.BackgroundDirective
        },
        middlewares: {
            'AuthMiddleware': AuthMiddleware
        },
        providers: {

        }

    });

    _.extend(app, {
        db: null,
        user: {},
        config: function(param) {

            if(param) {
                return window.config[param];
            } else {
                return window.config;
            }

        },

        invoke: function(api, param, cb) {

            api = api.split('.');
            if(typeof(param) == "function") {
                window.API[api[0]][api[1]](param);
            } else {
                delete arguments[0];
                var opt = [],
                    j = 0;
                for (var i in arguments) {
                    opt.push(arguments[i]);
                }
                window.API[api[0]][api[1]].apply(this, opt);
            }
        },

        loading: {

            show: function(options) {
                ActivityIndicator.show(options);
            },
            hide: function() {
                ActivityIndicator.hide();
            }

        },

        storage: function(type, key, value, cb) {

            if (!key && !value) return;
            if(key && !value) {
                var res = window[type].getItem(key);
                try {
                    res = JSON.parse(res);
                } catch(e) {}

                if(cb) cb(res);

            } else if(key && value) {
                if(typeof value !== "string") value = JSON.stringify(value);
                window[type].setItem(key, value);
            }
        },

        sessionStorage: function(key, value) {
            if(typeof value === 'function') {
                this.storage('sessionStorage', key, undefined, value);
            } else {
                this.storage('sessionStorage', key, value);
            }
        },

        localStorage: function(key, value) {
            if(typeof value === 'function') {
                this.storage('localStorage', key, undefined, value);
            } else {
                this.storage('localStorage', key, value);
            }
        },

        clearStorage: function(type) {  //  type = localStorage || sessionStorage
            if(!type) {
                localStorage.clear();
                sessionStorage.clear();
                return;
            }

            if(type === 'localStorage' || type === 'sessionStorage') {
                window[type].clear();
            }
        }

    });

})();
