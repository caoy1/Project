var http = require("http");
var url = require("url");
var sys = require('sys'); 
var fs = require('fs');
var path = require('path');
var events = require('events');

function start(route, handle) {
	function onRequest(request, response){
      var pathname = url.parse(request.url).pathname;
      route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(3001);
  console.log("Server has started.");
}

exports.start = start;
