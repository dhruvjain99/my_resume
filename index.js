const http = require("http");
const port = 8000;
const fs = require("fs");

function requestHandler(req, res){

    console.log("Requested url : " + req.url);


    var path;
    var contentType;

    switch(req.url){
        case '/':
            path = "./index.html";
            contentType = "text/html";
            break;
        case '/style.css':
            path = "./style.css";
            contentType = "text/css";
            break;
        case '/script.js':
            path = "./script.js";
            contentType = "text/javascript";
            break;
        case '/images/pec-logo.png':
            path = "./images/pec-logo.png";
            contentType = "image/webp";
            break;
        case '/images/profile-photo.jpeg':
            path = "./images/profile-photo.jpeg";
            contentType = "image/webp";
            break;
        case '/images/macbook_mouse.jpg':
            path = "./images/macbook_mouse.jpg";
            contentType = "image/webp";
            break;
        default: 
            path = "./404.html";
            contentType = "text/html";
    }
    res.writeHead(200, {
        "content-type": contentType
    });

    fs.readFile(path, function(err, data){
        if(err){
            console.log("Error : " + err);
            return res.end("<h1>Error occurred while reading file.</h1>");
        }

        return res.end(data);

    });
}

var server = http.createServer(requestHandler);

server.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log("Server is up and runnning on port : " + port);

});