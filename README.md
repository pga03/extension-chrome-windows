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
2. https://developer.chrome.com/extenions/nativeMessaging


###Installation

1. Simply navigate to https://chrome.google.com/webstore/detail/comibmfirstdiscovery/nkojgcmaioingjndknblmghefcfijobm and install from the webstore

**NOTE:** The extension is configured to only connect to these URL's: 

      http://extension-demo-jtworkme.mybluemix.net/*,
      http://first-discovery-demo.mybluemix.net/demos/prefsServerIntegration/*,
      http://first-discovery.mybluemix.net/*,
      http://first-discovery2.mybluemix.net/*,
      http://first-discovery3.mybluemix.net/*

As a result, the extension will not cooperate with a web app hosted at any other URL pattern.

###Uninstall
1. Access `chrome://extensions` in Chrome
2. Delete the extension

###Troubleshooting

####Debugging
Chrome lets you inspect background views using the Chrome developer tools. You can access a link
to inspect the plugin from `chrome://extensions`

####Extension ID
When installed in development mode, the extension's ID can sometimes change. You can view your extension ID
at `chrome://extensions` and use it in your first discovery server and native messaging hosts.


###Message Format
Per the Chrome messaging documentation, the extension can be sent messages in this manner:

`chrome.runtime.sendMessage(extension_id, msg_object, callback_function);`

The general `msg_object` argument must be a JSON object with this structure

    {
        message: {
          message_type: "string",
          message_body: {}
        }
    }
  
Supported values for `message_type` are `write_usb` and `request_version`.

####write_usb message
This message requires additional information and is used to write the GPII user token
and preference set to a USB device (that writing is performed by the native messaging host).

Example of type `write_usb`:

    {
        message: {
          message_type: "write_usb",
          message_body: {
            userToken: "the user's GPII user token",
            preferences: {} # an object with the user's Needs & Preference set
          }
        }
    }
  
The callback function is supplied with an object in this format:

    {
        is_successful: true/false  
    }


####request_version message
This message requires no additional information. Its purpose is to allow the web page
to inspect the environment for the existence of the extension, and always returns
quickly without performing any real operation. 

Example `msg_object`:

    {
        message: {
          message_type: "request_version"     
        }
    }
  
The callback function is supplied with an object in this format:

    {
        extension: "extension version number",
        native: "unknown" 
    }



####Example usage

This example shows how to detect the extension and use it, or run some other code when it is not present.

    // If the plugin hasn't responded in 2 seconds with the version, it is a user without a
    // plugin installed
    var successTimeoutId = setTimeout(function(){
        function_to_execute_when_no_extension_is_present();
    }, 2000);
    
    window.chrome.runtime.sendMessage(
        that.options.chromeExtensionId,
        {"message": {"message_type":"request_version"}},
        function onVersionCallback(version){
            // If we got a version, the plugin is installed, so clear the timeout and let the plugin write to usb
            if (version){                   
                clearTimeout(successTimeoutId);
                var message = {
                    message: {
                        message_type: "write_usb",
                        message_body: {
                            userToken: data.userToken,
                            preferences: data.preferences
                        }
                    }
                };
                window.chrome.runtime.sendMessage(
                    that.options.chromeExtensionId,
                    message,
                    function onChromeExtensionResponse(response) {
                        if (response.is_successful == "true") {
                            that.events.onSuccess.fire(data);
                        } else {
                            that.events.onError.fire();
                        }
                    });
            }
        });


####Testing
Navigate to `tests` and run `node tests.js`
