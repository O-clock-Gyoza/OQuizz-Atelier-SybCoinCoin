// permet de se deconnecter
const disconnectController = {


    disconnectAction(req,res) 
    {

        req.session.user = false;
        
        res.redirect("/login");

    }

}

module.exports = disconnectController;