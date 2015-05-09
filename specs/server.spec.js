/**
 * Created by igor on 09/05/15.
 */



describe("Server Api's tests", function() {


    var api;

    beforeEach(function(){
        api = new Server();
    });

    it("should not pass because e-mail is empty", function(){
        var email = "";
        var password =  "123mudar!";
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(false);
        expect(ret.message).toBe("Invalid e-mail...");
    });

    it("should pass because everything is right", function(){
        var email = "igordeoliveirasa@gmail.com";
        var password =  "123mudar!";
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(true);
    });

    it("should not pass because e-mail is invalid", function(){
        var email = "213123@mail";
        var password =  "123mudar!";
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(false);
        expect(ret.message).toBe("Invalid e-mail...");
    });

    it("should not pass because e-mail is null", function(){
        var email = null;
        var password =  "123mudar!";
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(false);
        expect(ret.message).toBe("Invalid e-mail...");
    });

    it("should not pass because password is empty", function(){
        var email = "igordeoliveirasa@gmail.com";
        var password =  "";
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(false);
        expect(ret.message).toBe("Invalid password...");
    });

    it("should not pass because password is null", function(){
        var email = "igordeoliveirasa@gmail.com";
        var password =  null;
        var ret = api.validateCredentials(email, password);
        expect(ret.status).toBe(false);
        expect(ret.message).toBe("Invalid password...");
    });

    it("contains spec with an expectation", function() {
        var email = "igordeoliveirasa@gmail.com";
        var password =  "123mudar!";
        spyOn(api.service, "signUp");
        api.signUp(email, password);
        expect(api.service.signUp).toHaveBeenCalledWith(email, password);
    });
});