define(function () {

    // ## about plugin
    //
    // _A little plugin to tell about the hackbot project._
    robot.help(robot.name + " about", "discover everything you need to know about hackbot");

    // ### Listener
    robot.respond(/about/i, function(msg) {
        return msg.reply("WHY I CODED HACKBOT - THE STORY: Well its simple, I tried to prepare for the HR admission by studing as much js as I could in just 2 weeks and yes, I failed :( HR suggest me to take some time before applying again and so I did." +
            " After my tech interview I decided to come back to chatbuilder to see if I did any progress. I was amazed to see how my code changed, and what once took me 8 hours to complete today took me 2(cleanup included)." +
            " So I tried to push myself harder and started this little bot project with two goal in mind: learn and find other students preparing for HR to pair program together. I tought that this was the perfect place. If you want to get in touch, ping me on twitter @nickbalestra or write me at nick@balestra.ch - I'm looking forward to hear from you!");
    });
});
