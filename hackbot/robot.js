// Defining the bot and its dependencies

define(function (require) {

    var _ = require('underscorish'),
        Response = require('./response'),
        Listener = require('./listener'),
        Adapter = require('./adapter'),
        Brain = require('./brain'),
        Message = require('./message');

    Robot = (function(name) {

        // ## Robot
        // `new Robot(name)`
        //
        // _Robot receive messages from a chat source, and
        // dispatch them to matching listeners._
        //
        // **name** - A String of the robot name, defaults to Hackbot.
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


        // ### hear
        // `robot.hear(regex, callback)`
        //
        // **Public:** _Adds a Listener that attempts to match incoming messages based on
        // a Regex._
        //
        // **regex**    - A Regex that determines if the callback should be triggered.
        //
        // **callback** - A Function that is called with a Response object.
        //
        // Returns nothing.
        Robot.prototype.hear = function(regex, callback){
            return this.listeners.push(new Listener(this, regex, callback));
        };

        // ### respond
        // `robot.respond(regex, callback)`
        //
        // **Public:** _Adds a Listener that attempts to match incoming messages directed
        // at the robot based on a Regex. All regexes treat patterns like they begin
        // with a '^'_
        //
        // **regex**    - A Regex that determines if the callback should be called.
        //
        // **callback** - A Function that is called with a Response object.
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

        // ### receive
        // `robot.receive(message)`
        //
        // **Public:** _Passes the given message to any interested Listeners._
        //
        // **message** - A Message instance. Listeners can flag this message as 'done' to
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

        // ### load
        // `robot.load(path)`
        //
        // **Public:** _Loads every script defined in `script.js`.
        // (`script.js` need to be placed inside the given path directory)_
        //
        // **path** - A String of path where the scripts and `scripts.js` are located.
        // Defaul to hackbot/scripts.
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

        // ### command
        // `robot.command(command, description)`
        //
        // **Public:** _Adds commands reference for help reference._
        //
        // **command**    - A string containing the command to be run.
        //
        // **description** - A string explaining the command.
        //
        // Returns nothing.
        Robot.prototype.command = function(command, description){
            return this.commands.push({command: command, description: description});
        };

        // ### send
        // `robot.send(strings...)`
        //
        // **Public:** _An helper send function which delegates to the adapter's send
        // function._
        //
        // **strings** - One or more Strings for each message to send.
        //
        // Returns nothing.
        Robot.prototype.send = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.adapter.send(args.join(' '));
        };

        // ### print
        // `robot.print(strings...)`
        //
        // **Public:** _An helper print function which delegates to the adapter's print
        // function._
        //
        // **strings** - One or more Strings to be printed.
        //
        // Returns nothing.
        Robot.prototype.print = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.adapter.print(args.join(' '));
        };

        // ### reply
        // `robot.reply(user, strings...)`
        //
        // **Public:** _An helper reply function which delegates to the adapter's reply
        // function._
        //
        // **user**    - A User Name.
        //
        // **strings** - One or more Strings for each message to send.
        //
        // Returns nothing.
        Robot.prototype.reply = function(user, strings) {
            var envelope = {'user': user};
            var strings = Array.prototype.slice.call(arguments, 1);
            return this.adapter.reply(envelope, strings.join(' '));
        };

        // ### run
        // `robot.run()`
        //
        // **Public:** _Kick off the event loop for the adapter_
        //
        // Returns nothing.
        Robot.prototype.run = function() {
            console.log("Starting adpter")
            return this.adapter.run();
        };

        // ### shutdown
        // `robot.shutdown()`
        //
        // **Public:** _Gracefully shutdown the robot process_
        //
        // Returns nothing.
        Robot.prototype.shutdown = function() {
            this.adapter.close();
            return this.brain.close();
        };

        return Robot;

    })();

});
