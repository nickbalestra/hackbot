define(['underscorish'], function (_) {

    robot.command("hackbot chat users", "list all the users that posted in chatbuilder");
    robot.command("hackbot chat me", "show all my messages");
    robot.command("hackbot chat 'name'", "show all messages from 'name' - case sensitive");

    //listen to everything and update brain data on users
    robot.hear(/(.)/i, function(msg) {
        var user = msg.robot.brain.userForName(msg.message.user.name);
        user.msgHistory.push({
            text: msg.message.text,
            id: msg.message.id,
            createdAt: msg.message.createdAt
            });
        msg.robot.brain.backup();
    });

    robot.respond(/.*(chat users)/i, function(msg) {
        var users = msg.robot.brain.data.users;
        var names = [];
        for (user in users) {
            names.push(user);
        }
        msg.finish();
        return msg.send(names.join('the, '));
    })



    robot.respond(/.*chat.(\w+)/i, function(msg) {
        var name = msg.match[1] == 'me' ? msg.message.user.name : msg.match[1];
        var user = (msg.robot.brain.data.users[name] != null) ? msg.robot.brain.data.users[name] : false;
        if (user) {
            if (user.msgHistory.length != null) {
                var messages = _.map(user.msgHistory, function(message){
                    return message.text;
                })
                return msg.send((msg.match[1] == 'me' ? "You" : user.name) + ' previously said: ' + '"' + messages.join('" - "') + '"');
            } else
                return msg.send("Sorry, I don't have any records about what " + user.name + " said");
        } else
            return msg.send("Sorry, I couldn't find anyone called " + msg.match[1]);
    })
});
