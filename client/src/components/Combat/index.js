import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import EnemyCards from "../EnemyCards";
import PlayerCards from "../PlayerCards";
import Fightlogs from "../Fightlogs";
import PreCombat from "../PreCombat";
import MapInfoCombat from "../MapInfoCombat";
import characters from "../../json/characters.json";
import mapJSON from "../../json/map.json";
import API from "../../utils/API";
import player from "../../json/player.json"
import Modal from "react-modal";

class Combat extends Component {

  state = {
    //my stats
    items: [],
    myCards: [],
    myPlayer: [],
    mapTier: 0,
    myAttack: 1,
    myDefense: 1,
    myCurrentHealth: 1,
    myTotalHealth: 1,
    myLevel: 1,
    myTeam: [],
    myEnemyAttack: 1,
    myEnemyDefense: 1,
    myEnemyTotalHealth: 1,
    myEnemyCurrentHealth: 1,
    locationData: {},
    monster: {},
    round: true,
    endRound: false,
    winCard: characters[Math.floor(Math.random() * characters.length)]
  }

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(area) {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "black";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    this.loadUserInfo();
    this.loadLocationAndMonsterInfo();
    console.log("locdata:", this.state.locationData);
    // this.consoleLog();
    this.setState({
      winCard: characters[Math.floor(Math.random() * characters.length)]
    });
    // console.log("wincard", characters[Math.floor(Math.random() * characters.length)]);
  }

  loadUserInfo = () => {
    API.getUserId(this.props.match.params.id)
      // .then(res => this.setState({ myCards: res.data.equippedCards, myPlayer: res.data }))
      .then(res => {
        //use exp to get level
        const expThreshHold = 300
        let level = Math.floor((1 + Math.sqrt(1 + 8 * res.data.exp / expThreshHold)) / 2)

        //use equippedCards and user level to get total health and current health at the start of the game:
        let healthNow = (level * 234) + 550
        res.data.equippedCards.map(cards => (
          healthNow += parseInt(cards.hitPoint)
        ))
        // console.log(healthNow)

        //call function to create my team:
        this.createTeam(res, level)

        //set state with data response
        this.setState({
          myCards: res.data.equippedCards,
          myPlayer: res.data,
          myLevel: level,
          myCurrentHealth: healthNow,
          myTotalHealth: healthNow
        })
      })
      .catch(err => console.log(err))
  }

  //load location and monster info based on name of the map in param.
  loadLocationAndMonsterInfo = () => {
    //get the data of the map using the name in params
    const locData = mapJSON.find(loc => loc.name === this.props.match.params.location);
    // console.log(locData)
    //get map tier
    const tierData = locData.tier

    //monster stat modifier based on map tier.
    //Do a switch case here to determine enemy stat modifier based on map tier
    //probably better to do a function?
    const monStatModifier = this.monsterStatModifier(tierData)
    // console.log(monStatModifier)

    // const MonsterData = parseInt(tierData * [Math.floor(Math.random() * 2) + 1])

    //get a random monster from location data
    const monsterID = locData.monsters[Math.floor(Math.random() * 3)]
    // console.log("mon:",characters[monsterID]);
    this.setState({
      locationData: locData,
      monster: characters[monsterID],
      mapTier: tierData,
      //set state modifier for monster. Need to be stored in state?
      // monStat: monStatModifier,
      myEnemyAttack: characters[monsterID].attack * monStatModifier.ADModifier,
      myEnemyDefense: characters[monsterID].defense * monStatModifier.ADModifier,
      myEnemyTotalHealth: characters[monsterID].hitpoints * monStatModifier.HPModifier,
      myEnemyCurrentHealth: characters[monsterID].hitpoints * monStatModifier.HPModifier,
    });
    console.log("in", this.state.locationData);
  }

  //function to calculate monster stat modifier based on map tier
  monsterStatModifier = (tierData) => {
    switch (tierData) {
      //if map is tier 1 double enemy HP stats
      case 1:
        return {
          //HP modifier
          HPModifier: tierData * 2,
          //attack and defense modifier
          ADModifier: 1
        }
      //if map is tier 2 quadruple enemy HP and random attack defense modifier between 1.5-2
      case 2:
        return {
          //HP modifier
          HPModifier: tierData * 2,
          //attack and defense modifier
          ADModifier: (Math.random() * (2 - 1.5) + 1.5).toFixed(1)
        }
      //if map is tier 3 sextuple enemy stats and random attack and defense modifier between 2 - 2.5
      case 3:
        return {
          //HP modifier
          HPModifier: tierData * 2,
          //attack and defense modifier
          ADModifier: (Math.random() * (2.5 - 2) + 2).toFixed(1)
        }
    }
  }

