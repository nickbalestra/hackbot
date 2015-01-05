define(function () {

    // ## Thank you script
    //
    // _Thanks users._
    var response = ["you're welcome", "no problem", "not at all", "don’t mention it", "it’s no bother", "it’s my pleasure", "my pleasure", "it’s all right", "it’s nothing", "think nothing of it", "sure", "sure thing"];

    // ### Listeners
    robot.respond(/(thank).*/i, function(msg) {
        return msg.send(msg.random(response));
    });

    robot.hear(/thanks (.*)/i, function(msg) {
        var name = msg.match[1];
        if (name.toLowerCase() === robot.name.toLowerCase()) {
            return msg.send(msg.random(response));
        }
    });
});
