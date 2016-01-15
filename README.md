#First Discovery Chrome Extension (for Windows)

###What does it do?
It is a skeleton that passes messages being passed between a simple Bluemix-
hosted webpage (not included in this repo), a Chrome extension and a locally
running host (in a separate repo).

The message originating in the web app gets passed to the extension. The
extension then passes that message as a native message to the native host. The
native host and extension can pass messages between themselves in both
directions.

###How do I install it?
The installation for the extension is very straightforward. Simply turn on
developer tools in chrome://extensions and load the unpacked app.

**You also need to clone the first-discovery-native-host repo to C:\Users\IBM_ADMIN\projects\first-discovery-native-host**

###Additional Notes:
* A webpage can't listen for messages, but it can be sent responses. This is good enough for our use case.
* Windows/OS X/Linux have different installation methods

###The Future:
* Swap simple webpage in favor of the FDT
* Integrate with GPII components:
    * USB Listener
    * Preferences Server
    * Security Server
