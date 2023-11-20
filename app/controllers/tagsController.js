const { Tag } = require("../models/index");

const tagsController = {


    async tagsPage(req,res) {

        try {

            let tags = await Tag.findAll();

            res.render("tags", {tags});

        }
        catch(err)
        {
            console.log(err);
            res.status(500).send(err);
        }
    }

}

module.exports = tagsController;