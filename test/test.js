var fs  = require('fs')
const processes = require('child_process');

args = [
    // "-p",
    "Lineart", //Mode: Lineart|Gray|Color
    "75", // Resolution: 75|300|600|1200dpi
    "PNG"  //Format: PNM|TIFF|PNG|JPEG
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
    if (code == 1){console.log(`Cканирование не возможно!  ${code} `);}
    else{
        console.log(`Cканирование завершено успешно! ${code} `);}
  });
