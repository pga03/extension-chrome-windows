var port, message= null;
///////////////////////////////////////////////////////////////////////////////
//                         Native Messaging Functions                        //
///////////////////////////////////////////////////////////////////////////////
var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

function appendMessage(text) {
  //document.getElementById('response').innerHTML += "<p>" + text + "</p>";
  console.log(text);
}

function updateUiState() {
  if (port) {
    document.getElementById('connect-button').style.display = 'none';
    document.getElementById('input-text').style.display = 'block';
    document.getElementById('send-message-button').style.display = 'block';
  } else {
    document.getElementById('connect-button').style.display = 'block';
    document.getElementById('input-text').style.display = 'none';
    document.getElementById('send-message-button').style.display = 'none';
  }
}

function sendNativeMessage() {
  message = {"text": document.getElementById('input-text').value};
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function passMessageToNative(message) {
  port.postMessage(message);
  appendMessage("Sent message: <b>" + JSON.stringify(message) + "</b>");
}

function onNativeMessage(message) {
  appendMessage("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  appendMessage("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() {
  var hostName = "com.ibm.firstdiscovery";
  appendMessage("Connecting to native messaging host <b>" + hostName + "</b>")
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

document.addEventListener('DOMContentLoaded', function () {
  connect();
  updateUiState();
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
    }
    document.getElementById('message').innerHTML ="<h3>" + request.message + "</h3>";
    sendResponse("I got your message!");

    //Pass the non-native message to the native host
    passMessageToNative(request.message);

    sendResponse(msgResponse);
});
