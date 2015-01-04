define(['underscorish', './user'], function (_, User) {


    var Brain = (function() {


        function Brain(robot) {
            this.robot = robot;
            this.data = {
                users: {},
                _private: {}
            };
            if (this.hasBackup())
                this.data = this.hasBackup();
        }

        // Public: Store key-value pair under the private namespace
        //
        // Returns the instance.
        Brain.prototype.set = function(key, value) {
            this.data._private[key] = value;
            this.backup();
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
        // Returns the instance.
        Brain.prototype.delete = function(key) {
            var value;
            if (value = this.data._private[key])
                delete this.data._private[key];
            this.backup();
            return this;
        };

        // Public: Manage shutdown of the brain
        // Save on localstorage the whole brain content
        //
        // Returns nothing
        Brain.prototype.close = function() {
            this.backup();
            return JSON.parse(localStorage.getItem('data'));
        };


        Brain.prototype.userForName = function(name) {
            var user = this.data.users[name];
            if (!user) {
                user = new User(name);
                this.data.users[name] = user;
            }
            this.backup();
            return user;
        };

        Brain.prototype.backup = function(){
            localStorage.setItem('data', JSON.stringify(this.data));
        };

        Brain.prototype.hasBackup = function(){
            var backup = JSON.parse(localStorage.getItem('data'));
            if (backup != null)
                if (backup.hasOwnProperty('_private') != null || backup.hasOwnProperty('users') != null)
                    return backup;
            else
                return false;
        };

        Brain.prototype.clearBackup = function(){
            localStorage.clear();
        };





        return Brain
    })();
    return Brain;

});
