/******************************************************************************
*                               Native Messaging                              *
******************************************************************************/

var port, message = null;

function connectToNativeHost() {
  var hostName = "com.ibm.firstdiscovery";
  console.log("Connecting to native messaging host: " + hostName);
  console.log("PORT: "+port);
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
    // log the parameters to console for debug
    console.log("a message was received");
    console.log("request:");
    console.dir(request);
    console.log("sender:");
    console.dir(sender);
    console.log("sendResponse:");
    console.dir(sendResponse);

    // stop everything when a null message is received
    if(typeof request.message === undefined){
      console.log("undefined message recieved.");
      return;
    }
    // wrap the message in an object and send it back to the caller
    //TODO Why is this here? Thre request is already an object, hince why
    // we call requst.* for getting parts of the request
    var msgResponse = {
      "received": request
    };

    console.log("Message to extension: " + request.message);
    sendResponse("RESPONSE: Extension got this message:" + request.message);

    //Pass the non-native message to the native host
    sendNativeMessage(request.message);

    sendResponse(msgResponse);
});
