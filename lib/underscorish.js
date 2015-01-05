define(function () {

    var _ = { };

    (function() {

        // ### each
        // `_.each(collection, iterator)`
        //
        // **Public:** _Traverse a collection and run an iterator over each element of the collection._
        //
        // **collection**    - A list of items in an array or object.
        //
        // **iterator** - A Function to be called on each item of the collection.
        //
        // Returns nothing.
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

        // ### map
        // `_.map(array, iterator)`
        //
        // **Public:** _Project an array by transforming each of its items via an iterator._
        //
        // **array**    - An array.
        //
        // **iterator** - A Function to be called to project each item of the array.
        //
        // Returns the projected array.
        _.map = function(array, iterator) {
            var mapped = [];
            _.each(array, function(item){
                mapped.push(iterator(item));
            })
            return mapped;
        };

        // ### filter
        // `_.filter(array, iterator)`
        //
        // **Public:** _Filter an array by running a test iterator._
        //
        // **array**    - An array.
        //
        // **iterator** - A test function to be called to to filter the array.
        //
        // Returns the filtered array.
        _.filter = function(array, iterator) {
            var filtered = [];
            _.each(array, function(item){
                if(iterator(item))
                    filtered.push(item);
            })
            return filtered;
        };

        // ### reduce
        // `_.reduce(collection, iterator, initialValue)`
        //
        // **Public:** _Filter an array by running a test iterator._
        //
        // **collection**    - An array.
        //
        // **iterator** - A test function to be called to to filter the array.
        //
        // **initialValue** - A test function to be called to to filter the array.
        //
        // Returns the filtered array.
        _.reduce = function(collection, iterator, initialValue) {
           initialValue = initialValue || 0;
            _.each(collection, function(value){
               initialValue = iterator(initialValue, value);
            });
           return initialValue;
        };

        // ### every
        // `_.every(array, iterator)`
        //
        // **Public:** _Filter an array by running a test iterator._
        //
        // **array**    - An array.
        //
        // **iterator** - A test function to be called to to filter the array.
        //
        // Returns the filtered array.
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


    })();
    return _ ;
});