  //modified combat logic:

  //function to console log data for testing:
  consoleLog = () => {
    //this function will alway get the data. Write function in here and call them
    console.log("my player data: ")
    console.log(this.state.myPlayer)
    console.log("my equipped card data: ")
    console.log(this.state.myCards)
  }

  //turn the player into a card
  //push to my team array
  //push equipped cards into my team array as well
  //create an array object of the player's team:

  createTeam = (res, level) => {
    var myTeamArray = []
    //determine with image to place based on level:
    var imageSrc = "/img/player/"
    if (level < 10) {
      imageSrc += player[0].image
      console.log(imageSrc)
    }
    //make a player card:
    var myPlayerObj = {
      _id: res.data._id,
      name: res.data.userName,
      lvl: level,
      attack: level * 32,
      defense: level * 41,
      hitPoints: (level * 234) + 550,
      currentHealth: (level * 234) + 550,
      image: imageSrc,
      alive: true
    }
    //push player card to team array
    myTeamArray.push(myPlayerObj)
    console.log(res.data.equippedCards)

    //push my cards into team array:
    res.data.equippedCards.map(card => (
      card.alive = true,
      card.currentHealth = card.hitPoints,
      myTeamArray.push(card)
    ))
    //set myTeam state to myTeamArray:
    this.setState({ myTeam: myTeamArray })
    // console.log(this.state.myTeam)
  }

  //on click of image, attack the enemy card like the original logic.
  //after player finished attacking, check to see if enemy health is lesser or equal to zero. 
  //If it is end combat and toggle reward modal. 
  //If not then update enemy current health
  //then enemy will loop through the player's team and attack card that still have the state of alive.
  //after enemy attack check health of each member of the player team. If any card have an hp of <= 0. change status to dead.
  //if the number team member alive is >= 0. update health and end this turn by using return to break out of the loop


  attackNow = (event) => {
    //if enemy is already dead, prevent further action. Probably wont be needing this
    if (this.state.myEnemyCurrentHealth <= 0) {
      alert("Enemy is dead")
      return
    } else {
      //player's attack logic
      let thisAttack = event.target.getAttribute("data-attack");
      let enemyHealthAfterAttack = this.state.myEnemyCurrentHealth - thisAttack
      this.setState({ myEnemyCurrentHealth: enemyHealthAfterAttack })

      //check winning condition here with out waiting for state to set in
      if (enemyHealthAfterAttack <= 0) {
        // alert("You have won")

        API.addInventory(this.state.winCard, this.props.match.params.id)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        //toggle reward modal here
          this.openModal();
      }
      //if enemy not dead after attack, call enemyAttack
      else {
        this.enemyAttack()
      }
    }
  }

  enemyAttack = () => {
    //loop through player team and attack a random card with state of alive
    //use filter to get an array of still alive cards
    var currentTeamCombat = this.state.myTeam.filter(card => card.alive === true)

    console.log("current combat team")
    console.log(currentTeamCombat)
    //get enemy attack and attack a random card in the currentTeamCombat:

    //pick a random card in the currentTeamCombat array:
    //get the index of the card
    const randomCardIndex = Math.floor(Math.random() * currentTeamCombat.length)
    const cardGettingAttacked = currentTeamCombat[randomCardIndex]
    console.log("card getting attacked: ")
    console.log(cardGettingAttacked)
    //get enemy attack:
    let thisAttack = this.state.myEnemyAttack;
    //get health after attack:
    let myCardHealthAfterAttack = Math.max((cardGettingAttacked.currentHealth - thisAttack), 0);

    //update current health of the attacked card
    //set state of current health for this card. Use card's ID to update its health in state
    //use for loop to use card id of the attacked card and cross reference to this card in state
    for (let i = 0; i < currentTeamCombat.length; i++) {
      // console.log(currentTeamCombat[i])
      if (cardGettingAttacked._id === currentTeamCombat[i]._id) {
        console.log("current combat team after updated health:")
        currentTeamCombat[i].currentHealth = myCardHealthAfterAttack
        if (currentTeamCombat[i].currentHealth <= 0) {
          currentTeamCombat[i].alive = false;
        }

        console.log(currentTeamCombat)
        console.log("team in state: ")
        console.log(this.state.myTeam)
        //set current health of the card in current combat team
        //set myTeam array state to this current combat team
        //WHY IS THIS WORKING WITHOUT SETTING STATE????????
        // this.setState({myTeam: currentTeamCombat})

        //checking if any card is alive still
        var checkLost = currentTeamCombat.filter(card => card.alive === true)
        if (checkLost.length < 1) {
          //penalty modal here
          // this.handleResult(false);
          // console.log(this.state.winCard);
          const lostCard = this.state.myCards[Math.floor(Math.random() * this.state.myCards.length)];
          this.setState({ lostCard: lostCard });
          API.removeInventory(lostCard, this.props.match.params.id)
            .then(res => console.log(res))
            .catch(err => console.log(err))

          // alert("You ded")
          this.openModal();
        }
      }
    }
  }


