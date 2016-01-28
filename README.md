#First Discovery Chrome Extension


####About
This Chrome extension is responsible for passing messages from a First Discovery Tool web site to a Chrome native messaging
host. This extension is simply a middle man between a web site and a native host to facilitate communication.


This repository is not useful by itself. It should be used with its companion native messaging host  and a first discovery server:

1. https://github.com/pga03/first-discovery-native-host
2. https://github.com/pga03/first-discovery-server


####Messaging background

See these links for additional information on Chrome's messaging capabilities:

1. https://developer.chrome.com/extensions/messaging
2. https://developer.chrome.com/extensions/nativeMessaging


###Installation

Chrome allows unpacked extensions to be installed by enabling development mode. 

1. Download this repository and unzip if necessary
2. Add your URL to the `externally_connectable.matches` array in `manifest.json`
3. Access `chrome://extensions` in Chrome
4. Check the "develpment mode" check box
5. Click "Load unpacked extension" button
6. Select the repository folder

###Uninstall
1. Access `chrome://extensions` in Chrome
2. Delete the extension

###Troubleshooting

Chrome lets you inspect background views using the Chrome developer tools. You can access a link
to inspect the plugin from `chrome://extensions`
