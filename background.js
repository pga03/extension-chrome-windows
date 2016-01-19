var hostName = "com.ibm.firstdiscovery";
var extensionVersion = "1";

// Listen to events from our web app and handle them.
chrome.runtime.onMessageExternal.addListener(webListener);

function webListener(request, sender, sendResponse) {
  try {
    if (request && request.message) {
      console.log("request.message: " + JSON.stringify(request.message));

      if (request.message.message_type === "write_usb") {
        console.log("Got call to write to USB");
        chrome.runtime.sendNativeMessage(hostName, request.message,
            function onNativeMessageResponse(response){

              console.log("Response from Native: " + JSON.stringify(response));
              if (response.is_successful === "true"){
                console.log("Successful message from native host");
              }else{
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
        sendResponse({"error": true, "msg": "Unknown message type"});
      }
    }
  } catch (ex) {
    console.log("Exception occured!");
    sendResponse({"error": true, "msg": "An exception occured", err: ex});
  }
  return true;
}
