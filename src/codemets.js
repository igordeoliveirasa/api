/**
 * Created by igor on 10/05/15.
 */

Parse.initialize("WE1ExJbmUS4zRcKOYopvSyECi9gFJ1C1N5GFTD7l", "vprhe4lWqNvfkgurX8J6zV6sijyfo2c2jRfwv0t4");

var _projectIdentifier, _projectName, _buildStatus, _coverageRate, _user;

var Codemets = {
    Auth:{
        validateAccountToken:function(accountToken){
            var AccountToken = Parse.Object.extend("AccountToken");
            var query = new Parse.Query(AccountToken);
            query.include("user");
            query.equalTo("token", accountToken);
            return query.find();
        },
        validateAccountTokenSuccessCallback: function(accountToken) {
            console.log(accountToken);
            Codemets.Project.save(_projectCode, _projectName, _buildStatus, _coverageRate, accountToken.get("user")).then(Codemets.Project.saveSuccessfullCallback);
        },
        validateAccountTokenErrorCallback: function(error) {

        }
    },
    Project:{
        save: function (user, identifier, name) {
            var Project = Parse.Object.extend("Project");
            var project = new Project();
            project.set("user", user);
            project.set("identifier", identifier);
            project.set("name", name);

            var acl = new Parse.ACL(user);
            acl.setPublicReadAccess(true);
            project.setACL(acl);

            return project.save();
        },
        saveSuccessCallback: function(data) {
            console.log("success")
        },
        saveErrorCallback: function(data) {
            console.log("error")
        },
        where: function(key, value) {
            var Project = Parse.Object.extend("Project");
            var query = Parse.Query(Project);
            query.equalTo("code", projectCode);
            return query.find().then(Codemets.Project.whereSuccessCallback);
        },
        whereSuccessCallback: function(projects){
            if (projects.length>0) {
                Codemets.Hit.save(_user, projects[0], _projectName, _buildStatus, _coverageRate).then(Codemets.Hit.saveSuccessCallback);
            } else {
                Codemets.Project.save(_user, _projectCode, _projectName, _buildStatus, _coverageRate).then(Codemets.Project.saveSuccessCallback);
            }
        }
    },
    Hit:{
        save:function(user, project, buildStatus, coverageRate){
            var Hit = Parse.Object.extend("Hit");
            var hit = new Hit();
            hit.set("project", project);
            hit.set("buildStatus", buildStatus);
            hit.set("coverageRate", coverageRate);
            var acl = new Parse.ACL(user);
            acl.setPublicReadAccess(true);
            hit.setACL(acl);
            return hit.save();
        },
        saveSuccessCallback: function(hit) {

        }
    },
    hit: function(accountToken, projectCode, projectName, buildStatus, coverageRate) {
        _projectCode = projectCode;
        _projectName = projectName;
        _buildStatus = buildStatus;
        _coverageRate = coverageRate;

        Codemets.Auth.validateAccountToken(accountToken).then(Codemets.Auth.validateAccountTokenSuccessCallback,
            Codemets.Auth.validateAccountTokenErrorCallback);
    }
};