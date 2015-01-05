define(['underscorish'], function (_) {

    // ## hackreactor.com plugin
    //
    // _A little plugin that consume kimonolabs APIs._
    //
    // **apikey** - Your kimonolabs.com api key.
    robot.help(robot.name + " hr program", "show next courses as published on hackreactor.com/program ");
    robot.help(robot.name + " hr students (name | twitter | github | linkedin | site)", "take and list relative students data from hackreactor.com/students ");

    var apikey = '',
    replies = {
        program: ["Next HR cohorts starts on $... onward!", "Upcoming HR programs will start on $", "Next HR classes begins on $"],
        students: ["Ready to read all %? Here we go: $", "$ ....and with the latest one should be %"]
    };

    // ### apiCall
    // `apiCall(endpoint, filter, success, msg)`
    //
    // **Private:** _An helper function which create the api call._
    //
    // **endpoint**    - Endpoint of the API to call: /students and /program,
    //                   taking data respectively from hackreactor.com/students and hackreactor.com/program.
    //
    // **filter**    - Filter to be applied on the endpoint.
    //
    // **success**    - A success callback function to be runned against the response.
    //
    // **msg**    - A Message object.
    //
    // Returns nothing.
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

    // ### buildReply
    // `buildReply(response, endpoint, filter, msg)`
    //
    // **Private:** _An helper function which build the reply, to be used as callback inside the apiCall helper._
    //
    // **response**    - Result object returned from the API.
    //
    // **endpoint**    - Endpoint of the API to call: /students and /program,
    //                   taking data respectively from hackreactor.com/students and hackreactor.com/program.
    //
    // **filter**    - Filter to be applied on the endpoint.
    //
    // **msg**    - A Message object.
    //
    // Returns nothing.
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

    // ### Listener
    robot.respond(/(hr program)/i, function(msg) {
        apiCall('program', 'date', buildReply, msg);
    });

    // ### Listener
    robot.respond(/(hr students names)/i, function(msg) {
        apiCall('students', 'name', buildReply, msg);
    });

    // ### Listener
    robot.respond(/(hr students github)/i, function(msg) {
        apiCall('students', 'github', buildReply, msg);
    });

    // ### Listener
    robot.respond(/(hr students linkedin)/i, function(msg) {
        apiCall('students', 'linkedin', buildReply, msg);
    });

    // ### Listener
    robot.respond(/(hr students site)/i, function(msg) {
        apiCall('students', 'personalsite', buildReply, msg);
    });

    // ### Listener
    robot.respond(/(hr students twitter)/i, function(msg) {
        apiCall('students', 'twitter', buildReply, msg);
    });

});
