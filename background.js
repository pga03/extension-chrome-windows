/******************************************************************************
 *                               Native Messaging                              *
 ******************************************************************************/

var port, message = null;
var response;

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
  if (message.is_successful === "true"){
    console.log("Successful message!");
  }
  else {
    console.log("Unsuccessful message! :(");
  }
  //The page needs refreshed to see the response
  chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
      sendResponse(message);
    });
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
chrome.runtime.onMessageExternal.addListener(webListener);

function webListener(request, sender, sendResponse) {
  //Parse message string into JSON object

  if (request.message){
    var message = request.message;

    console.log("Stringified Message: " + JSON.stringify(message));

    //Pass the non-native message to the native host
    var response = sendNativeMessage(message);

    var msgResponse = {
      "received": request
    };
    console.log("Request: " + JSON.stringify(msgResponse));

  } else{
    console.log("undefined request.message recieved");
  }

}
