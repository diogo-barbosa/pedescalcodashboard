var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ tickets: [], bar: [] })
  .write();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/api/post-ticket', function(req, res) {
    var color = req.body.color;
    var ticket = getTicketName(req.body.ticket);
    var price = req.body.price;
    var datetime = parseDate(req.body.date, req.body.time);
    db.get('tickets')
        .push({ color: color, ticket: ticket, price: price, datetime: datetime })
        .write();
    res.redirect("/");
});
app.get('/api/get-tickets', function(req, res) {
    res.send(db.get('tickets').value());
});
app.post('/api/delete-tickets', function(req, res) {
    var tickets = db.get('tickets').value()
    delete tickets[req.body.index]
    db.set('tickets', tickets).write()
});

app.post('/api/post-bar', function(req, res) {
    var item = getItem(req.body.item);
    var quantity = req.body.quantity;
    var price = req.body.price;
    var datetime = parseDate(req.body.date, req.body.time);
    db.get('bar')
        .push({ item: item, quantity: quantity, price: price, datetime: datetime })
        .write();
    res.redirect("/");
});
app.get('/api/get-bar', function(req, res) {
    res.send(db.get('bar').value());
});
app.post('/api/delete-bar', function(req, res) {
    var bar = db.get('bar').value()
    delete bar[req.body.index]
    db.set('bar', bar).write()
});

app.use(express.static('public'));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

var server = http.createServer(app);

server.listen(3000);

function getTicketName(ticket){
    switch(ticket){
        case "0":
            return "Individual";
        case "1":
            return "Duplo";
        case "2":
            return "Familiar";
        case "3":
            return "Pack Duplo";
        case "4":
            return "Pack Familiar";
        case "5":
            return "Pack Grupo Grande";
        case "6":
            return "Bilhete Laranja-Limão";
    }
}

function getItem(item){
    switch(item){
        case "0":
            return "Tábua Sensações 1";
        case "1":
            return "Tábua Sensações 2";
        case "2":
            return "Vinho";
        case "3":
            return "Sumo";
        case "4":
            return "Café";
        case "5":
            return "Água 1,5l";
        case "6":
            return "Água 33cl";
    }
}

function parseDate(date, time){
    var dateArray = date.split("-");
    var newDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
    return newDate + " " + time;
}