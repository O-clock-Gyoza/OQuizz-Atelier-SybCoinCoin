const { Tag } = require("../models/index");

const tagController = {


    async tagPage(req,res) 
    {

        try {

            // c'est un page avec une route dynamique
            // on recupere le parametre (qui est un number)
            let tagId = parseInt(req.params.id); // ou Number(req.params.id)

            let tag = await Tag.findByPk(tagId,
                { 
                    //include:["quizList" ] sans inglude
                    
                    include:[{ association: "quizList", include: ["author"] }] // avec l'include d'author
                        
                }

            )
            
            res.render("tag", {tag});

        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }


    }

}

module.exports = tagController;