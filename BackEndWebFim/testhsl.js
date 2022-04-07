const express= require('express')
const mongoose = require('mongoose')
const app=express()
const bodyParser= require('body-parser')
require('dotenv/config')
const fs = require("fs");
const { path } = require('express/lib/application')



app.use(bodyParser.json());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Login.html");
  });
app.get("/f1", function (req, res) {
    res.sendFile(__dirname + "/f1.css");
  });

app.get("/mainjs.js", function (req, res) {
    console.log(req.params);
res.sendFile(__dirname + "/mainjs.js");
});





app.get("/picture", function (req, res) {
    picname = req.query.pic
    console.log(req.params);
    // res.sendFile(__dirname + "/img/imgPoster/ace_off_utron_.png");
    res.sendFile(__dirname + "/img/movies/" + picname);
});

app.get("/video1", function (req, res) {
    picname = req.query.v;
    console.log(req.params);
    res.sendFile(__dirname + "/film/" + picname+".mp4");
});
 app.get("/video", function (req, res) {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoPath = "film/bigbuck.mp4";
    const videoSize = fs.statSync("film/bigbuck.mp4").size;
    console.log('this on')

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
});

app.listen(5001,()=>{
    console.log('server listening on port : 5001');
});