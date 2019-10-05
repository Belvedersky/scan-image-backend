
// var fs = require('fs');
const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors')


const processes = require('child_process');
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = 3000;


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/', function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
});
app.get('/client', function(request, response) {
    response.sendFile(__dirname + "/views/client.html");
});
app.post('/scan', jsonParser,function(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    console.log(request.body)
    message=""
    args = [
        // "-p",
        request.body.mode, //Mode: Lineart|Gray|Color
        request.body.resolution, // Resolution: 75|300|600|1200dpi
        request.body.format  //Format: PNM|TIFF|PNG|JPEG
        // "--format=PNG"
    ];
    let scanimage = processes.spawn('./scan.sh',args);
    
    
    scanimage.stderr.on('data', function (data) {
            console.log('Сообщение: ' + data);
    });
    
    
    scanimage.on('exit', function (code, signal) {
        // console.log(typeof fulltext)
        //console.log("Base64: " + fulltext.join(''))
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
        if (code == 1){
            console.log(`Cканирование не возможно!  ${code} `)
            message="Cканирование не возможно!"
        ;}
        else{
            console.log(`Cканирование завершено успешно! ${code} `)
            message="Cканирование завершено успешно!"
        ;}
        response.send(message);
    });
    
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});

app.listen(port, () => console.log (`Server listening on  http://localhost:${port} \nScan image on  http://localhost:${port}/scan`))
