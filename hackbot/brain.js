// Defining brains and their dependencies

define(['underscorish', './user'], function (_, User) {


    var Brain = (function() {

        // ## Brains
        // `new Brain(robot)`
        //
        // _Represents somewhat persistent storage for the robot._
        //
        // **robot** - A Robot instance.
        //
        // Returns a new Brain with no external storage or restore it from a local backup if present.
        function Brain(robot) {
            this.robot = robot;
            this.data = {
                users: {},
                _private: {}
            };
            if (this.hasBackup())
                this.data = this.hasBackup();
        }

        // ### set
        // `brain.set(key, value)`
        //
        // **Public:** _Public: Store key-value pair under the private namespace._
        //
        // Returns the instance.
        Brain.prototype.set = function(key, value) {
            this.data._private[key] = value;
            this.backup();
            return this;
        };

        // ### get
        // `brain.get(key)`
        //
        // **Public:** _Get value by key from the private namespace._
        //
        // Returns the value or null if no value is found.
        Brain.prototype.get = function(key) {
            var value;
            return ( value = this.data._private[key] ) != null ? value : null;
        };

        // ### delete
        // `brain.delete(key)`
        //
        // **Public:** _Remove value by key from the private namespace, if it exists._
        //
        // Returns the instance.
        Brain.prototype.delete = function(key) {
            var value;
            if (value = this.data._private[key])
                delete this.data._private[key];
            this.backup();
            return this;
        };

        // ### close
        // `brain.close()`
        //
        // **Public:** _Manage shutdown of the brain,
        // Backup by save on localstorage the whole brain content
        //
        // Returns the backup data.
        Brain.prototype.close = function() {
            this.backup();
            return JSON.parse(localStorage.getItem('data'));
        };

        // ### userForName
        // `brain.userForName(name)`
        //
        // **Public:** _Get a User object given a name._
        //
        // Returns a User instance for the user with the specified name.
        Brain.prototype.userForName = function(name) {
            var user = this.data.users[name];
            if (!user) {
                user = new User(name);
                this.data.users[name] = user;
            }
            this.backup();
            return user;
        };

        // ### backup
        // `brain.backup()`
        //
        // **Public:** _'save' brain data to localstorate so that 'brain' scripts can handle
        // persisting._
        //
        // Returns nothing
        Brain.prototype.backup = function(){
            localStorage.setItem('data', JSON.stringify(this.data));
        };

        // ### hasBackup
        // `brain.hasBackup()`
        //
        // **Public:** _check if a backup is present on the localstorage._
        //
        // Returns the backup data.
        Brain.prototype.hasBackup = function(){
            var backup = JSON.parse(localStorage.getItem('data'));
            if (backup != null)
                if (backup.hasOwnProperty('_private') != null || backup.hasOwnProperty('users') != null)
                    return backup;
            else
                return false;
        };

        // ### clearBackup
        // `brain.clearBackup()`
        //
        // **Public:** _delete the whole backup on localstorage_
        //
        // Returns nothing.
        Brain.prototype.clearBackup = function(){
            localStorage.clear();
        };





        return Brain
    })();
    return Brain;

});
