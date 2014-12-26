define(function () {

    var Response = (function() {
        function Response(robot, message, match) {
            this.robot = robot;
            this.message = message;
            this.match = match;
        }

        Response.prototype.finish = function() {
            return this.message.finish();
        };

        Response.prototype.send = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.robot.send(args.join(' '));
        };

        Response.prototype.print = function() {
            var args = Array.prototype.slice.call(arguments); // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
            return this.robot.print(args.join(' '));
        };

        Response.prototype.random = function(items) {
            return items[Math.floor(Math.random() * items.length)];
        };

        return Response;
    })();
    return Response;
});
