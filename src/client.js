/**
 * Created by igor on 09/05/15.
 */


var Client = function(Auth, Application) {
    Parse.initialize("WE1ExJbmUS4zRcKOYopvSyECi9gFJ1C1N5GFTD7l", "vprhe4lWqNvfkgurX8J6zV6sijyfo2c2jRfwv0t4");

    this.auth = Auth;
    this.application = Application;

    this.createApplication = function(token, name) {
        this.application.save(name);
    }
};