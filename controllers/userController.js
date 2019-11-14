const characters = require("../client/src/json/characters.json");
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
    // console.log("user findbyid");
    // console.log(req.params.id)
    db.User
      .findById(req.params.id)
      .populate(["inventoryCards", "equippedCards"])
      .then(dbModel => {
        console.log("user: ", dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
    // console.log(this.getAllCards());
  },

  //route for creating new user data
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)})
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
    db.User.findOne({ _id: req.params.id })
      .populate(["equippedCards", "inventoryCards"])
      .then(function (dbCards) {
        res.json(dbCards)
      }).catch(err => res.status(422).json(err))
  },

  //get info from inventory cards
  getInventoryCards: function (req, res) {
    // console.log(req.params.id) -- OK!
    db.User.findOne({ _id: req.params.id })
      .populate("inventoryCards")
      .then(function (dbCards) {
        res.json(dbCards)
      }).catch(err => res.status(422).json(err))
  },

  updateEquippedCard: function (req, res) {
    // console.log(req.body)
    db.EquippedCards.create({
      name: req.body.name,
      image: req.body.image,
      hitPoints: req.body.hitPoints,
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
      }).then(function (dbModel) {
        // console.log(req.body)
        return db.InventoryCards.findByIdAndDelete(req.body._id)
      }).then(function (dbMod) {
        return db.User.findByIdAndUpdate(req.body.userID, { $pull: { inventoryCards: req.body._id } })
      })
      .then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
  },

  unEquipCard: function (req, res) {
    // console.log(req.body)
    db.InventoryCards.create({
      name: req.body.name,
      image: req.body.image,
      hitPoints: req.body.hitPoints,
      attack: req.body.attack,
      defense: req.body.defense,
      rarity: req.body.rarity
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({ _id: req.body.userID },
          { $push: { "inventoryCards": dbSeed._id } },
          { new: true });
      }).then(function (dbModel) {
        // console.log(req.body)
        return db.EquippedCards.findByIdAndDelete(req.body._id)
      }).then(function (dbMod) {
        return db.User.findByIdAndUpdate(req.body.userID, { $pull: { equippedCards: req.body._id  } })
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
      image: "/img/cards/lvl1_ancientWhale.png",
      hitPoints: 1300,
      attack: 97,
      defense: 130,
      rarity: 1
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({
          _id: "5dcc6c6a0c717b18f8de60ef"
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
      image: "/img/cards/lvl1_dragonZombie.jpg",
      hitPoints: 920,
      attack: 113,
      defense: 92,
      rarity: 1
    })
      .then(function (dbSeed) {
        return db.User.findOneAndUpdate({
          _id: "5dcc6c6a0c717b18f8de60ef"
        },
          { $push: { "inventoryCards": dbSeed._id } },
          { new: true });
      }).then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
    // }
  },

  addInventory: function (data) {
    const card = data.card;
    const userid = data.userid;
    db.InventoryCards.create({
      name: card.name,
      image: card.image,
      hitPoints: parseInt(card.hitpoints),
      attack: parseInt(card.attack),
      defense: parseInt(card.defense),
      rarity: parseInt(card.rarity)
    })
      .then(function (newCard) {
        return db.User.findOneAndUpdate({
          _id: userid
        },
          { $push: { "inventoryCards": newCard._id } },
          { new: true });
      }).then(function (result) {
        res.json(result)
      }).catch(err => console.log(err))
    // }
  },

  initCards: function (req, res) {
    // console.log(characters);
    // res.json(req.params.id);
    const rarityOneMonsters = characters.filter(c => c.rarity === 1);
    for (let i = 0; i < 4; i++) {
      const card = rarityOneMonsters[Math.floor(Math.random() * rarityOneMonsters.length)];
      // console.log(card.hitpoints);
      db.InventoryCards.create({
        name: card.name,
        image: card.image,
        hitPoints: parseInt(card.hitpoints),
        attack: parseInt(card.attack),
        defense: parseInt(card.defense),
        rarity: parseInt(card.rarity)
      })
        .then(function (newInvCard) {
          // console.log(newInvCard);
          db.User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $push: { "inventoryCards": newInvCard._id } }, 
            { new: true })
            .then(res => 
              console.log(res)
              );

          db.EquippedCards.create({
            name: card.name,
            image: card.image,
            hitPoints: parseInt(card.hitpoints),
            attack: parseInt(card.attack),
            defense: parseInt(card.defense),
            rarity: parseInt(card.rarity)
          }).
          then(function (newEquippedCard) {
            db.User.findOneAndUpdate(
              { _id: req.params.id }, 
              { $push: { "equippedCards": newEquippedCard._id } }, 
              { new: true })
              .then(res => 
                console.log(res)
                );
          }
          )
            .then(function (result) {
              res.json(result)
            }).catch(err => console.log(err));
        })
    }
  }
};
