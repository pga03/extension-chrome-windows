/**
 * Created by bs on 1/11/16.
 */
var port = null;

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

    if(request.message !== undefined){
      //alert(request.message);
    }
    // wrap the message in an object and send it back to the caller
    var msgResponse = {
      "received": request
    }
    document.getElementById('message').innerHTML ="<h3>" + request.message + "</h3>";

    sendResponse(msgResponse);
});

