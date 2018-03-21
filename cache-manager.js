function CacheManager() {
    this.cache = {};
}
CacheManager.prototype = {
    has: function(field) {
        return this.cache.hasOwnProperty(field);
    },
    set: function(field, value) {
        this.cache[field] = value;

        return this.cache;
    },
    get: function(field) {
        if (this.cache[field]) {
            return this.cache[field];
        }

        return false;
    },
    clear: function(field) {
        if (field) {
            delete this.cache[field];
        }

        return this;
    }
}