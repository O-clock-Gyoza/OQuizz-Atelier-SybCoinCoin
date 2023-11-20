// necessite l'installation de email validaror
const { User } = require("../models/index");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt'); // ser t a hacher les password

const signupController = {


    async signupPage(req,res) 
    {
        
        res.render("signup", {error: undefined});

    },

    async signupAction(req, res)
    {
        /*
            1 verifier si les champs sont valides
                
                les password sont egaux 
                si l'email est valide

            2 verifier si l'email n'est pas deja dans la base
        */

        console.log("req.body.email ", req.body.email);

        if(!emailValidator.validate(req.body.email))
        {
            return res.render("signup", {error: "Cet email n'est pas valide"});
        }

        if (req.body.password !== req.body.passwordConfirm) 
        {
            return res.render('signup', {
              error: "La confirmation du mot de passe ne correspond pas."
            });
        }

        /**
        
            AUTRE VERIFICATION 
        
        */


        // une fois que c'est ok 

        // on hash le password pour q'il ne soit plus reconnaissable
        // et qu'on ne puisse plus retrouver le password avec le resultat.
        let salt = await bcrypt.genSalt(10);
        let passEncrypted = await bcrypt.hash(req.body.password, salt);
        
        // on ne peut retrouver la password qu'en hash a nouveau celui ci
        // et en le comparant.


        // on créer un nouvel user
        let user = new User(
            
            {
                // value des propriété
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password : passEncrypted // on met le password crypter

             }
        );

        await user.save(); // sauvegarde dans la dtb

        // on renvois la page "login"
        res.render("/login");


    }

}

module.exports = signupController;