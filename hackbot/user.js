define(function () {

    // Represents an incoming message from the chat.
    //
    // user - A User that sent the message.
    User = (function() {
        function User(name, options) {
            this.name = name;
            this.msgHistory = [];
        }

        return User;
    })();
    return User;
});
