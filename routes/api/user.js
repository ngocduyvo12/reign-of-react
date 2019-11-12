const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
    .route("/")
    .get(userController.findAll)
    .post(userController.create);

// Matches with "/api/user/:id"
router
    .route("/:id")
    //route for getting the user data id and populate it with it's data
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

//Matches with "/api/user/login"
router
    .route("/login")
    .post(userController.login)

//matches with "api/user/dev/seed-equipped"
router
    .route("/dev/seed-equipped")
    .get(userController.devSeed)

//matches with "api/user/getEquippedCards/:id"
router
    .route("/getEquippedCards/:id")
    .get(userController.getEquippedCards)
module.exports = router;
