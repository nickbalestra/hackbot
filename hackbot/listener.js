define(function () {

    var Listener = (function() {

        function Listener(robot, regex, callback) {
            this.robot = robot;
            this.regex = regex;
            this.callback = callback;
            this.matcher = function(message) {
                        return message.match(this.regex);
                };
        }

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
