
var express = require("express");

var path = require("path");
var session = require('express-session')
var app = express();
var bodyParser = require('body-parser');

app.use(session({
    secret: "flask",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge : 60000}
}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
})

app.post('/process', function(request, response) {
 console.log("POST DATA", request.body);
 
 console.log(request.body.location)

 request.session.data = [
     {name: request.body.name,
     location: request.body.location,
     language: request.body.language,
     comment: request.body.comments}
 ]

 request.session.language = request.body.language

 response.redirect('/result');
})

app.get('/result', function(request, response){
    
    console.log(request.session.data)

    response.render('result', {x: request.session.data})
})



app.listen(8000, function() {
 console.log("listening on port 8000");
});