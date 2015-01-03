define(['underscorish'], function (_) {


    //listen to everything and update brain data on users
    robot.hear(/(.)/i, function(msg) {
        var user = msg.robot.brain.userForName(msg.message.user.name);
        user.msgHistory.push({
            text: msg.message.text,
            id: msg.message.id,
            createdAt: msg.message.createdAt,
            done: msg.message.done
            });
        msg.robot.brain.backup();
    });

    robot.respond(/.*(users)/i, function(msg) {
        var users = msg.robot.brain.data.users;
        var names = [];
        for (user in users) {
            names.push(user);
        }
        return msg.send(names.join(', '));
    })


    robot.respond(/.*history.(\w+)/i, function(msg) {
        var user = (msg.robot.brain.data.users[msg.match[1]] != null) ? msg.robot.brain.data.users[msg.match[1]] : false;
        if (user) {
            if (user.msgHistory.length != null) {
                var messages = _.map(user.msgHistory, function(message){
                    return message.text;
                })
                return msg.send(user.name + ' previously said: ' + '"' + messages.join('" - "') + '"');
            } else
                return msg.send("Sorry, I don't have any records about what " + user.name + " said");
        } else
            return msg.send("Sorry, I couldn't find anyone called " + msg.match[1]);
    })
});
