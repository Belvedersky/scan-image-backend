//var sane = require('sane-scanimage-wrapper');
var fs = require('fs');

const express = require('express');
const processes = require('child_process');

const app = express()
app.use(express.static('public'));

const port = 3000;


app.get('/', function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
});

app.get('/scan', function(request, response) {
    args = [
        "-p",
        "--mode=Color",
        "--resolution=300",
    ];
    let scanimage = processes.spawn('scanimage',args,[ "--format=PNG","--cct-type=Automatic"],options={"encoding":"binary"});
    scanimage.stdout.pipe(fs.createWriteStream('./public/output.png'));
    

    // scanimage.stdout.on('data', (data) => {
    //     console.log("get some data");
    //     // console.log(data);
    //     // var base64data = Buffer.from(data, 'binary').toString('base64');
    //     // var datenow = Date.now();
    //     // fs.writeFile("./"+datenow+".txt", base64data, function(err) {
    //     //    // console.log(err);
    //     // });    
    // });

    scanimage.stderr.on('data', function (data) {
        console.log('Сообщение: ' + data);
    });

    // scanimage.stdout.pipe
    scanimage.on('exit', function (code, signal) {
        // console.log(typeof fulltext)
        //console.log("Base64: " + fulltext.join(''))
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
        if (code == 1){
        response_message ='Ошибка:';
        
        console.log("Cканирование не возможно!");
        }
        else{
        //scanimage.stdout.pipe(fs.createWriteStream('./public/output.jpg'));
        //response.writeHead(200, {'Content-Type': 'image/jpeg'});
        response_message = 'Сканирование завершено!';
        console.log("Cканирование завершено успешно!");
        }
        console.log(typeof scanimage.stdout)
        response.send(response_message);
      });
    // response.set('Content-Type', 'plain/text');
    
   
});


app.listen(port, () => console.log (`Server listening on  http://localhost:${port} \nScan image on  http://localhost:${port}/scan`))
