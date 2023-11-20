const { Quiz } = require("../models/index");

const indexController = {

    async homePage (req,res)
    {

        try{

            let quizzes = await Quiz.findAll(
                {
                    include: ["author"]
                }
            );
    
            res.render("index",{quizzes});

        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }

    }

}

module.exports = indexController;