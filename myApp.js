let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
console.log("Hello World")

// app.get("/", function (req, res) {
//     res.send("Hello Express");
// });

app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} -${req.ip}`);
    next();
})

app.get('/now', function (req, res, next) { // render actual time//
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({
        time: req.time
    });
});

app.get("/:word/echo", function(req, res){
    const {word} = req.params;
    debugger
    res.json({
        echo: word
    });
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public")); // added css styles

app.get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({
            "message": "HELLO JSON"
        });
    } else {
        res.json({
            "message": "Hello json"
        });
    }
});






























module.exports = app;
