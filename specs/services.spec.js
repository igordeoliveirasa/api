/**
 * Created by igor on 09/05/15.
 */

// Mocking Parse
var Parse = {
    initialize: function(applicationId, key) {

    },
    User: function() {
        return {
            signUp: function (email, password) {

            },
            set: function(key, value) {

            }
        }
    }
};


describe("Services' tests", function() {

    var auth;

    beforeEach(function(){
        auth = new Auth();
    });

    it("should pass since Auth is treating attrs correctly", function() {
        var email = "igordeoliveirasa@gmail.com";
        var password = "123mudar!";
        spyOn(auth.user, "set");
        spyOn(auth.user, "signUp");
        auth.signUp(email, password);
        expect(auth.user.set).toHaveBeenCalledWith("email", email);
        expect(auth.user.set).toHaveBeenCalledWith("username", email);
        expect(auth.user.set).toHaveBeenCalledWith("password", password);
        expect(auth.user.signUp).toHaveBeenCalled();
    });
});