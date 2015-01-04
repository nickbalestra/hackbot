define(function () {

    robot.command("hackbot ambush [name]", "leave a message for [name]");

    var appendAmbush = function(data, toUser, fromUser, message) {
        var _name;
        data[_name = toUser.name] || (data[_name] = []);
        return data[toUser.name].push([fromUser.name, message]);
    };

    var _base = (_base = robot.brain.data).ambushes || (_base.ambushes = {});

    robot.respond(/ambush (.*?): (.*)/i, function(msg) {
        msg.finish();
        var user = (msg.robot.brain.data.users[msg.match[1]]) ? msg.robot.brain.data.users[msg.match[1]] : null;
        if (user) {
            appendAmbush(msg.robot.brain.data.ambushes, user, msg.message.user, msg.match[2]);
            return msg.send("Ambush prepared");
        } else {
            return msg.send("" + msg.match[1] + "? Never heard of 'him");
        }
    });

    return robot.hear(/./i, function(msg) {
        var ambush, ambushes, _i, _len;
        if (robot.brain.data.ambushes == null) {
            return;
        }
        if ((ambushes = msg.robot.brain.data.ambushes[msg.message.user.name])) {
            for (_i = 0, _len = ambushes.length; _i < _len; _i++) {
                ambush = ambushes[_i];
                msg.reply(" while you were out, " + ambush[0] + " left this message for you: " + '"' + ambush[1] + '"');
            }
            return delete msg.robot.brain.data.ambushes[msg.message.user.name];
        }
    });

});
