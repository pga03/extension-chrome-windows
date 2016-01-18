/*It would be nice to inline this in popup.html but Chrome's security
  policy prohibits inline scripts in extensions*/

//TODO: fix connection checking for popup.js

var isConnectable = false;

var hostName, port = null;
hostName = "com.ibm.firstdiscovery";
console.log("Checking connection to native host: " + hostName);
port = chrome.runtime.connectNative(hostName);
port.onDisconnect.addListener(onDisconnected);

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
  chrome.tabs.create({url : "chrome-extension://fojfkfdnipccdhhjakieojkglomfaloe/error.html"});
  isConnectable = false;
}

//After a check for the native host, we go to the demo site
if (isConnectable === true){
  chrome.tabs.create({url : "http://extension-demo-jtworkme.mybluemix.net/"});
}
