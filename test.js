var sys = require('sys'); 
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var tempdata = '';
var events = require('events');
var led = require('./led);

try {
//	fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", "heartbeat");
//	fs.writeFileSync("/sys/class/gpio/export", ""+5);
//
//
//
	sys.puts('Creating server');
	http.createServer(function(request, response) {

		var uri = url.parse(request.url).pathname;
		sys.puts("Got request for " + uri);
		var exec = require('child_process').exec, child;
		child = exec('./myi2c',
	    		function (error, stdout, stderr) {

				console.log('stdout:', stdout);
				console.log('stderr:', stderr);
				loadHTMLFile('/index.html', response, stdout);
				if(error != null) {
					console.log('exec error:', error);
				}
			}
		);
	}).listen(3001);
} catch(ex3) {
	sys.puts('Server failed to connect to socket');
}


function loadHTMLFile(uri, res, temp) {
 var filename = path.join(process.cwd(), uri);
 path.exists(
  filename,
  function(exists) {
   if(!exists) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found\n");
    res.end();
    return;
   }
//   console.log('I am here');
   fs.readFile(
    filename,
    encoding='utf8',
    function(err, file) {
     if(err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err + "\n");
      res.end();
      return;
     }
     res.writeHead(200, {"Content-Type": "text/html"});
     var str = ("" + file).replace("<!--%OUTPUT%-->", temp);
     res.write(str);
     res.end();
    }
   );
  }
 );
}

