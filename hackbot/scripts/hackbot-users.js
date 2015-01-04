define(['underscorish'], function (_) {

    robot.command("hackbot show users", "list all users who chatted in here");
    robot.command("hackbot show me", "show all my messages");
    robot.command("hackbot show [name]", "show all messages from [name] - case sensitive");

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

    robot.respond(/.*(show users)/i, function(msg) {
        var users = msg.robot.brain.data.users;
        var names = [];
        for (user in users) {
            names.push(user);
        }
        msg.finish();
        return msg.send("Those users were around recently: "+ names.join(', '));
    })

    robot.respond(/.*show.(\w+)/i, function(msg) {
        var name = msg.match[1] == 'me' ? msg.message.user.name : msg.match[1];
        var user = (msg.robot.brain.data.users[name] != null) ? msg.robot.brain.data.users[name] : false;
        if (user) {
            if (user.msgHistory.length != null) {
                var messages = _.map(user.msgHistory, function(message){
                    return message.text;
                })
                return msg.send((msg.match[1] == 'me' ? "You" : user.name) + ' previously said: ' + '"' + messages.join('" - "') + '"');
        } else
            return msg.send("" + msg.match[1] + "? Never heard of 'him");
    })
});
