var app = require('http').createServer(handler);
var file = new(require('node-static').Server)(__dirname + '/web', {});
var game = require('../lib/game.io.js').createServer();

app.listen(8000);
function handler(request, response) {
  request.on('end', function() {
    if (!game.serve(request, response)) {
      file.serve(request, response, function(err, res) {
        //if (err) { console.log(err); }
      });
    } 
  });
}
