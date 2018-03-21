# Simple Hash Router

## Define and handle routes
```javascript
<script src="__hash-router.js__"></script>
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
        '*': function() {
            console.log('Match all routes. Example: 404');
            // Redirect to '/' all routes.
            router.navigate('/');
        }
    };

    var router = new HashRouter(routes);
</script>
```