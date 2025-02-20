var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var admin_routes = require("./routes/admin");
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"));
app.use(session({
    secret:"tanujajagtap",
    saveUninitialized:true,
    resave:true
}));

app.use("/admin",admin_routes);

app.listen(1000);