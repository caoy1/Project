var qs = require('querystring');
var url = require('url');
var sys = require('sys');
var fs = require('fs');
var path = require('path');

  function i2c(response, request) {
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
	}

function led(response, request) {
  var postData = "";
   var pathname = url.parse(request.url).pathname;
   console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      var ledtype = qs.parse(postData);
          console.log(ledtype.mode);
          fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", ledtype.mode);
    });
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

exports.i2c = i2c;
exports.led = led;


   
