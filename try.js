var fs = require("fs");
var http = require("http");

try {
//	fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", "heartbeat");
//	fs.writeFileSync("/sys/class/gpio/export", ""+5);
//
//
//
	http.createServer(function(request, response) {
		
		response.writeHead(200, {"Content-Type": "text/plain"});
		var exec = require('child_process').exec, child;
		child = exec('./myi2c',
	    		function (error, stdout, stderr) {
				response.write(stdout);
				console.log('stdout:', stdout);
				console.log('stderr:', stderr);
				response.end();
				if(error != null) {
					console.log('exec error:', error);
				}
			}
		);
	}).listen(8888);
} catch(ex3) {
	console.log("sb");
}
