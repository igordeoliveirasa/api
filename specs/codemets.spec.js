/**
 * Created by igor on 09/05/15.
 */

// Mocking Parse
var Parse = {initialize:function(applicationId, key){}, Object:{extend:function(){}}};


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
        Codemets.hit(accountToken, projectIdentifier, projectName, buildStatus, coverageRate);
        expect(Codemets.Model.Auth.where).toHaveBeenCalledWith("accountToken", accountToken);
        expect(Codemets.Model.Project.where).toHaveBeenCalledWith("identifier", projectIdentifier);
        expect(Codemets.Model.Project.save).toHaveBeenCalledWith(projectIdentifier, projectName);
        expect(Codemets.Model.Hit.save).toHaveBeenCalledWith(user, project, buildStatus, coverageRate);
    });

});