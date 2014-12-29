define(['underscorish'], function (_) {


    //listen to everything and update brain data on users
    return robot.hear(/(.)/i, function(msg) {

        var user = msg.robot.brain.userForName(msg.message.user.name);
        user.msgHistory.push(msg.message);

    });
});
