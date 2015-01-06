define(function () {

    var _ = { };

    (function() {

        // ### each
        // `_.each(collection, iterator)`
        //
        // **Public:** _Iterates over elements of a collection, executing the callback for each element.
        // The callback is invoked with three arguments: (value, index|key, collection)._
        //
        // **collection**    -  (Array|Object): The collection to iterate over.
        //
        // **iterator** - (Function): The function called per iteration.
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
        // `_.map(collection, iterator)`
        //
        // **Public:** _Creates an array of values by running each element in the collection through the callback.
        // The callback is invoked with three arguments: (value, index|key, collection).._
        //
        // **collection**    - (Array|Object): The collection to iterate over.
        //
        // **iterator** - (Function): The function called per iteration.
        //
        // Returns (Array): Returns a new array of the results of each callback execution.
        _.map = function(collection, iterator) {
            var mapped = [];
            _.each(collection, function(item){
                mapped.push(iterator(item));
            })
            return mapped;
        };

        // ### filter
        // `_.filter(collection, iterator)`
        //
        // **Public:** _terates over elements of a collection, returning an array of all elements
        // the callback returns truthy for. The callback is invoked with three arguments: (value, index|key, collection)._
        //
        // **collection**    - (Array|Oject): The collection to iterate over.
        //
        // **iterator** -  (Function): The function called per iteration.
        //
        // Returns (Array): Returns a new array of elements that passed the callback check.
        _.filter = function(collection, iterator) {
            var filtered = [];
            _.each(collection, function(item){
                if(iterator(item))
                    filtered.push(item);
            })
            return filtered;
        };

        // ### reduce
        // `_.reduce(collection, iterator, initialValue)`
        //
        // **Public:** _Reduces a collection to a value which is the accumulated result of running each element in the
        // collection through the callback, where each successive callback execution consumes the return value of the
        // previous execution. If not provided initialValuedfault to 0. The callback is invoked with two arguments; (initialValue, value)._
        //
        // **collection**    - (Array|Object): The collection to iterate over.
        //
        // **iterator** - (Function): The function called per iteration.
        //
        // **initialValue** -  (*): Initial value of the accumulator.
        //
        // Returns the accumulated value.
        _.reduce = function(collection, iterator, initialValue) {
           initialValue = initialValue || 0;
            _.each(collection, function(value){
               initialValue = iterator(initialValue, value);
            });
           return initialValue;
        };

        // ### every
        // `_.every(collection, iterator)`
        //
        // **Public:** _Checks if the given callback returns truthy value for **all** elements of a collection.
        // The callback is invoked with three arguments; (value, index|key, collection).._
        //
        // **collection**    - (Array|Object): The collection to iterate over.
        //
        // **iterator** - A test function to be called to to filter the array.
        //
        // Returns (boolean): Returns true if all elements passed the callback check, else false.
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