  handleResult = (result) => {
    console.log("result", result);
  }

  goHome = () => {
    this.props.history.push("/home/" + this.props.match.params.id)
  }

  render() {
    // this.consoleLog()
    return (
      <>
        <div>
          <div className="jumbotron">
            <h1>Welcome To The Arena</h1>
            {/* <button onClick={this.startRound}>Start Round</button> */}
            <div className="container">
              <div className="row">
                <div className="map-info col-md-12">
                  <MapInfoCombat
                    locdata={this.state.locationData}
                  />
                </div>

                <div className="combat-log col-md-3">
                  <Fightlogs />
                </div>
                <div className="enemy-cards col-md-9">
                  <EnemyCards
                    monster={this.state.monster}
                    hitpoints={this.state.myEnemyCurrentHealth}
                    attack={this.state.myEnemyAttack}
                    defense={this.state.myEnemyDefense}
                  />
                </div>

                {this.state.myTeam ? (
                  this.state.myTeam.map(cards => (
                    <div key={cards._id} className="player-equipped">
                      <h4> Name: {cards.name}</h4>
                      {/* health will probably be changed to current health for each card */}
                      <div className="progress">
                        <div className="progress-bar progress-bar-danger"
                          role="progressbar"
                          aria-valuenow={cards.currentHealth}
                          aria-valuemin="0"
                          aria-valuemax={cards.hitPoints}
                          style={{ width: `${(cards.currentHealth / cards.hitPoints) * 100}%` }}>
                          Current Health : {`${((cards.currentHealth / cards.hitPoints) * 100).toFixed(2)}%`}
                        </div>
                      </div>

                      <h5> Health: {cards.currentHealth}</h5>
                      <h5> Attack: {cards.attack}</h5>
                      <h5> Defense: {cards.defense}</h5>
                      <input
                        type="image"
                        id={cards._id}
                        // src={cards.image}
                        src={process.env.PUBLIC_URL + "/img/cards/" + cards.image}
                        alt={cards.name}
                        data-attack={cards.attack}
                        data-alive={cards.alive}
                        disabled={cards.alive ? false : true}
                        //need data for current health and max health
                        onClick={this.attackNow}
                        className="equipped-combat"
                      />
                    </div>
                  ))
                ) : ""
                }

              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <>
            <div>
              <div className="jumbotron" ref={subtitle => this.subtitle = subtitle}>
                <h1 ref={subtitle => this.subtitle = subtitle}>End of Combat</h1>
                <div className="container" ref={subtitle => this.subtitle = subtitle}>
                  <div className="row" ref={subtitle => this.subtitle = subtitle}>

                    <div className="combat-result col-md-7" ref={subtitle => this.subtitle = subtitle}>
                      <div>
                        {this.state.winCard ?
                          <>
                            <h3>You win: {this.state.winCard.name}</h3>
                            <input
                              type="image"
                              id={this.state.winCard._id}
                              // src={cards.image}
                              src={process.env.PUBLIC_URL + "/img/cards/" + this.state.winCard.image}
                              alt={this.state.winCard.name}
                              data-attack={this.state.winCard.attack}
                              className="equipped-combat"
                            />
                          </>
                          : ""}
                      </div>
                    </div>

                    <div className="card-status col-md-5" ref={subtitle => this.subtitle = subtitle}>
                      <div>
                        {this.state.lostCard ?
                          <>
                            <h3>You lose: {this.state.lostCard.name}</h3>
                            <input
                              type="image"
                              id={this.state.lostCard._id}
                              // src={cards.image}
                              src={process.env.PUBLIC_URL + "/img/cards/" + this.state.lostCard.image}
                              alt={this.state.lostCard.name}
                              data-attack={this.state.lostCard.attack}
                              className="equipped-combat"
                            />
                          </>
                          : ""}
                      </div>
                    </div>

                    <div className="card-inventory col-md-12" ref={subtitle => this.subtitle = subtitle}>
                      <div>
                        Player stats and card inventory will go here
                                    </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-lg btn-dark result-submit"
                      onClick={this.goHome}
                    >Return to Map</button>

                  </div>
                </div>
              </div>
            </div>
          </>

        </Modal>
      </>
    )
  }
}



export default Combat;