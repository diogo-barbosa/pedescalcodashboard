var express = require('express');
var app = express();
var http = require('http');

app.use(express.static('public'));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

var server = http.createServer(app);
server.listen(3000);