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

(function(module_) {
  var module = module_ || require.register('game.io');
  var exports = module.exports;

  var util = require('util');
  var URL = require('url');
  var events = require('events');
  var fs = require('fs');

  function Server() {
    this.comet = require('comet.io').createServer();
  }
  util.inherits(Server, events.EventEmitter);

  Server.prototype.serve = function(req, res) {
    console.log('game serve called');
    var self = this;
    var ret = false;
    var url = URL.parse(req.url, true);
    var result = RegExp('^\/_game\.io\/([a-zA-Z0-9\s\._-]+)$').exec(url.pathname);
    if (result) {
      var cmd = result[1];
      if (cmd=='game.io.client.js') {
        fs.readFile(__dirname + '/game.io.client.js', 'utf8', function(err, data) {
          if (err) {
            console.log(err);
          }
          res.writeHead(200, { 'Content-Type':'text/javascript' } );
          res.end(data);
        });
      } else {
        res.writeHead(400, {} );
        res.end(payload);
      }
      ret = true;
    }
    return this.comet.serve(req, res);
  };
 
  exports.createServer = function() {
    return new Server();
  };

})(typeof module != 'undefined' ? module : null);
