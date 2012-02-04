var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.i2c;
handle["/led"] = requestHandlers.led;
handle["/i2c"] = requestHandlers.i2c;

server.start(router.route, handle);
