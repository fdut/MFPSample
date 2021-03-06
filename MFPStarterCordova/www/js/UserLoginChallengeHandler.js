/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserLoginChallengeHandler = function() {
    var isChallenged = false;
    var securityCheckName = 'UserLogin';
    var userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);
    
    document.getElementById("login").addEventListener("click", login);
    userLoginChallengeHandler.securityCheckName = securityCheckName;

    userLoginChallengeHandler.handleChallenge = function(challenge) {
        WL.Logger.debug("handleChallenge running");
        //showLoginDiv();
        isChallenged = true;
        var statusMsg = "Remaining Attempts: " + challenge.remainingAttempts;
        if (challenge.errorMsg !== null){
            statusMsg = statusMsg + "<br/>" + challenge.errorMsg;
        }
        document.getElementById("main_status").innerHTML = statusMsg;
    };

    userLoginChallengeHandler.handleSuccess = function(data) {
        WL.Logger.debug("handleSuccess");
        isChallenged = false;
        document.getElementById("main_status").innerHTML = "Hello, " + data.user.displayName;
    };

    userLoginChallengeHandler.handleFailure = function(error) {
        WL.Logger.debug("handleFailure: " + error.failure);
        isChallenged = false;
        if (error.failure !== null){
            if (error.failure == "Account blocked") {
                document.getElementById("main_status").innerHTML = "Your account is blocked. Try again later.";
            }
            alert(error.failure);
        } else {
            alert("Failed to login.");
        }
    };

    function login() {
        /**
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        */

        var username = "fred";
        var password = "fred";
        var rememberMeState = true;

        if (username === "" || password === ""){
            alert("Username and password are required");
            return;
        }
        if (isChallenged){
            userLoginChallengeHandler.submitChallengeAnswer({'username':username, 'password':password, rememberMe: rememberMeState});
        } else {
            WLAuthorizationManager.login(securityCheckName,{'username':username, 'password':password, rememberMe: rememberMeState}).then(
                function () {
                    WL.Logger.debug("login onSuccess");
                },
                function (response) {
                    WL.Logger.debug("login onFailure: " + JSON.stringify(response));
                });
        }
    }

    function logout() {
    WLAuthorizationManager.logout(securityCheckName).then(
        function () {
            WL.Logger.debug("logout onSuccess");
            location.reload();
        },
        function (response) {
            WL.Logger.debug("logout onFailure: " + JSON.stringify(response));
        });
    }

    return userLoginChallengeHandler;

};
