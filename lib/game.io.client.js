// Copyright Satoshi Nakajima (@snakajima)
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

console.log('game.io.client loaded');


var game = (function() {
  function Socket() {
  }
  comet.exports.inherits(Socket, comet.exports.EventEmitter);
  Socket.prototype._emit = comet.exports.EventEmitter.prototype.emit;
  
  Socket.prototype.connect = function() {
    this.comet = comet.connect();
    this.comet.on('connect', function() {
      console.log('game connected');
    });
  }

  return {
    connect:function(callback) {
      var socket = new Socket();
      socket.connect();
      return socket;
    }
  };
})();