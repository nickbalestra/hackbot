define(function () {

    var Response = (function() {
        function Response(robot, message, match) {
            this.robot = robot;
            this.message = message;
            this.match = match;
            this.envelope = {
                //TODO room: this.message.room,
                user: this.message.user,
                message: this.message
            };
        }


        Response.prototype.send = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.send(this.envelope, Array.prototype.slice.call(strings) );
        };

        Response.prototype.emote = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.emote(this.envelope, Array.prototype.slice.call(strings) );
        };

        Response.prototype.reply = Response.prototype.mention = function() {
            var strings = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
            return this.robot.adapter.reply(this.envelope, Array.prototype.slice.call(strings) );
        };

        Response.prototype.random = function(items) {
            return items[Math.floor(Math.random() * items.length)];
        };

        Response.prototype.finish = function() {
            return this.message.finish();
        };

        return Response;
    })();
    return Response;
});
