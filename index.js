// les requiress
require('dotenv').config(); // fichier d'environement pour garder les infos lié a la machine actuel (url de connection de la base, port, etc...)

const express = require("express");
const path = require("path");

const app = express();

const router = require("./app/router");


//------ mise en place d'express

app.set("view engine","ejs"); // setting ejs comme moteur de view
app.set("views", "./app/views"); // on se trouve les ejs

// utilisation de midle ware pour delivrere les fichier static (css, img etc..)
app.use(express.static(path.join(__dirname,"./assets")));

// middleware (body parser) permettant de construire la reponse "body"
app.use(express.urlencoded({extended: true}));


// middleware pour le routeur externalise
app.use(router);

// ecoute du server sur le port 3000
app.listen(3000, hey => { console.log("hey")});
