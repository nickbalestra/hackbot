define(['underscorish', 'http://chatbuilder.hackreactor.com/ChatBuilder.js'], function (_) {

    var tick,
        tmpCache = [],
        lastReceivedAt = new Date();

    var Adapter = (function() {

        // An adapter is a specific interface to a chat source for robots.
        //
        // robot - A Robot instance.
        function Adapter(robot) {
            this.robot = robot;
        }

        // Public: Raw method for fetching data from the chatbuilder API.
        // On success format, clean, normalized and invoke the receive() method of the adapter if needed
        //
        // Returns nothing.
        Adapter.prototype.fetch = function() {
            $.ajax({
                url: Chat.resourceAddress,
                data: { order: "-createdAt" },
                success: function(response) {
                    _.each( clean( _.map(response.results, format), normalize), function(msg){
                        var user = this.robot.brain.userForName(msg.user);
                        return this.robot.adapter.receive( new Message(user, msg.text, msg.id, msg.createdAt) );
                    });
                }
            });
        }

        // Public: Raw method for invoking the bot to run.
        // Start calling the adapter.fetch() method with a timer
        //
        // Returns nothing.
        Adapter.prototype.run = function() {
            (function timer(){
                this.robot.adapter.fetch();
                tick = setTimeout(timer, 3000);
            })();
            console.log("running...");
        };

        // Public: Raw method for invoking the bot to stop.
        // Clear the timer that is calling the adapter.fetch()
        //
        // Returns nothing.
        Adapter.prototype.close = function() {
            clearTimeout(tick);
        };

        // Public: Dispatch a received message to the robot.
        //
        // Returns nothing.
        Adapter.prototype.receive = function(message) {
            this.robot.receive(message);
        };

        // Public: Raw method for sending data back to the chat source.
        //
        // envelope - A Object with message and user details.
        // strings - String of the message to be sent back to the chat.
        //
        // Returns nothing.
        Adapter.prototype.send = function() {
            var envelope = arguments[0];
            var strings = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : Array.prototype.slice.call(arguments);
            $.ajax({
                type: "POST",
                url: Chat.resourceAddress,
                data: JSON.stringify({
                    text: this.robot.name + ": " + strings.join(' '),
                    username: this.robot.name
                }),
                dataType: "json"
            })
        };

        // Public: Raw method for building a reply and sending it back to the chat source.
        //
        // envelope - A Object with message and user details.
        // strings - String of the message to be sent back to the chat.
        //
        // Returns nothing.
        Adapter.prototype.reply = function() {
            var envelope = arguments[0];
            var strings = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
            return this.robot.adapter.send(envelope, "@" + envelope.user.name + ": " + strings.join(' '));
        };

        // Public: Raw method for sending emote data back to the chat source.
        //
        // strings  - One or more Strings for each message to send.
        //
        // Returns nothing.
        Adapter.prototype.emote = function() {
            var envelope = arguments[0];
            var strings = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
            return this.robot.adapter.send(envelope, "*" + strings.join(' ') + "*");
        };

        // Public: Raw method for printing on scren a message.
        //
        // envelope - A Object with message and user details.
        // strings - A string of the message to be printed.
        //
        // Returns nothing.
        Adapter.prototype.print = function() {
            var envelope = arguments[0];
            var strings = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : Array.prototype.slice.call(arguments);
            $('ul.screen').append('<li>' + strings.join(' ') + '</li>');
        };


        return Adapter
    })();


    // Private: Helper function to clean messages from noise
    //
    // messages - An array of messages formatted according to the format() helper
    // callback  - A callback function to be called once cleaned and on which will be passed the cleaned messages
    //
    // Returns false in case that the results of the cleaning is 0 msg, otherwise return the cleaned messages array or the callback if defined.
    function clean(messages, callback) {

        var cleanedMessages = messages.filter(onlyHumans).filter(onlyNew).sort(byDate);

        if ( cleanedMessages.length > 0 ) {
            lastReceivedAt = new Date();
            return (callback != null) ? callback(cleanedMessages) : cleanedMessages;
        } else
            return false;

        function onlyHumans(message) {
            return message.user != "RoboChat" && message.user != this.robot.name;
        }
        function onlyNew(message) {
            return Date.parse(message.createdAt) > Date.parse(lastReceivedAt);
        }
        function byDate(msgA, msgB) {
            return Date.parse(msgA.createdAt) - Date.parse(msgB.createdAt);
        }

    }

    // Private: Helper function to format a message
    //
    // message - A message object as the chatbuilder API returns
    //
    // Returns a formatted object.
    function format(message) {

        var text = message.text,
            author = message.username || text.substring(text.indexOf(':'), 0),
            text = text.substring(text.indexOf(':') + 2),
            createdAt = message.createdAt;

        return {
            'id': message.objectId,
            'user': author,
            'text': text,
            'createdAt': createdAt
        };
    }

    // Private: Helper function to normalize a messages queue
    //
    // messages - An array of formatted message objects that can be sent to the adapter receiver
    //
    // Returns a normalized array cleaned from duplicates by temporary caching messages passed to it.
    function normalize(messages) {

        var normalized = [];

        _.each(messages, function(msg){
            if (tmpCache.length == 0) {
                cache(msg);
            } else {
                if (notInCache(msg)) {
                    cache(msg);
                    return (tmpCache.length > 30) ? tmpCache.shift() : false ;
                }
            }
        });

        return normalized;

        function cache(msg) {
            tmpCache.push(msg);
            normalized.push(msg);
        }

        function notInCache(msg) {
            return _.every(tmpCache, function(cachedMsg){
                return (cachedMsg.id != msg.id);
            });
        }
    }

    return Adapter;
});
