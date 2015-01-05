define(function () {

    var Listener = (function() {

        // ## Listeners
        // `new Listener(robot, regex, callback)`
        //
        // _Listeners receive message from the chat source and decide if they
        // want to act on it._
        //
        // **robot** - A Robot instance.
        //
        // **regex** - A regular expression that determines if this listener should trigger the
        //            callback.
        //
        // **callback** - A Function to be triggered if the incoming message matches.
        function Listener(robot, regex, callback) {
            this.robot = robot;
            this.regex = regex;
            this.callback = callback;
            this.matcher = function(message) {
                        return message.match(this.regex);
                };
        }

        // ### call
        // `listener.call(message)`
        //
        // **Public:** _Determines if the listener likes the content of the message. If
        // so, a Response built from the given Message is passed to the Listener
        // callback._
        //
        // **message** - A Message instance.
        //
        // Returns a boolean of whether the matcher matched.
        Listener.prototype.call = function(message) {
            var match;
            if (match = this.matcher(message)) {
                this.callback(new this.robot.Response(this.robot, message, match));
                return true;
            } else {
                return false;
            }
        };
        return Listener
    })();
    return Listener
});
