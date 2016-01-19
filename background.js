var hostname = "com.ibm.firstdiscovery";

// Listen to events from our web app and handle them.
chrome.runtime.onMessageExternal.addListener(webListener);

function webListener(request, sender, sendResponse) {
  try {
    if (request && request.message) {

      if (request.message.message_type === "write_usb") {
        chrome.runtime.sendNativeMessage(hostName, request.message,
            function onNativeMessageResponse(response){
              console.log("LINE 61: " + JSON.stringify(response));
              sendResponse(response);
            });
      }
      else if (request.message.message_type === "request_version") {
        sendResponse({"extension":"1", "native": "unknown"});
      }
      else {
        sendResponse({"error": true, "msg": "Unknown message type"});
      }
    }
  } catch (ex) {
    sendResponse({"error": true, "msg": "An exception occured", err: ex});
  }
  // see http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
  return true;
}
