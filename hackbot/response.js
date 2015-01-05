define(function () {

    // ## Responses
    // `new Response(robot, message, match)`
    //
    // **Public:** _Responses are sent to matching listeners. Messages know about the
    // content and user that made the original message, and how to reply back to
    // them._
    //
    // **robot** - A Robot instance.
    //
    // **message** - A Message instance.
    //
    // **match** - A Match object from the successful Regex match.
    var Response = (function() {
        function Response(robot, message, match) {
            this.robot = robot;
            this.message = message;
            this.match = match;
            this.envelope = {
                user: this.message.user,
                message: this.message
            };
        }

        // ### send
        // `response.send(strings...)`
        //
        // **Public:** _Posts a message back to the chat source._
        //
        // **strings** - One or more strings to be posted. The order of these strings
        //           should be kept intact.
        //
        // Returns nothing.
        Response.prototype.send = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.send(this.envelope, Array.prototype.slice.call(strings) );
        };

        // ### emote
        // `response.emote(strings...)`
        //
        // **Public:** _Posts an emote back to the chat source._
        //
        // **strings** - One or more strings to be posted. The order of these strings
        //           should be kept intact.
        //
        // Returns nothing.
        Response.prototype.emote = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.emote(this.envelope, Array.prototype.slice.call(strings) );
        };

        // ### reply
        // `response.reply(strings...)`
        //
        // **Public:** _Posts a message mentioning the current user.
        //
        // **strings** - One or more strings to be posted. The order of these strings
        //           should be kept intact.
        //
        // Returns nothing.
        Response.prototype.reply = Response.prototype.mention = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.reply(this.envelope, Array.prototype.slice.call(strings) );
        };

        // ### random
        // `response.random(items)`
        //
        // **Public:** _Picks a random item from the given items._
        //
        // **items** - An Array of items.
        //
        // Returns a random item.
        Response.prototype.random = function(items) {
            return items[Math.floor(Math.random() * items.length)];
        };

        // ### finish
        // `response.finish()`
        //
        // **Public:** _Tell the message to stop dispatching to listeners._
        //
        // Returns nothing.
        Response.prototype.finish = function() {
            return this.message.finish();
        };

        return Response;
    })();
    return Response;
});
