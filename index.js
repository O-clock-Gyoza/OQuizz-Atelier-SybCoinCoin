// les requiress
require('dotenv').config(); // fichier d'environement pour garder les infos lié a la machine actuel (url de connection de la base, port, etc...)

const express = require("express");
const path = require("path");

const app = express();

const router = require("./app/router");

const session = require("express-session");

const userMiddleware = require("./app/middlewares/user");


//------ mise en place d'express

app.set("view engine","ejs"); // setting ejs comme moteur de view
app.set("views", "./app/views"); // on se trouve les ejs

// utilisation de midle ware pour delivrere les fichier static (css, img etc..)
app.use(express.static(path.join(__dirname,"./assets")));

// middleware (body parser) permettant de construire la reponse "body"
app.use(express.urlencoded({extended: true}));

// middlewhere de seeson
app.use(session(
    {
        saveUninitialized: true,
        resave: true,
        secret: "sflkjsdfj sdfoih ijshdfo qsdf sqfjh"
    }
));

// sert a renseigner les locals (accessible dans les ejs)
app.use(userMiddleware);

// middleware pour le routeur externalise
app.use(router);

// ecoute du server sur le port 3000
app.listen(3000, hey => { console.log("hey")});
