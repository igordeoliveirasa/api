#!/usr/bin/env node

/**
 * Created by igor on 10/05/15.
 */

Parse.initialize("WE1ExJbmUS4zRcKOYopvSyECi9gFJ1C1N5GFTD7l", "vprhe4lWqNvfkgurX8J6zV6sijyfo2c2jRfwv0t4");

var Codemets = {

    BUILD_STATUS: {
        SUCCESS: "SUCCESS",
        ERROR: "ERROR"
    },

    Model: {
        Auth: {
            where : function(key, value) {
                var query = new Parse.Query(Parse.User);
                query.equalTo(key, value);
                return query.find();
            },
            signUp: function(email, password) {
                var user = new Parse.User();
                user.set("email", email);
                user.set("username", email);
                user.set("password", password);
                return user.signUp();
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
            where: function(key, value) {
                var Project = Parse.Object.extend("Project");
                var query = Parse.Query(Project);
                query.equalTo("code", projectCode);
                return query.find().then(Codemets.Project.whereSuccessCallback);
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
            }
        }
    },
    hit: function(accountToken, projectIdentifier, projectName, buildStatus, coverageRate) {
        Codemets.Model.Auth.where("accountToken", accountToken).then(function(users){
            if (users.length>0) {
                var user = users[0];
                Codemets.Model.Project.where("identifier", projectIdentifier).then(function(projects){
                    if (projects.length==0) {
                        Codemets.Model.Project.save(projectIdentifier, projectName).then(function(project){
                            if (project) {
                                Codemets.Model.Hit.save(user, project, buildStatus, coverageRate).then(function(hit){
                                    console.log("Done!");
                                });
                            }
                        });
                    } else {
                        var project = projects[0];
                        Codemets.Model.Hit.save(user, project, buildStatus, coverageRate).then(function(hit){
                            console.log("Done!");
                        });
                    }
                });
            }
        });
    }
};

