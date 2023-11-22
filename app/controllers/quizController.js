const { Quiz } = require("../models/index");

const quizController = {


    async quizPage(req,res) {

        try{

            let quizId = parseInt(req.params.id); // ou Number(req.params.id)

            let quiz = await Quiz.findByPk(quizId,
                {
                   include: [
                        "tags", // fonction avec une association "nue" {association : "tags"}
                        "author",
                        { association: "questions", include: ["answers","level","good_answer"] } // join appartir de questions
                    ]
                }
            )
    
            res.render("quiz", {quiz});
    
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }
    }

}

module.exports = quizController;