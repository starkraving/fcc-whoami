var express = require('express');
var parser = require('ua-parser-js');
var app = express();
app.get('/', function(req, resp){
	var ip = (req.headers['x-forwarded-for'] || 
			req.connection.remoteAddress || 
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress).split(':').pop();
	var lang = req.headers['accept-language'].split(';').shift();
	var uaString = req.headers['user-agent'];
	var ua = parser(uaString);
	var software = ua.os.name+' '+ua.os.version;
	
	resp.setHeader('content-type', 'text/JSON');
	resp.end(JSON.stringify({
		ipaddress: ip,
		language: lang,
		software: software
	}));
});
app.listen(8080);