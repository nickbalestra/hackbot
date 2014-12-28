define(['underscorish'], function (_) {


    //listen to everything and update brain information
    return robot.hear(/(.)/i, function(msg) {
        var text = msg.message.text;
        var user = msg.robot.brain.userForName(msg.message.user);

        user.msgHistory.push(msg.message);





    });
});
