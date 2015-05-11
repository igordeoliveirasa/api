/**
 * Created by igor on 09/05/15.
 */

// Mocking Parse
var Parse = {initialize:function(applicationId, key){}};


describe("Client Api's tests", function() {


    beforeEach(function(){
    });

    if ("should pass because token is valid", function() {
        var accountToken = "validToken";
        spyOn(Codemets.Auth, "validateAccountToken").and.returnValue({then:function(){
            Codemets.Auth.validateAccountTokenSuccessCallback({get:function(){ return "user"}});
        }});
        Codemets.Auth.validateToken(accountToken);
        expect(Codemets.Auth.validateAccountToken).toHaveBeenCalledWith(accountToken);
    });

    it("should sign in correctly", function() {
        var accountToken = "validToken";
        var projectCode = "PROJ_A";
        var projectName = "Project A";
        var buildStatus = Codemets.BUILD_STATUS_SUCCESS;
        var coverageRate = 50.0;
        spyOn(Codemets.Project, "save").and.returnValue( {then:function() {
           Codemets.Project.saveSuccessCallback({});
        }});

        spyOn(Codemets.Auth, "validateAccountToken").and.returnValue({then:function(){
            Codemets.Auth.validateAccountTokenSuccessCallback({get:function(){return "user"}});
        }});

        spyOn(Codemets.Project, "where").and.returnValue({then:function(){
            Codemets.Project.whereSuccessCallback([{}]);
        }});
        Codemets.hit(accountToken, projectCode, projectName, buildStatus, coverageRate);
        expect(Codemets.Project.save).toHaveBeenCalledWith(projectCode, projectName, buildStatus, coverageRate, "user");
    });

});