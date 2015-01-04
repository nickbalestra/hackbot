define(function () {

    //robot.command("hello", "reply with some greetings");

    var hellos = ["Well hello there, %. Just type \< hackbot help \> if you need anthing.", "Hey %, hello! Type \< hackbot help \> for help", "Good day, %. For help type \< hackbot help \>", "Good 'aye!, %. For a list of commands type \< hackbot help \>"],
        mornings = ["Good morning, %", "Good morning to you too, %", "Marnin', %", "Good 'aye!, %"];

    robot.hear(/(hi\b|hey\b|nobody\b|hello\b|good( [d'])?ay(e)?\b)/i, function(msg) {
        var hello = msg.random(hellos);
        return msg.send(hello.replace("%", msg.message.user.name));
    });

    return robot.hear(/(^(good )?m(a|o)rnin(g)?)/i, function(msg) {
        var hello = msg.random(mornings);
        return msg.send(hello.replace("%", msg.message.user.name));
    });
});
