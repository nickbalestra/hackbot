define(['underscorish'], function (_) {

    var Brain = (function() {


        function Brain(robot) {
            this.robot = robot;
            this.data = {
                users: {},
                _private: {}
            };
        }

        // Public: Store key-value pair under the private namespace
        //
        // Returns the instance for chaining.
        Brain.prototype.set = function(key, value) {
            this.data._private[key] = value;
            return this;
        };

        // Public: Get value by key from the private namespace in data
        // or return null if not found.
        //
        // Returns the value.
        Brain.prototype.get = function(key) {
            var value;
            return ( value = this.data._private[key] ) != null ? value : null;
        };

        // Public: Remove value by key from the private namespace in data
        // if it exists
        //
        // Returns the instance for chaining.
        Brain.prototype.delete = function(key) {
            var value;
            if (value = this.data._private[key] != null ? this.data._private[key] : null)
                delete this.data._private[key];
            return this;
        };

        // Public: Manage shutdown of the brain
        // Dump the whole content of data contained in the brain
        //
        // Returns nothing
        Brain.prototype.close = function() {
            this.dump('users');
            this.dump('_private');
        };

        Brain.prototype.dump = function(sector) {
            var memory;
            (memory = sector === 'users' ? this.data.users : this.data._private);
            _.each(memory, function(value, key){
                this.robot.adapter.print(key + ': ' + value);
            })
            return memory;
        };


        return Brain
    })();
    return Brain;

});
