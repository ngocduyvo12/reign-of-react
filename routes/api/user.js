const router = require("express").Router();
const userController = require("../../controllers/userController");

// .get(() => console.log("testttt"))
// Matches with "/api/user"
router
    .route("/")
    .get(userController.findAll)
    .post(userController.create);



//Matches with "/api/user/login"
router
    .route("/login")
    .post(userController.login)
//matches with "api/user/getAllCards/:id"
router
    .route("/getAllCards/:id")
    .get(userController.getAllCards)

//matches with "api/user/getInventoryCards/:id"
router
    .route("/getInventoryCards/:id")
    .get(userController.getInventoryCards)

//matches with "api/user/updateEquippedCard"
//route for equipping a card if party have available slot
router
    .route("/updateEquippedCard")
    .post(userController.updateEquippedCard)

//matches with "api/user/unEquipCard"
//route for un-equipping a card
router
    .route("/unEquipCard")
    .post(userController.unEquipCard)

//route for seeding data for testing purposes.
//matches with "api/user/dev/seed-equipped"
router
    .route("/dev/seed-equipped")
    .get(userController.devSeed)
//route for seeding data for testing purposes.
//matches with "api/user/dev/seed-equipped"
router
    .route("/dev/seed-inventory")
    .get(userController.devSeedInvent)

router
    .route("/initcards/:id")
    .get(userController.initCards)

// Matches with "/api/user/:id"
router
    .route("/:id")
    //route for getting the user data id and populate it with it's data
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;
