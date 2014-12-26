define(function () {

    Message = (function() {
        function Message(user, text, id, done) {
            this.user = user;
            this.text = text;
            this.id = id;
            this.done = done != null ? done : false;
        }

        Message.prototype.finish = function() {
            return this.done = true;
        };

        Message.prototype.match = function(regex) {
            return this.text.match(regex);
        }

        return Message;
    })();
    return Message;
});
