define(['underscorish'], function (_) {

    robot.command("hackreactor rocks", "bring some ascii action");
    var asciiLines = [
                        "┈┈┈╭╮┈╭╮┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈",
                        "┈┈┈┃┃┈┃┃┈┈╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔",
                        "┈┈┈┃┃┈┃┃┈┈▏@HACKREACTOR",
                        "┈┈┈┃╋┳╋┃┈┈▏☆ROCKS☆",
                        "┈┈╭┻━┓┃┃┈┈╲▂▂▂▂▂▂▂▂▂▂▂▂▂▂",
                        "┈┈┃┊━╯╯┃┈┈┈╱┈┈┈┈┈┈┈┈┈┈┈┈┈",
                        "┈┈╰╮┊┊╭╯ by @NICKBALESTRA"
                    ]

    robot.hear(/(hackreactor rocks|hr rocks)/i, function(msg) {
        _.each(asciiLines, function(line){
            setTimeout(function(){msg.send(line)},200);
        })
    });
});
