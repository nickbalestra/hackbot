define(function (require) {

    var _ = require('underscorish'),
        Response = require('./response'),
        Listener = require('./listener'),
        Adapter = require('./adapter'),
        Brain = require('./brain'),
        Message = require('./message');

    Robot = (function(name) {

        // Robots receive messages from a chat source (chatBuilder), and
        // dispatch them to matching listeners.
        //
        // adapter     - A String of the adapter name.
        // name        - A String of the robot name, defaults to Hubot.
        //
        // Returns nothing.
        function Robot(name) {
            if (name == null) {
                name = 'Hackbot';
            }
            this.name = name;
            this.listeners = [];
            this.commands = [];
            this.Response = Response;
            this.adapter = new Adapter(this);
            this.brain = new Brain(this);
        }

        // Public: Adds a command and description to be used for help and reference
        //
        // command    -
        // description -
        //
        // Returns nothing.
        Robot.prototype.command = function(command, description){
            return this.commands.push({command: command, description: description});
        };

        // Public: Adds a Listener that attempts to match incoming messages based on
        // a Regex.
        //
        // regex    - A Regex that determines if the callback should be called.
        // callback - A Function that is called with a Response object.
        //
        // Returns nothing.
        Robot.prototype.hear = function(regex, callback){
            return this.listeners.push(new Listener(this, regex, callback));
        };

        // Public: Adds a Listener that attempts to match incoming messages directed
        // at the robot based on a Regex. All regexes treat patterns like they begin
        // with a '^'
        //
        // regex    - A Regex that determines if the callback should be called.
        // callback - A Function that is called with a Response object.
        //
        // Returns nothing.
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

        // Public: Passes the given message to any interested Listeners.
        //
        // message - A Message instance. Listeners can flag this message as 'done' to
        //           prevent further execution.
        //
        // Returns nothing.
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
        };

        // Public: Loads every script in the given path.
        // List of plugin to be loaded have to be defined inside script.js.
        // script.js need to be placed inside the given path directory
        //
        // path - A String path on the filesystem.
        // Defaul to hackbot/scripts
        //
        // Returns nothing.
        Robot.prototype.load = function(path) {
            var scriptsPath = path ? path + '/' : '../hackbot/scripts/';
            console.log("Loading scripts at " + scriptsPath);
            require([scriptsPath + 'scripts'], function(toLoad){
                for (var script in toLoad) {
                    require([scriptsPath + toLoad[script]]);
                }
            });

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

        // Public: A helper reply function which delegates to the adapter's reply
        // function.
        //
        // user    - A User Name.
        // strings - One or more Strings for each message to send.
        //
        // Returns nothing.
        Robot.prototype.reply = function(user, strings) {
            var envelope = {'user': user};
            var strings = Array.prototype.slice.call(arguments, 1);
            return this.adapter.reply(envelope, strings.join(' '));
        };

        // Public: Kick off the event loop for the adapter
        //
        // Returns nothing.
        Robot.prototype.run = function() {
            console.log("Starting adpter")
            return this.adapter.run();
        };

        // Public: Gracefully shutdown the robot process
        //
        // Returns nothing.
        Robot.prototype.shutdown = function() {
            this.adapter.close();
            return this.brain.close();
        };

        return Robot;

    })();

});
