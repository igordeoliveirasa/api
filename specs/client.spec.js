/**
 * Created by igor on 09/05/15.
 */

// Mocking Parse
var Parse = {initialize:function(applicationId, key){}};


describe("Client Api's tests", function() {
    var api;

    beforeEach(function(){
        api = new Client(new Auth(), new Application());
    });

    it("should create new application since everything is ok", function() {
        var token = "validToken";
        var name = "App A";
        spyOn(api.application, "create").and.returnValue({then:function(){
            
        }});
        api.createApplication(token, name).then(function(application){
            expect(application.objecctId).toEqual("app_a_id");
        }, function(error){
            expect(true).toBe(false);
        })
    });

});