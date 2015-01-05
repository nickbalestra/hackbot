define(function () {

    // ## User
    // `new User(name, options)`
    //
    // _Represents a participating user in the chat._
    //
    // **name** - A String of the user name.
    //
    // **options** - An optional Hash of key, value pairs for this user.
    User = (function() {
        function User(name, options) {
            this.name = name;
            if (options == null) {
                // TODO: for loop below can be moved in here
                options = {};
            }
            for (k in options || {}) {
                this[k] = options[k];
            }
            // TODO: Add msgHistory using options and remove it from being hardcoded in here
            this.msgHistory = [];
        }

        return User;
    })();
    return User;
});
