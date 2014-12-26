define(function () {

    var hellos, mornings;
    hellos = ["Well hello there, %", "Hey %, hello!", "Good day, %", "Good 'aye!, %"];
    mornings = ["Good morning, %", "Good morning to you too, %", "Marnin', %", "Good 'aye!, %"];

    robot.hear(/(hi|hey|hello|good( [d'])?ay(e)?)/i, function(msg) {
        var hello;
        hello = msg.random(hellos);
        return msg.send(hello.replace("%", msg.message.user));
    });

    return robot.hear(/(^(good )?m(a|o)rnin(g)?)/i, function(msg) {
        var hello;
        hello = msg.random(mornings);
        return msg.send(hello.replace("%", msg.message.user));
    });
});
