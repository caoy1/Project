var sys = require('sys'); 
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var type = '';
var events = require('events');
var qs = require('querystring');

//	fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", "heartbeat");
//	fs.writeFileSync("/sys/class/gpio/export", ""+5);
//
//
//
function led(){
 server = http.createServer(function(req, res) {  
      type =  '' ;  
      req.on( "data" , function(data) {  
        type += data;  
      }); 
	  req.on( "end" , function() { 
		var ledtype = qs.parse(type);
          console.log(ledtype);
          fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", ledtype.name);
      });
	  
	  
      
  });  
  
  server.listen(3000);  
  
  console.log('Server is running!'); 
}

exports.led = led;


