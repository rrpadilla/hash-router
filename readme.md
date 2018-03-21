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
        '*': function() {
            console.log('Match all routes. Example: 404');
            // Redirect to '/' all routes.
            router.navigate('/');
        }
    };

    var router = new HashRouter(routes);
</script>
```
### Adding routes ussing add method. Should call resolve() after that.
```javascript
    var router = new HashRouter(routes);
```