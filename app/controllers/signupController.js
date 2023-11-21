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
                limit du password : au moin 4 chars
                si l'email est valide

            2 verifier si l'email est deja dans la base
        */

        console.log("req.body.email ", req.body.email);



        // verification du password

        // les password sont egaux
        if (req.body.password !== req.body.passwordConfirm) 
        {
            return res.render('signup', {
              error: "La confirmation du mot de passe ne correspond pas."
            });
        }

        // le password doit faire au moins 4 caracteres
        if (req.body.password.length <  4) 
        {
            return res.render('signup', {
              error: "Le password doit faire au moins 4 caractères."
            });
        }

        // verification de l'email
        if(!emailValidator.validate(req.body.email))
        {
            return res.render("signup", {
                error: "Cet email n'est pas valide"
            });
        }

        // verifier si l'email est dans la base

        try{

            let userintable = await User.findOne(
                {
                    where: {
                        email: req.body.email
                    }
                }
            )
            // il trouve un utilisateur donc erreur
            // on ne peut inscrire que ceux qui ne sont pas deja dans la base
            if(userintable)
            {
                return res.render("signup", {
                    error: "Cet email est déjà inscrit dans la base"
                });
            }
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }

        // une fois que c'est ok 

        // on hash le password pour q'il ne soit plus reconnaissable
        // et qu'on ne puisse plus retrouver le password avec le resultat.
        let salt = await bcrypt.genSalt(10);
        let passEncrypted = await bcrypt.hash(req.body.password, salt);
        
        // on ne peut retrouver la password qu'en hash a nouveau celui ci
        // et en le comparant.

        // on créer un nouvel user
        let newUser = new User(
            
            {
                // value des propriété
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password : passEncrypted // on met le password crypter

             }
        );

        try{
            await newUser.save(); // sauvegarde dans la dtb

            // on renvois la page "login"
            res.redirect("/login");
    
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }

    }

}

module.exports = signupController;