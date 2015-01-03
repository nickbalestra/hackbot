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

    robot.respond(/.*(chatted)/i, function(msg) {

    })
});
