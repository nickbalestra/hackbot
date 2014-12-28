define(['underscorish'], function (_) {

    // A little plugin that consume kimonolabs APIS
    //
    // robot    - Your kimonolabs.com api key.
    var apikey = 'YOUR_KIMONOLABS.COM_APIKEY',
    replies = {
        program: ["Next HR cohorts starts on $... onward!", "Upcoming HR programs will start on $", "Next HR classes begins on $"],
        students: ["Ask me again, and I will give you all the % records I found on the HR website", "Ready to read all %? Here we go: $", "$ ....and with the latest one should be %"]
    };

    // A helper function which create the apiCall
    //
    // endpoint - Endpoint of the API to call.
    // filter   - Filter to be applied on the endpoint.
    // sucess   - A success callback function to be runned against the response
    // msg      - A Message object
    //
    // Returns a boolean of whether the matcher matched.
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
    // Returns a boolean of whether the matcher matched.
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
