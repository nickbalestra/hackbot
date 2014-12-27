define(function () {

    // Represents an incoming message from the chat.
    //
    // user - A User that sent the message.
    Message = (function() {
        function Message(user, text, id, done) {
            this.user = user;
            this.text = text;
            this.id = id;
            this.done = done != null ? done : false;
        }

        // Indicates that no other Listener should be called on this object
        //
        // Returns nothing.
        Message.prototype.finish = function() {
            return this.done = true;
        };

        // Determines if the message matches the given regex.
        //
        // regex - A Regex to check.
        //
        // Returns a Match object or null.
        Message.prototype.match = function(regex) {
            return this.text.match(regex);
        }

        return Message;
    })();
    return Message;
});
