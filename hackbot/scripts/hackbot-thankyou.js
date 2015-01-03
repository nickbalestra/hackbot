define(function () {

    //robot.command("thanks hackbot", "reply politely");

    var response = ["you're welcome", "no problem", "not at all", "don’t mention it", "it’s no bother", "it’s my pleasure", "my pleasure", "it’s all right", "it’s nothing", "think nothing of it", "sure", "sure thing"];

    robot.respond(/(thank).*/i, function(msg) {
        return msg.send(msg.random(response));
    });

    return robot.hear(/thanks (.*)/i, function(msg) {
        var name = msg.match[1];
        if (name.toLowerCase() === robot.name.toLowerCase()) {
            return msg.send(msg.random(response));
        }
    });
});
