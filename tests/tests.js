var extensionVersion = 1;

var versionCheck = false;
var usbCheck = false;
var junkCheck = false;

var usbMessage = {
    "message":{
        "message_type":"write_usb",
        "message_body":{
            "userToken":"Test",
            "preferences":{
                "contexts":{
                    "gpii-default":{
                        "name":"Test preferences",
                        "preferences":{
                            "gpii_firstDiscovery_language":"en-US",
                            "gpii_firstDiscovery_speak":true,
                            "gpii_firstDiscovery_speechRate":1.5,
                            "fluid_prefs_contrast":"wb",
                            "fluid_prefs_textSize":0.9,
                            "gpii_firstDiscovery_onScreenKeyboard":false,
                            "gpii_firstDiscovery_captions":false,
                            "gpii_firstDiscovery_showSounds":true,
                            "gpii_firstDiscovery_stickyKeys":true
                        }
                    }
                }
            }
        }
    }
};

var sendResponseCallback = function (response) {
    if (response.extension === '1' && response.native === 'unknown'){
        console.log("SUCCESS: version request message");
        versionCheck = true;
    }

};


var chromemock = {};
chromemock.runtime = {};
chromemock.runtime.onMessageExternal = {};

chromemock.runtime.onMessageExternal.addListener = function (listener) {
    //Version Checking
    listener(
        {message: {"message_type": "request_version", "message_body": "fake message"}},
        {},
        sendResponseCallback);

    //USB writing checking
    listener(
        usbMessage,
        {},
        sendResponseCallback);

    //USB writing checking
    listener(
        {message: {"junk1": "junk", "junk2": {"junk3": "junk"}}},
        {},
        sendResponseCallback);
};

chromemock.runtime.sendNativeMessage = function (hostname, requestMessage, callback) {
    // validate format of the request message
    if (requestMessage.message_type === "write_usb"){
        usbCheck = true;
        console.log("SUCCESS: USB write request message");
    }

    // validate hostname
    if (hostname === "com.ibm.firstdiscovery"){
        console.log("SUCCESS: hostname is good");
    }
    // callback
};


(function (chrome) {
    var hostName = "com.ibm.firstdiscovery";
    var extensionVersion = "1";

    // Listen to events from our web app and handle them.
    chrome.runtime.onMessageExternal.addListener(webListener);

    function webListener(request, sender, sendResponse) {
        try {
            if (request && request.message) {
                //console.log("request.message: " + JSON.stringify(request.message));

                if (request.message.message_type === "write_usb") {
                    console.log("Got call to write to USB");
                    chrome.runtime.sendNativeMessage(hostName, request.message,

                        function onNativeMessageResponse(response) {
                            console.log("Response from Native: " + JSON.stringify(response));
                            if (response.is_successful === "true") {
                                console.log("Successful message from native host");
                            } else {
                                console.log("Unsuccessful message from native host");
                            }
                            sendResponse(response);

                    });
                }

                else if (request.message.message_type === "request_version") {
                    sendResponse({"extension": extensionVersion, "native": "unknown"});
                }
                else {
                    console.log("Unknown message type");
                    junkCheck = true;
                    sendResponse({"error": true, "msg": "Unknown message type"});
                    console.log("SUCCESS: Extension handed junk message properly");
                }
            }
        } catch (ex) {
            console.log("Exception occured!");
            sendResponse({"error": true, "msg": "An exception occured", err: ex});
        }
        return true;  // see http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    }
}(chromemock));


if(versionCheck === true && usbCheck === true && junkCheck === true){
    console.log("\nALL TESTS PASSED!");
} else{
    console.log("\nFAILURE: not all tests passed!");
}
