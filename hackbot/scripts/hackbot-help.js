define(['underscorish'], function (_) {

    robot.command("help", "Bla bla bla");

    robot.respond(/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            console.log(command.command + ": " + command.description)
        })
    })

    robot.hear(/\/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            console.log(command.command + ": " + command.description)
        })
    })

});
