define(function () {

    robot.command("hackbot about", "discover everything you need to know about hackbot");

    robot.respond(/about/i, function(msg) {
        return msg.reply("WHY I CODED HACKBOT - THE STORY: Well its simple, I tried to prepare for the HR admission by studing as much js as I could in just 2 weeks and yes, I failed :( HR suggest me to take some time before applying again and so I did." +
            " After my tech interview failure I decided to come back to the chatbuilder challange to see if I did anyprogress. Well I was pretty amazed to see how my code changed, and what once took me 8 hours to complete today took me 2(cleanup included)." +
            " So I tried to push myself harder and started this little bot project with two goal in mind: learn and find other students preparing for HR in order to do pair programming. I tought that this was the perfect place for that. If you want to get in touch, ping me on twitter @nickbalestra or write me at nick@balestra.ch - I'm looking forward to hear from you!");
    });
});
