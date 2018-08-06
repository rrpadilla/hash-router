var HashRouterLib = function(w, isModule) {
    var reference = "HashRouter";
    var HashRouter = function (routes, autoResolve) {
        autoResolve = typeof autoResolve !== 'undefined' ? autoResolve : true;
        this.routes = [];
        if (typeof routes === 'object') {
            for (var route in routes) {
                this.add(route, routes[route]);
            }
        } else if (Array.isArray(routes)) {
            this.routes = routes;
        }
        window.onhashchange = this.hashChanged.bind(this);
        if (this.routes.length && autoResolve) {
            this.resolve();
        }
    };
    HashRouter.prototype = {
        add: function (route, handler) {
            if (typeof route === 'string') {
                route = encodeURI(route);
            } else if (typeof route === 'function') {
                handler = route;
                route = '';
            }
            this.routes.push({route: route, handler: handler});
            return this;
        },
        matchAnyRoute: function (route) {
            return route === '*';
        },
        matchRootRoute: function (url, route) {
            return (url === '' || url === '#/') && (route === '' || route === '/');
        },
        isRootRoute: function (route) {
            return route === '' || route === '/';
        },
        extractParamsFromMatch: function (match, paramNames) {
            if (!match || paramNames.length === 0) return null;
            return match
                .slice(1, match.length)
                .reduce(function (params, value, index) {
                    params = params || {};
                    params[paramNames[index]] = decodeURIComponent(value);
                    return params;
                }, null);
        },
        check: function (url) {
            var i, match, route, paramNames = [], params = [], regexp, $this = this;
            url = url || window.location.hash;
            for (i = 0; i < this.routes.length; i++) {
                route = this.routes[i].route;
                if (this.matchAnyRoute(route) || this.matchRootRoute(url, route)) {
                    this.routes[i].handler(params, $this);
                    return this;
                }
                if (this.isRootRoute(route)) {
                    continue;
                }
                paramNames = [];
                regexp = new RegExp(
                    route.replace(/([:*])(\w+)/g, function (full, dots, name) {
                        paramNames.push(name);
                        return '([^\/]+)';
                    }).replace(/\*/g, '(?:.*)') + '(?:\/$|$)', '');
                match = url.replace(/^\/+/, '/').match(regexp);
                if (match) {
                    params = this.extractParamsFromMatch(match, paramNames);
                    if (typeof this.routes[i].handler === 'function') {
                        this.routes[i].handler(params, $this);
                    }
                    return this;
                }
            }
            return this;
        },
        resolve: function () {
            this.check(window.location.hash);
        },
        hashChanged: function (ev) {
            this.resolve();
        },
        navigate: function (path) {
            window.location.hash = path;
            return this;
        }
    };
    if (isModule){
        return HashRouter;
    } else {
        w[reference] = HashRouter;
    }
};
if (typeof module === 'undefined'){
    HashRouterLib(window);
} else {
    module.exports = HashRouterLib(window, true);
}
