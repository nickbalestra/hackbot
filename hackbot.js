// For any third party dependencies, like jQuery, place them in the lib folder.
// For any hackbot plugin, place it in the scripts directory.

// Configure loading modules from the lib directory,
// except for 'hackbot' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        hackbot: '../hackbot',
        underscorish: 'underscorish'
    }
});


// Start loading the main hackbot file.
requirejs(['hackbot/robot'], function(){

    // Once the needed code is loaded, instanciate a robot
    // You can pass it a name, default is hackbot
    // if we want to keep using the username prompt of chatbuilder to name our bot, just pass Chat.username to the constructor
    
});
