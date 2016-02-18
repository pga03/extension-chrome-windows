var chrome = require('sinon-chrome');
var fs = require('fs');
var sinon = require('sinon');
var assert = require('chai').assert;
var jsdom = require('jsdom');

sinon.assert.expose(assert, {prefix: ''});

var requiredVersion = 1;
var hasExtension = false;
var extensionId = "nkojgcmaioingjndknblmghefcfijobm";

var request = {
    "message":{
        "message_type":"write_usb",
        "message_body":{
            "userToken":"TestTestTestTestTestTestTestTest",
            "preferences":{
                "contexts":{
                    "gpii-default":{
                        "name":"Test preferences",
                        "preferences":{
                            "gpii_firstDiscovery_language":"en-US",
                            "gpii_firstDiscovery_speak":true,
                            "gpii_firstDiscovery_speechRate":1.5,
                            "fluid_prefs_contrast":"wb",
                            "fluid_prefs_textSize":0.9,
                            "gpii_firstDiscovery_onScreenKeyboard":false,
                            "gpii_firstDiscovery_captions":false,
                            "gpii_firstDiscovery_showSounds":true,
                            "gpii_firstDiscovery_stickyKeys":true
                        }
                    }
                }
            }
        }
    }
};

var sender = {
    "url" : "http://www.testingtesting.com",
    "frameId": 0,
    "tab" : {
        active: true,
        audible: false,
        height: 609,
        highlighted: true,
        id: 49,
        incognito: false,
        index: 12,
        muted: false,
        pinned: false,
        selected: true,
        status: "complete",
        title: "test site",
        url: "http://www.testingtesting.com",
        width: 1190,
        windowId: 1
    }
};

describe('background page', function () {

    var window;

    beforeEach(function (done) {
        jsdom.env({
            // generated background page
            html: '<html></html>',
            // js source
            src: [fs.readFileSync('../background.js', 'utf-8')],
            created: function (errors, wnd) {
                // attach `chrome` to window
                wnd.chrome = chrome;
                wnd.console = console;
                // chrome.runtime.sendMessage(extensionId, request, function (response) {
                // console.log("A response was received");
                // console.dir(response);

                // });
                chrome.runtime.sendMessage(extensionId, 
                        {"message": {"message_type": "request_version"}},
                        function (response) {
                            console.log("FUCK FUCK SHIT");
                            if (response) {
                                hasExtension = true;
                                console.log("got reply");
                                console.dir(response);
                            }
                        });
          	    chrome.runtime.sendMessage(extensionId,
          	        {"message": {"message_type": "request_version"}},
          	        function (response) {
                        console.log("FUCK FUCK SHIT");
          	            console.log("A response was received");
          	            console.dir(response);
          	        });
            },
            done: function (errors, wnd) {
                if (errors) {
                    console.log(errors);
                    done(true);
                } else {
                    window = wnd;
                    done();
                }
            }
        });
    });

    // afterEach(function () {
    //     chrome.reset();
    //     window.close();
    // });

    it('Should attach listeners on startup', function () {
        assert.calledOnce(chrome.runtime.onMessageExternal.addListener);
    });

    it('Should send native message after getting external message', function () {
        // var sendResponse = sinon.spy();
        // chrome.runtime.onMessageExternal.addListener(sendResponse);
        // chrome.runtime.onMessageExternal.trigger(extensionId, {"message": {"message_type": "request_version"}}, sendResponse);
        // assert.calledOnce(sendResponse);

        chrome.runtime.sendMessage(
            extensionId,
            {"message": {"message_type":"request_version"}},
                function onVersionCallback(version){
                // If we got a version, the plugin is installed, so clear the timeout and let the plugin write to usb
                    if (version){                   
                        hasExtension = true;
                        console.log("I want to die");
                    }
                });
        });


    it('should return tabs by request from popup', function () {
        chrome.tabs.query.reset();
        var sendResponse = sinon.spy();
        chrome.runtime.onMessageExternal.trigger('get-tabs', {}, sendResponse);
        assert.calledOnce(sendResponse);
        assert.calledWith(sendResponse, sinon.match.array);
        assert.calledWith(sendResponse, sinon.match(function (value) {
            return value.length === 4;
        }));
    });
});

console.log("Hello");

chrome.runtime.sendMessage(extensionId, request.message,
        function (response) {
            console.log("A response was received");
            console.dir(response);
        });
