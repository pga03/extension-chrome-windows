/******************************************************************************
*                               Native Messaging                              *
******************************************************************************/

var port, message = null;

function connectToNativeHost() {
  var hostName = "com.ibm.firstdiscovery";
  console.log("Connecting to native messaging host: " + hostName);
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}
function sendNativeMessage(message) {
  port.postMessage(message);
  console.log("Sending to native host: "+ JSON.stringify(message));
}

function onNativeMessage(message) {
  console.log("Message from native host: " + JSON.stringify(message));
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

//Add the listener to the background page
document.addEventListener('DOMContentLoaded', function () {
  connectToNativeHost();
});

/******************************************************************************
*                            Non-Native Messaging                             *
******************************************************************************/

// Listen to events from our web app and handle them.
chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {

    //Parse message string into JSON object
    var message = JSON.parse(request.message);

    // Do nothing when undef message recieved
    if(typeof message=== undefined){
      console.log("undefined message recieved.");
      return;
    }

    console.log("Stringified Message: " + JSON.stringify(message));

    //Pass the non-native message to the native host
    sendNativeMessage(message);

    var msgResponse = {
      "received": request
    };

    sendResponse(msgResponse);
});
