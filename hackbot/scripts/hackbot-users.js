define(['underscorish'], function (_) {


    //listen to everything and update brain information
    return robot.hear(/(.)/i, function(msg) {
        var text = msg.message.text;
        var user = msg.message.user;

        // check if user is on brain
        // if is there push the message to the array messages inside that user object
        // otherwise create a new user object and set first elmenet of the mshHistory array to the current message



    
    });

    // add a listener to respond to specific commands so that robot will post back all the users names

    // add a listener respond to specific command so that robot will post back all messages history of a specific user
});
