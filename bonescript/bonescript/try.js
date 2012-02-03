var fs = require("fs");

try {
//	fs.writeFileSync("/sys/class/leds/beagleboard::usr0/trigger", "heartbeat");
//	fs.writeFileSync("/sys/class/gpio/export", ""+5);
	var obj = new ActiveXObject("WScript.Shell");
	obj.run("myi2c");
} catch(ex3) {

	console.log("sb");
}
