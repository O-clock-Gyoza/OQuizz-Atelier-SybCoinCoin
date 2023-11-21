const express = require("express"); 


// require des controleur
const indexController = require("./controllers/indexController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const tagsController = require("./controllers/tagsController");

const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");

const disconnectController = require("./controllers/disconnectController");


// instance  du routeur
const router = express.Router();

// routes
router.get("/", indexController.homePage); 

router.get("/quiz/:id", quizController.quizPage);

router.get("/tag/:id", tagController.tagPage);

router.get("/tags", tagsController.tagsPage);

router.get("/login", loginController.loginPage);
router.post("/login", loginController.loginAction);

router.get("/signup", signupController.signupPage);
router.post("/signup", signupController.signupAction)

router.get("/disconnect", disconnectController.disconnectAction);


module.exports = router;