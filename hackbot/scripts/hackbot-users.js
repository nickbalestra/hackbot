define(['underscorish'], function (_) {

    // ## users plugin
    //
    // _Retrieve users and their messages._
    robot.help(robot.name + " chat users", "list all users who chatted in here");
    robot.help(robot.name + " chat history", "show all my messages");
    robot.help(robot.name + " hackbot chat history [name]", "show all messages from [name] - case sensitive");

    // ### Listener
    robot.hear(/(.)/i, function(msg) {
        var user = msg.robot.brain.userForName(msg.message.user.name);
        user.history.push({
            text: msg.message.text,
            id: msg.message.id,
            createdAt: msg.message.createdAt
            });
        msg.robot.brain.backup();
    });

    // ### Listener
    robot.respond(/.*(chat users)/i, function(msg) {
        var users = msg.robot.brain.users();
        return msg.send("Users that were recently in chat: "+ users.join(', '));
    });

    // ### Listener
    robot.respond(/.*chat history.(\w+)/i, function(msg) {
        var name = msg.match[1] == 'me' ? msg.message.user.name : msg.match[1];
        var user = (msg.robot.brain.data.users[name] != null) ? msg.robot.brain.data.users[name] : false;
        if (user) {
            if (user.history.length != null) {
                var messages = _.map(user.history, function(message){
                    return message.text;
                });
                return msg.send((msg.match[1] == 'me' ? "You" : user.name) + ' previously said: ' + '"' + messages.join('" - "') + '"');
            }
        } else
            return msg.send("" + msg.match[1] + "? Never heard of 'him");
    });
});
