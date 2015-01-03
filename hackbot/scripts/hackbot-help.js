define(['underscorish'], function (_) {

    robot.command("hackbot help", "list the available hackbot commands");

    robot.respond(/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            msg.send("\< "+ command.command +" \> - " + command.description)
        })
    })

});
