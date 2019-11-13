const db = require("../models");

// Defining methods for the UserController
module.exports = {

  //unused?
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //unused?
  findById: function (req, res) {
    console.log(req.params.id)
    db.User
      .findById(req.params.id)
      .populate("equippedCards")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //route for creating new user data
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //unused?
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //unused?
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //route for getting username and login info
  login: function (req, res) {
    db.User
      .find({ userName: req.body.userName, password: req.body.password })
      .then(dbModel => {
        if (dbModel.length === 0) {
          return res.status(404).end()
        }
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err))
  },

  //get info from equipped cards
  getAllCards: function (req, res) {
    db.User.findOne({_id: req.params.id})
    .populate(["equippedCards", "inventoryCards"])
    .then(function(dbCards){
      res.json(dbCards)
    }).catch(err => res.status(422).json(err))
  },

  //get info from inventory cards
  getInventoryCards: function (req, res) {
    // console.log(req.params.id) -- OK!
    db.User.findOne({_id: req.params.id})
    .populate("inventoryCards")
    .then(function(dbCards){
      res.json(dbCards)
    }).catch(err => res.status(422).json(err))
  },

  updateEquippedCard: function (req, res){
    // console.log(req.body)
    db.EquippedCards.create({
      name: req.body.name,
      image: req.body.image,
      hitPoint: req.body.hitPoint,
      attack: req.body.attack,
      defense: req.body.defense,
      rarity: req.body.rarity
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({
          _id: req.body.userID
        },
          { $push: { "equippedCards": dbSeed._id } },
          { new: true });
      }).then(function(dbModel){
        // console.log(req.body)
        return db.InventoryCards.findByIdAndDelete(req.body._id)
      }).then(function(dbMod){
        return db.User.findByIdAndUpdate(req.body.userID, {$pull: {inventoryCards: {_id: req.body._id}}})
      })
      .then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
  },

  unEquipCard: function (req, res){
    // console.log(req.body)
    db.InventoryCards.create({
      name: req.body.name,
      image: req.body.image,
      hitPoint: req.body.hitPoint,
      attack: req.body.attack,
      defense: req.body.defense,
      rarity: req.body.rarity
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({ _id: req.body.userID},
          { $push: { "inventoryCards": dbSeed._id }},
          { new: true });
      }).then(function(dbModel){
        // console.log(req.body)
        return db.EquippedCards.findByIdAndDelete(req.body._id)
      }).then(function(dbMod){
        return db.User.findByIdAndUpdate(req.body.userID, {$pull: {equippedCards: {_id: req.body._id}}})
      })
      .then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
  },

  //for testing purposes
  //this is a route to seed equipped card in db
  devSeed: function (req, res) {
    // for(var i = 0; i < 4; i++){
    db.EquippedCards.create({
      name: "Ancient Whale",
      image: "../img/cards/lvl1_ancientWhale.png",
      hitPoint: 1300,
      attack: 97,
      defense: 130,
      rarity: 1
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({
          _id: "5dcafd2b446e4514fca90e76"
        },
          { $push: { "equippedCards": dbSeed._id } },
          { new: true });
      }).then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
    // }
  },
  //for testing purposes
  devSeedInvent: function (req, res) {
    // for(var i = 0; i < 4; i++){
    db.InventoryCards.create({
      name: "Dragon Zombie",
      image: "../img/cards/lvl1_dragonZombie.jpg",
      hitPoint: 920,
      attack: 113,
      defense: 92,
      rarity: 1
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({
          _id: "5dcafd2b446e4514fca90e76"
        },
          { $push: { "inventoryCards": dbSeed._id } },
          { new: true });
      }).then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
    // }
  }
};
