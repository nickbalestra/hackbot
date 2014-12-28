define(['underscorish'], function (_) {

    var apikey = 'RCHyU822jWGpQBfA4mj6Mwk0ekY6YIos',
    replies = {
        program: ["Next HR cohorts starts on $... onward!", "Upcoming HR programs will start on $", "Next HR classes begins on $"],
        students: ["Ask me again, and I will give you all the % records I found on the HR website", "Ready to read all %? Here we go: $", "$ ....and with the latest one should be %"]
    };

    function apiCall(endpoint, filter, success, msg) {
        $.ajax({
            url: 'https://www.kimonolabs.com/api/42cpjfsk',
            data: { kimpath1: endpoint,
                    apikey: apikey},
            crossDomain: true,
            dataType: 'jsonp',
            success: function(response) {
                success(response, endpoint, filter, msg);
            }
        });
    }

    function buildReply(response, endpoint, filter, msg) {
        if ( response.count > 0 ) {
            var reply = msg.random(replies[endpoint]),
                elements = _.filter( (_.map(response.results[endpoint], function(element){
                    return element[filter];
                    })), notEmpty),
                total = elements.length;
            return msg.reply(reply.replace("%", total).replace("$", elements.join( ' * ' )) );
        }
    }

    function notEmpty(string){
        return string.length > 0;
    }

    robot.respond(/.*(program|schedule|cohort|class)/i, function(msg) {
        apiCall('program', 'date', buildReply, msg);
    });

    robot.respond(/.*(student(s)?('[s])? name(s)?|alumni(s)?('[s])? name(s)?)/i, function(msg) {
        apiCall('students', 'name', buildReply, msg);
    });

    robot.respond(/.*(student(s)?('[s])? github(s)?|alumni(s)?('[s])? github(s)?)/i, function(msg) {
        apiCall('students', 'github', buildReply, msg);
    });

    robot.respond(/.*(student(s)?('[s])? link(e)?din(s)?|alumni(s)?('[s])? link(e)?din(s)?)/i, function(msg) {
        apiCall('students', 'linkedin', buildReply, msg);
    });

    robot.respond(/.*(student(s)?('[s])? personal(s)?('[s])?(\s)?site(s)?|alumni(s)?('[s])? personal(s)?('[s])?(\s)?site(s)?)/i, function(msg) {
        apiCall('students', 'personalsite', buildReply, msg);
    });

    return robot.respond(/.*(student(s)?('[s])? twitter(s)?|alumni(s)?('[s])? twitter(s)?)/i, function(msg) {
        apiCall('students', 'twitter', buildReply, msg);
    });

});
