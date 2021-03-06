define(['underscorish'], function (_) {

    // ## Help script
    //
    // _Show users all the available commands related to loaded scripts._
    robot.help("help", "list all available hackbot commands");

    // ### Listener
    robot.respond(/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            msg.send("\< "+ command.command +" \> - " + command.description)
        });
    });

    // ### Listener
    robot.hear(/help/i, function(msg) {
        _.each(msg.robot.commands, function(command){
            msg.send("\< "+ command.command +" \> - " + command.description)
        });
    });

});
