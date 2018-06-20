# Simple Hash Router

## Define and handle routes
```javascript
<script src="hash-router.js"></script>
<script>
    var routes = {
        '/': function() {
            console.log('callback for "/"');
        },
        '/hello': function() {
            console.log('callback for /hello');
        },
        '/user/:id': function(params) {
            console.log('Route with params. Callback for /user/:id', params, params.id);
        },
        '*': function(params, router) {
            console.log('Match all routes. Example: 404');
            // Redirect to '/' all 404 routes.
            router.navigate('/');
        }
    };

    var router = new HashRouter(routes);
</script>
```

## Cache Manager (Optional)
If you want to cache data to avoid external requests you can use the cache manager.
```javascript
<script src="hash-router.js"></script>
<script src="cache-manager.js"></script>
<script>
    var cacheManager = new CacheManager;
    var routes = {
        // ...
        '/your-ip': function() {
            console.log('callback for /your-ip');
            var data = cacheManager.get('your-ip');
            if (!data) {
                fetch('https://api.ipify.org?format=json')
                    .then(function(response) { return response.json(); })
                    .then(function(json) {
                        cacheManager.set('your-ip', json);
                        document.getElementById('wrapper').textContent = 'IP: ' + json.ip;
                    });
            } else {
                console.log('serving from cache');
                document.getElementById('wrapper').textContent = 'IP: ' + data.ip + ' (CACHED DATA)';
            }
        },
        // ...
    };

    var router = new HashRouter(routes);
</script>
```