/*It would be nice to inline this in popup.html but Chrome's security
  policy prohibits inline scripts in extensions*/

//TODO: OPEN THE ERROR PAGE IF WE CAN'T CONNECT TO THE HOST.

//var isConnectable;

//var hostName, port = null;
//hostName = "com.ibm.firstdiscovery";
//console.log("Connecting to native messaging host: " + hostName);
//port = chrome.runtime.connectNative(hostName);
//port.onDisconnect.addListener(onDisconnected);

//function onDisconnected() {
//  console.log("Failed to connect: " + chrome.runtime.lastError.message);
//  port = null;
//  chrome.tabs.create({url : "chrome-extension://fojfkfdnipccdhhjakieojkglomfaloe/error.html"});
//}

chrome.tabs.create({url : "http://extension-demo-jtworkme.mybluemix.net/"});
