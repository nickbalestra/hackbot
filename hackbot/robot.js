define(function (require) {

    var _ = require('underscorish'),
        Response = require('./response'),
        Listener = require('./listener'),
        Adapter = require('./adapter'),
        Message = require('./message');

    /* Robot
     *
     * Robot receive messages from the chat source (chatbuilder), and
     * dispatch them to matching listeners.
     *
     * name - A String of the robot name, defaults to Hackbot.
     *
     */

    Robot = (function(name) {

        function Robot(name) {
            if (name == null) {
                name = 'Hackbot';
            }
            this.name = name;
            this.listeners = [];
            this.Response = Response;
            this.adapter = new Adapter(this);
        }

        Robot.prototype.hear = function(regex, callback){
            return this.listeners.push(new Listener(this, regex, callback));
        };

        Robot.prototype.respond = function(regex, callback) {
            var modifiers, name, newRegex, pattern, re;
            re = regex.toString().split('/');
            re.shift();
            modifiers = re.pop();

            if (re[0] && re[0][0] === '^') {
              console.log("Anchors don't work well with respond, perhaps you want to use 'hear'");
              console.log("The regex in question was " + (regex.toString()));
            }

            pattern = re.join('/');
            name = this.name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            newRegex = new RegExp("^\\s*[@]?" + name + "[:,]?\\s*(?:" + pattern + ")", modifiers);
            return this.listeners.push(new Listener(this, newRegex, callback));
        };

        Robot.prototype.catchAll = function(callback){
            // TODO SHIT HERE

        };

        Robot.prototype.receive = function(message) {
            var error, listener, results, _i, _len, _ref;
            results = [];
            _ref = this.listeners;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                listener = _ref[_i];
                results.push(listener.call(message));
                if (message.done) {
                    break;
                }
            }
            //console.log(results);

        };

        Robot.prototype.load = function() {
            var toLoad = require('scripts/scripts');
            for (var script in toLoad) {
                require(['scripts/' + toLoad[script]]);
            }
        };

        // Public: A helper send function which delegates to the adapter's send
        // function.
        //
        // strings - One or more Strings for each message to send.
        //
        // Returns nothing.
        Robot.prototype.send = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.adapter.send(args.join(' '));
        };

        // Public: A helper print function which delegates to the adapter's print
        // function.
        //
        // strings - One or more Strings to be printed.
        //
        // Returns nothing.
        Robot.prototype.print = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.adapter.print(args.join(' '));
        };

        Robot.prototype.reply = function(user, strings) {
            // TODO SHIT HERE
        };

        Robot.prototype.run = function() {
            return this.adapter.run();
        };

        Robot.prototype.shutdown = function() {
            return this.adapter.close();
        };

        return Robot;

    })();

});
