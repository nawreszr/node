//1- les appels 
const express = require("express")
var hbs = require('express-hbs');
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
//const path = require("path")//
const mysql = require("mysql")

//2- configuration
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "isetcert"

})
connection.connect();
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//3- les routes
app.get("/", function (req, res) {
    var sql = "SELECT * FROM certif";
    connection.query(sql, function (error, results) {
        console.log(results)

        res.render("index", {
            layout: "main",
            contenu: results


        })

    })

})

app.get("/login",function(req,res){
    res.render("login",{
         layout: "main"
    }) 
})

app.post("/login",function(req,res){
    var userCIN = req.body.cin;
    var userpassword = req.body.mot_de_passe;
    console.log("numero de cin  : "+userCIN)
    console.log( " mot_de_passe : "+userpassword);

}
)
//4- démarrer le serveur
app.listen(port)