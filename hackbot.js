// Getting Started With Hackbot
requirejs.config({
    baseUrl: 'lib',
    paths: {
        hackbot: '../hackbot',
        underscorish: 'underscorish',
        chatbuilder: 'http://chatbuilder.hackreactor.com/ChatBuilder'
    }
});


// Define dependencies
requirejs(['hackbot/robot', 'chatbuilder'], function(){

    // **Launch your Hackbot:** <br>
    // Create a Robot instance and give it a name;
    // load scripts defined in script.js
    // and start the robot adapter, thats it.
    robot = new Robot(Chat.username != 'anonymous' ? Chat.username : null);
    robot.load();
    robot.run();
});


// ## Documentation Index:
//
// ### Hackbot Core
// - [robot.js](robot.html)
// - [brain.js](brain.html)
// - [listener.js](listener.html)
// - [message.js](message.html)
// - [response.js](response.html)
// - [user.js](user.html)
//
// ### Hackbot Adapter
// - [adapter.js](adapter.html)
//
// ### Libraries
// - [underscorish.js](underscorish.html)
//
// ### Scripts
// - [scripts.js](scripts.html)
//  - [hackbot-help.js](hackbot-help.html)
//  - [hackbot-about.js](hackbot-about.html)
//  - [hackbot-ping.js](hackbot-ping.html)
//  - [hackbot-hello.js](hackbot-hello.html)
//  - [hackbot-thankyou.js](hackbot-thankyou.html)
//  - [hackbot-log.js](hackbot-log.html)
//  - [hackbot-users.js](hackbot-users.html)
//  - [hackbot-ambush.js](hackbot-ambush.html)
//  - [hackbot-hackreactor.js](hackbot-hackreactor.html)
//  - [hackbot-hackreactorrocks.js](hackbot-hackreactorrocks.html)
//
// Hackbot is heavily inspired by Hubot and its architecture is “almost” identical. For other scripts to be ported to hackbot you can then check the [http://hubot-script-catalog.herokuapp.com/">](hubot scripts cataloge)
