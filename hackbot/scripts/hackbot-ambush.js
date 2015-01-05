define(['underscorish'], function (_) {

    // ## ambush plugin
    //
    // _Leave a message to someone away, and deliver it once the receiver is back._
    robot.help(robot.name + " ambush [name]", "leave a message for [name]");


    var appendAmbush = function(data, toUser, fromUser, message) {
        var _name;
        data[_name = toUser.name] || (data[_name] = []);
        return data[toUser.name].push([fromUser.name, message]);
    };

    var _base = (_base = robot.brain.data._private).ambushes || (_base.ambushes = {});

    // ### Listener
    robot.respond(/ambush (.*?): (.*)/i, function(msg) {
        msg.finish();
        var _base = msg.robot.brain.data._private.ambushes,
            user = (msg.robot.brain.data.users[msg.match[1]]) ? msg.robot.brain.data.users[msg.match[1]] : null;
        if (user) {
            appendAmbush(_base, user, msg.message.user, msg.match[2]);
            return msg.send("Ambush prepared");
        } else {
            return msg.send("" + msg.match[1] + "? Never heard of 'him");
        }
    });

    // ### Listener
    robot.hear(/./i, function(msg) {
        var ambush, ambushes, _i, _len,
            _base = msg.robot.brain.data._private.ambushes;
        if (_base == null) {
            return;
        }
        if ((ambushes = _base[msg.message.user.name])) {
            _.each(ambushes, function(ambush){
                msg.reply(" while you were out, " + ambush[0] + " left this message for you: " + '"' + ambush[1] + '"');
            });
            return delete _base[msg.message.user.name];
        }
    });

});
