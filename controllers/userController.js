const db = require("../models");

// Defining methods for the UserController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
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
  getEquippedCards: function (req, res) {
    db.User.findOne({_id: req.params.id})
    .populate("equippedCards")
    .then(function(dbCards){
      res.json(dbCards)
    }).catch(err => res.status(422).json(err))
  },

  //for testing purposes
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
          _id: "5dc9bd69e91e312af0524010"
        },
          { $push: { "equippedCards": dbSeed._id } },
          { new: true });
      }).then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
    // }
  }
};
