/**
 * Created by igor on 09/05/15.
 */

// Mocking Parse
var require = function(){
    return {Parse:{Query:function(data){},initialize:function(applicationId, key){}, Object:{extend:function(){}}}}
};
var process = {argv:[]};
var module = "";

describe("Codemets Api's tests", function() {

    beforeEach(function(){});

    it("should save correctly since token is valid and data is correct", function() {

        var accountToken = "validToken";
        var projectIdentifier = "CODEMETS-MOBILE";
        var projectName = "Codemets Mobile";
        var buildStatus = Codemets.BUILD_STATUS.SUCCESS;
        var coverageRate = 50.0;

        // objects to return in callbacks
        var user = {email:"valid@email.com"};
        var project = {identifier:projectIdentifier};
        var hit = {buildStatus:buildStatus};

        spyOn(Codemets.Model.Auth, "where").and.callFake(function(){
            return {then:function(callback){
                callback([user]); // valid token
            }}
        });

        spyOn(Codemets.Model.Project, "where").and.callFake(function(){
            return {
                then:function(callback){
                    callback([project]); // valid project
                }
            }
        });

        spyOn(Codemets.Model.Hit, "save").and.callFake(function(){
            return {
                then:function(callback){
                    callback(hit); // valid hit
                }
            }
        });
        Codemets.hit(accountToken, projectIdentifier, projectName, buildStatus, coverageRate);
        expect(Codemets.Model.Auth.where).toHaveBeenCalledWith("accountToken", accountToken);
        expect(Codemets.Model.Project.where).toHaveBeenCalledWith("identifier", projectIdentifier);
        expect(Codemets.Model.Hit.save).toHaveBeenCalledWith(user, project, buildStatus, coverageRate);
    });


    it("should create a new project correctly since token is valid and data is correct", function() {

        var accountToken = "validToken";
        var projectIdentifier = "CODEMETS-MOBILE";
        var projectName = "Codemets Mobile";
        var buildStatus = Codemets.BUILD_STATUS.SUCCESS;
        var coverageRate = 50.0;

        // objects to return in callbacks
        var user = {email:"valid@email.com"};
        var project = {identifier:projectIdentifier};
        var hit = {buildStatus:buildStatus};

        spyOn(Codemets.Model.Auth, "where").and.callFake(function(){
            return {then:function(callback){
                callback([user]); // valid token
            }}
        });

        spyOn(Codemets.Model.Project, "where").and.callFake(function(){
            return {
                then:function(callback){
                    callback([]); // valid project
                }
            }
        });

        spyOn(Codemets.Model.Project, "save").and.callFake(function(){
            return {
                then:function(callback){
                    callback(project); // valid project
                }
            }
        });

        spyOn(Codemets.Model.Hit, "save").and.callFake(function(){
            return {
                then:function(callback){
                    callback(hit); // valid hit
                }
            }
        });
        spyOn(Codemets.Push, "send").and.callFake(Codemets.Push.sendSuccessCallback);
        Codemets.hit(accountToken, projectIdentifier, projectName, buildStatus, coverageRate);
        expect(Codemets.Model.Auth.where).toHaveBeenCalledWith("accountToken", accountToken);
        expect(Codemets.Model.Project.where).toHaveBeenCalledWith("identifier", projectIdentifier);
        expect(Codemets.Model.Project.save).toHaveBeenCalledWith(user, projectIdentifier, projectName);
        expect(Codemets.Model.Hit.save).toHaveBeenCalledWith(user, project, buildStatus, coverageRate);
        expect(Codemets.Push.send).toHaveBeenCalledWith(["ci"], "Build passed: Codemets Mobile.");
    });

    it("should call Codemets.hit right since parameters are ok", function(){
        var accountToken = "validToken";
        var projectIdentifier = "CODEMETS-MOBILE";
        var projectName = "Codemets Mobile";
        var buildStatus = Codemets.BUILD_STATUS.SUCCESS;
        var coverageRate = 50.0;
        process = {argv:["node", "path", accountToken, projectIdentifier, projectName, buildStatus, coverageRate]};
        spyOn(Codemets, "hit");
        main();
        expect(Codemets.hit).toHaveBeenCalledWith(accountToken, projectIdentifier, projectName, buildStatus, coverageRate);
    })

});