define(['underscorish'], function (_) {

    // A little plugin that consume kimonolabs APIS
    //
    // apikey    - Your kimonolabs.com api key.
    robot.command("hackbot show program", "show next courses as published on hackreactor.com/program ");
    robot.command("hackbot show students (name | twitter | github | linkedin | site)", "take and list relative students data from hackreactor.com/students ");

    var apikey = 'RCHyU822jWGpQBfA4mj6Mwk0ekY6YIos',
    replies = {
        program: ["Next HR cohorts starts on $... onward!", "Upcoming HR programs will start on $", "Next HR classes begins on $"],
        students: ["Ready to read all %? Here we go: $", "$ ....and with the latest one should be %"]
    };

    // A helper function which create the apiCall
    //
    // endpoint - Endpoint of the API to call.
    // filter   - Filter to be applied on the endpoint.
    // sucess   - A success callback function to be runned against the response
    // msg      - A Message object
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

    // A helper function which build the reply, to be used as callback inside the apiCall helper
    //
    // Response - Results reeturned from the API.
    // endpoint - Endpoint of the API to call.
    // filter   - Filter to be applied on the endpoint.
    // msg      - A Message object
    //
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

    robot.respond(/(show program)/i, function(msg) {
        apiCall('program', 'date', buildReply, msg);
    });

    robot.respond(/(show students names)/i, function(msg) {
        apiCall('students', 'name', buildReply, msg);
    });

    robot.respond(/(show students github)/i, function(msg) {
        apiCall('students', 'github', buildReply, msg);
    });

    robot.respond(/(show students linkedin)/i, function(msg) {
        apiCall('students', 'linkedin', buildReply, msg);
    });

    robot.respond(/(show students site)/i, function(msg) {
        apiCall('students', 'personalsite', buildReply, msg);
    });

    return robot.respond(/(show students twitter)/i, function(msg) {
        apiCall('students', 'twitter', buildReply, msg);
    });

});
