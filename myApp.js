let express = require('express');
let app = express();
let dotenv = require('dotenv').config();
let bodyParser = require('body-parser');

console.log("Hello World")

// app.get("/", function (req, res) {
//     res.send("Hello Express");
// });

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

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

app.get("/name", function (req, res) { // query string
    console.log(req.query);
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.get("/:word/echo", function (req, res) {
    const {
        word
    } = req.params;
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

app.post("/name", function (req, res) {
    let string = req.body.first + " " + req.body.last;
    res.json({
        name: string
    });
});


module.exports = app;