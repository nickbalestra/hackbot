define(function () {

    //robot.command("hello", "reply with some greetings");

    var hellos = ["Well hello there, %. Type 'hackbot help' if you need anthing.", "Hey %, hello! Type 'hackbot help' if you need", "Good day, %. Type 'hackbot help' if you need", "Good 'aye!, %. Type 'hackbot help' if you need me"],
        mornings = ["Good morning, %", "Good morning to you too, %", "Marnin', %", "Good 'aye!, %"];

    robot.hear(/(hi|hey|nobody|hello|good( [d'])?ay(e)?)/i, function(msg) {
        var hello = msg.random(hellos);
        return msg.send(hello.replace("%", msg.message.user.name));
    });

    return robot.hear(/(^(good )?m(a|o)rnin(g)?)/i, function(msg) {
        var hello = msg.random(mornings);
        return msg.send(hello.replace("%", msg.message.user.name));
    });
});
