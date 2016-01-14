#First Discovery Chrome Extension (for Windows)
##*Includes sample host*

####What is this and what's inside?
See above.

####What does it do?
It is a skeleton that passes messages being passed between a simple Bluemix-
hosted webpage (not included in this repo), a Chrome extension and a locally
running host (currently implemented in python).

The message originating in the web app gets passed to the extension. The
extension then passes that message as a native message to the native host. The
native host and extension can pass messages between themselves in both
directions.

####How do I install it?
The installation for the extension is very straightforward. Simply turn on
developer tools in chrome://extensions and load the unpacked app.

The host, on the other hand, is a different story.
**HEADS UP:**
*There are hardcoded paths in
    *com.ibm.firstdiscovery.json
    *install-host.bat

If your username is IBM_ADMIN, you have a folder C:\Users\IBM_ADMIN\projects and the project is installed in C:\Users\IBM_ADMIN\projects\extenstion-chrome-windows you should be fine. Otherwise, change the paths accordingly

####Additional Notes:
*A webpage can't listen for messages, but it can be sent responses. This is good enough for our use case.
*Windows/OS X/Linux have different installation methods

####The Future:
*Swap simple webpage in favor of the FDT
*Integrate with GPII components:
    *USB Listener
    *Preferences Server
    *Security Server
