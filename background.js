var port, message= null;
///////////////////////////////////////////////////////////////////////////////
//                         Native Messaging Functions                        //
///////////////////////////////////////////////////////////////////////////////

function sendNativeMessage() {
  message = {"text": document.getElementById('input-text').value};
  port.postMessage(message);
  console.log("Sent message: " + JSON.stringify(message));
}

function passMessageToNative(message) {
  port.postMessage(message);
  console.log("Sent message: "+ JSON.stringify(message));
}

function onNativeMessage(message) {
  console.log("Received message: <b>" + JSON.stringify(message)); 
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

//Connects to the native messaging host
function connect() {
  var hostName = "com.ibm.firstdiscovery";
  console.log("Connecting to native messaging host " + hostName);
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}

//Add the listener to the background page
document.addEventListener('DOMContentLoaded', function () {
  connect();
});

///////////////////////////////////////////////////////////////////////////////
//                Non-Native Messaging Functions                             //
///////////////////////////////////////////////////////////////////////////////

// Listen to events from our web app and handle them.
chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    // log the parameters to console for debug
    console.log('a message was received');
    console.log('request:');
    console.dir(request);
    console.log('sender:');
    console.dir(sender);
    console.log('sendResponse:');
    console.dir(sendResponse);

    if(request.message === undefined){
      console.log('undefined message recieved. Its Probably no big deal though');
    }
    // wrap the message in an object and send it back to the caller
    var msgResponse = {
      "received": request
    };
    document.getElementById('message').innerHTML ="<h3>" + request.message + "</h3>";
    sendResponse("I got your message!");

    //Pass the non-native message to the native host
    passMessageToNative(request.message);

    sendResponse(msgResponse);
});
