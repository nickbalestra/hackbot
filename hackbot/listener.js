define(function () {

    var Listener = (function() {

        // Listeners receive message from the chat source and decide if they
        // want to act on it.
        //
        // robot    - A Robot instance.
        // regex    - A Regex that determines if this listener should trigger the
        //            callback
        // callback - A Function that is triggered if the incoming message matches.
        function Listener(robot, regex, callback) {
            this.robot = robot;
            this.regex = regex;
            this.callback = callback;
            this.matcher = function(message) {
                        return message.match(this.regex);
                };
        }

        // Public: Determines if the listener likes the content of the message. If
        // so, a Response built from the given Message is passed to the Listener
        // callback.
        //
        // message - A Message instance.
        //
        // Returns a boolean of whether the matcher matched.
        Listener.prototype.call = function(message) {
            var match;
            if (match = this.matcher(message)) {
                if (this.regex) {
                //    console.log("Message '" + message.text + "' matched regex " + this.regex);
                }
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
