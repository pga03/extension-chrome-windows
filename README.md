#First Discovery Chrome Extension (for Windows)

###Before We Begin:
It's a good idea to read up on Chrome's messaging (native and non-native).
https://developer.chrome.com/extensions/messaging
https://developer.chrome.com/extensions/nativeMessaging

###What does it do?
It is a skeleton that passes messages being passed between a simple Bluemix-
hosted webpage (not included in this repo), a Chrome extension and a locally
running host (in a separate repo).

The message originating in the web app gets passed to the extension. The
extension then passes that message as a native message to the native host. The
native host and extension can pass messages between themselves in both
directions.

###How do I install it?
The installation for the extension is fairly straightforward. Simply turn on
developer tools in chrome://extensions and load the unpacked app.

**You also need to install the native host. See https://github.com/pga03/first-discovery-native-host**

###Usage
Go to chrome-extension://fojfkfdnipccdhhjakieojkglomfaloe/index.html and http://extension-demo-jtworkme.mybluemix.net/

Once on the pages, you can try sending messages.

###Additional Notes:
* A webpage can't listen for messages, but it can be sent responses. This is good enough for our use case.
* Windows/OS X/Linux have different installation methods. We'll need to keep
this is mind further down the road

