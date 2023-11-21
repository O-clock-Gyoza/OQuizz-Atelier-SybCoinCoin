// ce middle where sert a resseigner le locals de la resence d'un utiliteurs connecté
//

const userMiddleware = (req, res, next) => {

    if(req.session.user)
    {
        res.locals.user = req.session.user;
    }
    else
    {
        res.locals.user = false;
    }

        next();
}

module.exports = userMiddleware;