define(['underscorish', './user'], function (_, User) {


//var User = require('./user');
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
        Brain.prototype.set = function(key, value, sector) {
            this.data[sector ? sector : '_private'][key] = value;
            return this;
        };

        // Public: Get value by key from the private namespace in data
        // or return null if not found.
        //
        // Returns the value.
        Brain.prototype.get = function(key, sector) {
            var value;
            return ( value = this.data[sector ? sector : '_private'][key] ) != null ? value : null;
        };

        // Public: Remove value by key from the private namespace in data
        // if it exists
        //
        // Returns the instance for chaining.
        Brain.prototype.delete = function(key, sector) {
            var value,
                sector = [sector ? sector : '_private'];
            if (value = this.data[sector][key] != null ? this.data[sector][key] : null)
                delete this.data[sector][key];
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

        Brain.prototype.userForName = function(name) {
            var user = this.data.users[name];
            if (!user) {
                user = new User(name);
                this.data.users[name] = user;

            }
            //console.log(user);
            // TODO if user existed
            return user;
        };


        return Brain
    })();
    return Brain;

});
