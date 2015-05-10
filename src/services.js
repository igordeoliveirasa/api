/**
 * Created by igor on 10/05/15.
 */

Auth = function() {
    this.user = new Parse.User();
    this.signUp = function(email, password) {
        this.user.set("email", email);
        this.user.set("username", email);
        this.user.set("password", password);
        return this.user.signUp();
    }
};

Application = function() {
    this.save = function(token, name) {

    }
};