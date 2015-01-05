define(['underscorish'], function (_) {

    // ## ASCII plugin
    //
    // _A little plugin that draw in chat ASCII art._
    robot.help(robot.name + " hackreactor rocks", "Ascii action");

    var asciiLines = [
                        "┈┈┈╭╮┈╭╮┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈",
                        "┈┈┈┃┃┈┃┃┈┈╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔",
                        "┈┈┈┃┃┈┃┃┈┈▏@HACKREACTOR",
                        "┈┈┈┃╋┳╋┃┈┈▏☆ROCKS☆",
                        "┈┈╭┻━┓┃┃┈┈╲▂▂▂▂▂▂▂▂▂▂▂▂▂▂",
                        "┈┈┃┊━╯╯┃┈┈┈╱┈┈┈┈┈┈┈┈┈┈┈┈┈",
                        "┈┈╰╮┊┊╭╯ by @NICKBALESTRA"
                    ];

    // ### Listener
    robot.hear(/(hackreactor rocks|hr rocks)/i, function(msg) {
        _.each(asciiLines, function(line){
            setTimeout(function(){msg.send(line)}, 200);
        });
    });
});
