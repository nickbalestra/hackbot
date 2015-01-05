define(function () {

    // ## Users
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
            if (options != null) {
                for (k in options || {}) {
                    this[k] = options[k];
                }
            }
        }
        
        return User;
    })();
    return User;
});
