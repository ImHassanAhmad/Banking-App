'use strict';
function channelMock () {}
channelMock.prototype.addEventListener = function(event, action) {} ;
channelMock.prototype.postMessage = function (data) {
    this.onmessage({ data })
};

globalThis.BroadcastChannel = channelMock;