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

var titleText = null;
var statusText =  null;
var infoText = null;

//var req = "http://mobilefoundation-fdu-ks-server.mybluemix.net/mfp/"
var req = "http://mobilefoundation-fdu-ks-server.mybluemix.net:8888/mfp/"

var app = {
    //initialize app
    "init": function init() {

        WL.Logger.config({
            capture: false
        });

        var buttonDirectUrl = document.getElementById("url_button");
        buttonDirectUrl.addEventListener('click', app.testDirectUrl, false);

        var buttonElement = document.getElementById("ping_button");
        buttonElement.addEventListener('click', app.testServerConnection, false);

        var buttonAdapter = document.getElementById("adapter_button");
        buttonAdapter.addEventListener('click', app.testAdapterConnection, false);

        var buttonloggerinit = document.getElementById("logger_button_init");
        buttonloggerinit.addEventListener('click', app.testloggerbuttoninit, false);

        var buttonloggerfake = document.getElementById("logger_button_fake");
        buttonloggerfake.addEventListener('click', app.testloggerbuttonfake, false);

        var buttonloggersend = document.getElementById("logger_button_send");
        buttonloggersend.addEventListener('click', app.testloggerbuttonsend, false);

        var buttonanalyticsfake = document.getElementById("analytics_button_fake");
        buttonanalyticsfake.addEventListener('click', app.testanalyticsbuttonfake, false);

        var buttonanalyticssend = document.getElementById("analytics_button_send");
        buttonanalyticssend.addEventListener('click', app.testanalyticsbuttonsend, false);


        titleText = document.getElementById("main_title");
        statusText = document.getElementById("main_status");
        infoText = document.getElementById("main_info");


        WL.App.getServerUrl(getUrlSuccess, getUrlfail);

        function getUrlSuccess(result){
          WL.Logger.debug("URL retrieve success");
          console.log(JSON.stringify(result));
          }

         function getUrlfail(result){
           WL.Logger.debug("URL retrieve fail");
            console.log(JSON.stringify(result));
            }

     },


     //test direct url connection
     "testDirectUrl": function testDirectUrl() {

       var req = "http://mobilefoundation-fdu-ks-server.mybluemix.net/mfp/"

         titleText.innerHTML = "Contact Direct URL";
         statusText.innerHTML = "Connecting to " + req;
         infoText.innerHTML = "";

         var xhr = new XMLHttpRequest();
         xhr.open('GET', req, true);
         xhr.send();

         xhr.addEventListener("readystatechange", processRequest, false);

         function processRequest(e) {
           if (xhr.readyState == 4 && xhr.status == 200) {
             var response = JSON.stringify(xhr.responseText);
             console.log(response);
             infoText.innerHTML = response;
          } else {
            console.log("Error: " + xhr.statusText + "" + xhr.responseText);
            infoText.innerHTML = "Error: " + xhr.statusText;
          }
        }

     },

    //test server connection
    "testServerConnection": function testServerConnection() {

        titleText.innerHTML = "Hello MobileFirst";
        statusText.innerHTML = "Connecting to Server...";
        infoText.innerHTML = "";

        WL.App.getServerUrl(function(url) {
            infoText.innerHTML = url;
            console.log("url : " + url);
        });

        WLAuthorizationManager.obtainAccessToken()
            .then(
                function(accessToken) {
                    titleText.innerHTML = "Yay!";
                    statusText.innerHTML = "Connected to MobileFirst Server";
                },
                function(error) {
                    titleText.innerHTML = "Bummer...";
                    statusText.innerHTML = "Failed to connect to MobileFirst Server";
                }
            );
    },


    //test adapter connection
    "testAdapterConnection": function testAdapterConnection() {

        titleText.innerHTML = "Hello MobileFirst";
        statusText.innerHTML = "Connecting to Adapter ...";
        infoText.innerHTML = "";

        var req = "adapters/hello/hello"
        //http://mobilefoundation-fdu-ks-server.mybluemix.net/mfp/
        //var request = new WLResourceRequest("adapters/hello/hello", WLResourceRequest.GET);

        var request = new WLResourceRequest(req, WLResourceRequest.GET);

        statusText.innerHTML = req;

        request.send().then(
            function(response) {
                console.log("Success : " + JSON.stringify(response));
                infoText.innerHTML = "Success : " + JSON.stringify(response);
            },
            function(error) {
                console.log("Error : "+ JSON.stringify(error));
                infoText.innerHTML = "Error: "+ JSON.stringify(error);
            });

    },


    //test init logger
    "testloggerbuttoninit": function testloggerbuttoninit() {
        WL.Logger.config({
            capture: true
        });
        console.log("WL.Logger.config({capture: true});");
        WL.Logger.config({
            maxFileSize: 150000
        });
        logger = WL.Logger.create({
            Testing: 'Tests Utils'
        });
    },

    //test fake logger
    "testloggerbuttonfake": function testloggerbuttonfake() {
        var loggerstatus = WL.Logger.status();
        console.log(loggerstatus);
        WL.Logger.debug("Log debug type error");
        WL.Logger.warn("Log warm type error");
    },

    //test send logger
    "testloggerbuttonsend": function testloggerbuttonsend() {
      WL.Logger.config({
          capture: true
      });
        WL.Logger.send().then(function(state) {
            //{ enabled : true, stringify: true, filters : {},
            // level : 'info', pkg : '', tag: {level: false, pkg: true} }
            console.log("Success WL.logger.send");
        })
        .fail(function(errMsg) {
            //errMsg = error messagee
            console.log("Err WL.Logger.send");
        });
    },

    //test fake Analytics
    "testanalyticsbuttonfake": function testanalyticsbuttonfake() {
        var event = {testAction: "WL.Analytics Button Generate"};
        console.log("Generate fake analytics events");
        WL.Analytics.log(event, "Button Generate fake analytics events");
    },

    //test send Analytics
    "testanalyticsbuttonsend": function testanalyticsbuttonsend() {
        var event = {testAction: "WL.Analytics Button Send"};
        console.log("Send analytics events");
        WL.Analytics.log(event, "Button send analytics events");
        WL.Analytics.send();
    },

}
