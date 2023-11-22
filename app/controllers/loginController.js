const { User } = require("../models/index");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt'); // ser t a hacher les password



const loginController = {


    async loginPage(req,res) 
    {
        
        res.render("login",{error:undefined});

    },

    async loginAction(req, res)
    {


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


        // on recupere l'objet use a partir de la base de donné et de l'info email

        let user;
        try {
            user = await User.findOne(
                {
                    where : {
                        email: req.body.email
                    }
                }
            )
    
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }

        // si l'user existe on verifie le password haché
        if(user)
        {

            // bcrypt via cette fonction crypt req.body.password, puis la compare a
            // user.pasword qui est crypté
            let validPassword = bcrypt.compare(req.body.password, user.password);


            // si le mot de passe n'est pas valid
            // retour erreur
            if(!validPassword)
            {
                return res.render('login', {
                    error: "Ce n'est pas le bon mot de passe."
                  });
            }

        }
        else
        {
            return res.render('login', {
                error: "Cet utilisateur n'existe pas."
              });

        }


        // tout va bien le server est trouver

        // on creer une session pour l'utilisateur
        // avec des infos (ici : user)
        req.session.user = user;

        // on enleve des infos les donné sensible
        delete req.session.user.password;

        //----
        //prendre en compte le check

        //si il est coché
        if(req.body.check.value == "remeber-me")
        {   
            req.session.maxAge = (1000 * 60 * 60 * 24) * 365;
        }


        //--------

        res.redirect("/");


    }


}

module.exports = loginController;