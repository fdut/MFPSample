var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

function wlCommonInit() {
    app.init();
}

var myapp = {
    "appVersion": "2.0 Beta",
    "appName": "IBM Acme App",
    "appID": "com.ibm.acme",
    "appVersionCode": "2",
    "deviceID": "518c66913ec337f0",
    "deviceModel": "iPhone6,2",
    "deviceBrand": "Apple",
    "deviceOS": "iOS",
    "deviceOSversion": "9.2.1"
};

var mylog = {
      "timestamp": "2017-05-29T09:34:49.272Z",
      "timezone": "60",
      "file": "Main.swift",
      "level": "ERROR",
      "line": "234",
      "message": "Something normal happened.",
      "sourceClass": "string",
      "method": "takePicture",
      "loggerName": "string",
      "pkg": "my.acme.app.gallery",
      "stacktraceMessage": "An exception occurred.",
      "stacktrace": [
        "string"
      ],
      "threadID": "78"
    };


var samplelogs = {
  "logs": [
    {
      "timestamp": "2017-05-29T02:34:49.272Z",
      "timezone": "60",
      "file": "Main.swift",
      "level": "ERROR",
      "line": "234",
      "message": "Something normal happened.",
      "sourceClass": "string",
      "method": "takePicture",
      "loggerName": "string",
      "pkg": "my.acme.app.gallery",
      "stacktraceMessage": "An exception occurred.",
      "stacktrace": [
        "string"
      ],
      "threadID": "78"
    }
  ],
  "appVersion": "2.0 Beta",
  "appName": "IBM Acme App",
  "appID": "com.ibm.acme",
  "appVersionCode": "2",
  "deviceID": "518c66913ec337f0",
  "deviceModel": "iPhone6,2",
  "deviceBrand": "Apple",
  "deviceOS": "iOS",
  "deviceOSversion": "9.2.1"
};


function sendLogs() {
        
        mylog.timestamp = new Date();
        mylog.stacktrace = ["blabla", "blablabla", "bla bla bla blabla blabla blabla blabla blabla blabla bla"];
        
        var fulllog = {};

        fulllog['logs'] = [mylog];
        fulllog['appName'] = myapp.appName;
        fulllog['appID'] = myapp.appID;
        fulllog['appVersionCode'] = myapp.appVersionCode;
        fulllog['deviceID'] = myapp.deviceID;
        fulllog['deviceModel'] = myapp.deviceModel;
        fulllog['deviceBrand'] = myapp.deviceBrand;
        fulllog['deviceOS'] = myapp.deviceOS;
        fulllog['deviceOSversion'] = myapp.deviceOSversion;


        console.log("fulllog:"  + JSON.stringify(fulllog));

        var req = "adapters/analytics/callAnalyticsAPI/clientlogs";

        var statusText = document.getElementById("main_status");
        var infoText = document.getElementById("main_info");

        var request = new WLResourceRequest(req, WLResourceRequest.POST);

        statusText.innerHTML = req;

        request.send(fulllog).then(
            function(response) {
                console.log("Success : " + JSON.stringify(response));
                infoText.innerHTML = "Success : " + JSON.stringify(response);
            },
            function(error) {
                console.log("Error : " + JSON.stringify(error));
                infoText.innerHTML = "Error: " + JSON.stringify(error);
            });
  
}


var app = {
    //initialize app
    "init": function init() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        var buttonElement = document.getElementById("ping_button");
        buttonElement.style.display = "block";
        buttonElement.addEventListener('click', app.testServerConnection, false);
    },

    onDeviceReady: function () {
        cordova.getAppVersion.getVersionNumber(function (version) {
            myapp.appVersion = version;
        });
        cordova.getAppVersion.getAppName(function (appname) {
            myapp.appName = appname;
        });
        cordova.getAppVersion.getPackageName(function (packagename) {
            myapp.appID = packagename;
        });
        cordova.getAppVersion.getVersionCode(function (versioncode) {
            myapp.appVersionCode = versioncode;
        });
        
        myapp.deviceID = device.uuid;
        myapp.deviceBrand = device.manufacturer;
        myapp.deviceModel = device.model; 
        myapp.deviceOS = device.platform;
        myapp.deviceOSversion = device.version;

        console.log(JSON.stringify(myapp));
    },

    //test server connection
    "testServerConnection": function testServerConnection() {


        var titleText = document.getElementById("main_title");
        var statusText = document.getElementById("main_status");
        var infoText = document.getElementById("main_info");
        titleText.innerHTML = "Hello MobileFirst";
        statusText.innerHTML = "Connecting to Server...";
        infoText.innerHTML = "";
        WL.App.getServerUrl(function (url) {
            infoText.innerHTML = url;
        });

        WLAuthorizationManager.obtainAccessToken()
            .then(
                function (accessToken) {
                    titleText.innerHTML = "Yay!";
                    statusText.innerHTML = "Connected to MobileFirst Server";
                    sendLogs();
                },
                function (error) {
                    titleText.innerHTML = "Bummer...";
                    statusText.innerHTML = "Failed to connect to MobileFirst Server";
                }
            );

       
    },

}