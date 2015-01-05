define(function () {

    // ## Messages
    // `new Message(user, text, id, createdAt, done)`
    //
    // **Public:** _Represents an incoming message from the chat._
    //
    // **user** - A User instance that sent the message.
    //
    // **text** - A String message.
    //
    // **id** - A String of the message ID.
    //
    // **createdAt** - A String of the message creation date.
    //
    // **done** - Indicates that no other Listener should be called on this object. Default to false.
    Message = (function() {
        function Message(user, text, id, createdAt, done) {
            this.user = user;
            this.text = text;
            this.id = id;
            this.createdAt = createdAt;
            this.done = done != null ? done : false;
        }

        // ### finish
        // `message.finish()`
        //
        // _Indicates that no other Listener should be called on this object._
        //
        // Returns nothing.
        Message.prototype.finish = function() {
            return this.done = true;
        };

        // ### match
        // `message.match(regex)`
        //
        // _Determines if the message matches the given regex._
        //
        // **regex** - A regular expression to check.
        //
        // Returns a Match object or null.
        Message.prototype.match = function(regex) {
            return this.text.match(regex);
        }

        return Message;
    })();
    return Message;
});
