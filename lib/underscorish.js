define(function () {

    var _ = { };

    (function() {

        // TODO Description
        _.each = function(collection, iterator) {
            if ( collection === undefined )
                return;
            else if (collection.length) {
                for ( var i = 0; i < collection.length; i++)
                    iterator(collection[i], i, collection);
            } else {
                for (var key in collection) {
                    iterator(collection[key], key, collection);
                }
            }
        };

        // TODO Description
        _.map = function(array, iterator) {
            var mapped = [];
            _.each(array, function(item){
                mapped.push(iterator(item));
            })
            return mapped;
        };

        // TODO Description
        _.reduce = function(collection, iterator, initialValue) {
           initialValue = initialValue || 0;
            _.each(collection, function(value){
               initialValue = iterator(initialValue, value);
            });
           return initialValue;
        };

        // TODO Description
        _.contains = function(collection, target) {
            return _.reduce(collection, function(wasFound, item) {
                if(wasFound) {
                    return true;
                }
                return item === target;
            }, false);
        };

        // TODO Description
        _.every = function(collection, iterator) {
            return _.reduce(collection, function(wasTrue, value){
                if (wasTrue)
                    if(iterator)
                        return iterator(value) ? true : false;
                    else
                        return (value) ? true : false;
                else
                    return false;
            }, true);
        };

        // TODO Description
        _.some = function(collection, iterator) {
            return !_.every(collection, function(value) {
                return (iterator) ? !iterator(value): !value;
            });
        };


    })();
    return _ ;
});
