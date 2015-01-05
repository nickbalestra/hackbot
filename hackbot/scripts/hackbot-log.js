define(function () {

    // ## Log script
    //
    // _Print on screen users messages._
    //
    // ### Listener
    robot.hear(/(.)/i, function(msg) {
        var text = msg.message.text;
        var user = msg.message.user;
        var date = msg.message.createdAt;

        return msg.robot.adapter.print(user.name + ' said: ' + text + ' ( ' + date + ' )' );
    });
});
