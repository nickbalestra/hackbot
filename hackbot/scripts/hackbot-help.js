define(['underscorish'], function (_) {

    robot.command("hackbot help", "list all available hackbot commands");

    robot.respond(/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            msg.send("\< "+ command.command +" \> - " + command.description)
        })
    })

});
