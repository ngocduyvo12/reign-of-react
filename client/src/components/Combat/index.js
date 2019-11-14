import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import "./style.css"
import EnemyCards from "../EnemyCards";
import PlayerCards from "../PlayerCards";
import Fightlogs from "../Fightlogs";
import MapInfoCombat from "../MapInfoCombat";
import characters from "../../json/characters.json";
import mapJSON from "../../json/map.json";
import API from "../../utils/API";

let randomMonster = Math.floor(Math.random() * 3)
let monsterID = mapJSON[0].monsters[randomMonster]

class Combat extends Component {

    state = {
        items: [],
        myCards: [],
        myPlayer: [],
        mapTier: 0,
        myAttack: 1,
        myDefense: 1,
        myHealth: 1,
        myTotalHealth: 1,
        myLevel: 1,
        monStat: 1,
        myEnemyAttack: characters[monsterID].attack,
        myEnemyDefense: characters[monsterID].defense,
        myEnemyHealth: characters[monsterID].hitpoints,
        calcEnemyAttack: "Hidden",
        calcEnemyDefense: "Hidden",
        calcEnemyHealth: "Hidden",
        locationData: {},
        monster: {},
        round: false,
        endRound: false,
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.loadUserInfo();
        this.loadLocationAndMonsterInfo();
    }

    loadUserInfo = () => {
        API.getUserId(this.props.match.params.id)
            .then(res => this.setState({ myCards: res.data.equippedCards, myPlayer: res.data }))
            .catch(err => console.log(err))
    }

    loadLocationAndMonsterInfo = () => {
        const locData = mapJSON.find(loc => loc.name === this.props.match.params.location);
        const tierData = locData.tier
        const MonsterData = parseInt(tierData * [Math.floor(Math.random() * 2) + 1])
        const monsterID = locData.monsters[Math.floor(Math.random() * 3)]
        this.setState({
            locationData: locData,
            monster: characters[monsterID],
            mapTier: tierData,
            monStat: MonsterData
        });
    }

    loadUserLevel = () => {
        const expThreshHold = 300
        let level = Math.floor((1 + Math.sqrt(1 + 8 * this.state.myPlayer.exp / expThreshHold)) / 2)
        return level
    }

    calcTotalHealth = () => {
        let healthNow = 0
        this.state.myCards.map(cards => (
            healthNow += parseInt(cards.hitPoint)
        ))
        this.setState({ myTotalHealth : healthNow, myHealth : healthNow})
    }

    calcEnemyStats = () => {
        this.setState ({ 
            calcEnemyAttack: ((this.state.myEnemyAttack * this.state.monStat) * 1),
            calcEnemyHealth: ((this.state.myEnemyHealth * this.state.monStat) * 1),
            calcEnemyDefense: ((this.state.myEnemyDefense * this.state.monStat) * 1)
        })
    }

    startRound = () => {
        if (!this.state.round) {
            this.calcTotalHealth();
            this.calcEnemyStats();
            this.setState({ round: true })
        } else {
            alert("you cant fight again here")
        }
    }

    checkCombat = (event) => {
        if (this.state.endRound) {
            alert("this combat is over")
        } else if (this.state.round) {
            this.attackNow(event)
        } else {
            alert("You must start the round")
        }
    }

    checkResolution = () => {
        if (!this.state.endRound) {
            if (this.state.calcEnemyHealth <= 0) {
                alert("YOU WON YAY")
                this.setState({ endRound: true})
            } else if (this.state.myHealth <= 0) {
                alert("NO YOU LOST")
                this.setState({ endRound: true, myHealth: 500})
            }
        }
    }

    attackNow = (event) => {
        if (this.state.calcEnemyHealth <= 0) {
            alert("you've won")
            this.setState({ endRound: true})
        } else {
            let thisAttack = event.target.getAttribute("data-attack")
            this.setState({ calcEnemyHealth: (this.state.calcEnemyHealth - thisAttack)})
            if (this.state.calcEnemyHealth <= 0) {
                alert("you have now won the combat")
            } else {
                this.checkMyAttack()
            }
        }
    }

    checkMyAttack = () => {
        if (this.state.calcEnemyHealth <= 0) {
            alert("win")
            // will be replaced with rewards modal
            this.setState({ endRound: true})
        } else {
            this.enemyAttack()
        }
    }

    enemyAttack = () => {
        if (this.state.myHealth <= 0) {
            alert("lose")
            this.setState({ endRound: true})
            // will be replaced with lose card / xp modal
        } else {
            this.setState({ myHealth: (this.state.myHealth - this.state.calcEnemyAttack)})
        }
    }

    render() {
        this.checkResolution()
        return (
            <>
                <div>
                    <div className="jumbotron">
                        <h1>Welcome To The Arena</h1>
                        <button onClick={this.startRound}>Start Round</button>
                        <div className="container">
                            <div className="row">
                                <div className="map-info col-md-12">
                                    <div>
                                        <MapInfoCombat
                                            mapName={this.state.locationData.name}
                                            mapLevel={this.state.locationData.tier}
                                            mapMonsters={this.state.locationData.monsters}
                                            mapExp={this.state.locationData.experience}
                                        />
                                    </div>
                                </div>

                                <div className="combat-log col-md-3">
                                    <div>
                                        <Fightlogs />
                                    </div>
                                </div>
                                <div className="enemy-cards col-md-9">
                                    <div>
                                        <EnemyCards
                                            name={this.state.monster.name}
                                            image={this.state.monster.image}
                                            hitpoints={this.state.calcEnemyHealth}
                                            attack={this.state.calcEnemyAttack}
                                            defense={this.state.calcEnemyDefense}
                                        />
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-danger"
                                                role="progressbar"
                                                aria-valuenow={this.state.myHealth}
                                                aria-valuemin="0"
                                                aria-valuemax={this.state.myTotalHealth}
                                                style={{ width: `${(this.state.myHealth / this.state.myTotalHealth) * 100}%` }}>
                                                Current Health : {`${((this.state.myHealth / this.state.myTotalHealth) * 100).toFixed(2)}%`}
                                                </div>
                                        </div>
                                        <PlayerCards
                                            userName={this.state.myPlayer.userName}
                                            lvl={this.loadUserLevel()}
                                            attack={this.loadUserLevel() * 32}
                                            defense={this.loadUserLevel() * 41}
                                            health={(this.loadUserLevel() * 234) + 550}
                                        />
                                        {this.state.myCards.map(cards => (
                                            <div key={cards._id} className="player-equipped">
                                                <h4> Name: {cards.name}</h4>
                                                <h5> Health: {cards.hitPoint}</h5>
                                                <h5> Attack: {cards.attack}</h5>
                                                <h5> Defense: {cards.defense}</h5>
                                                <img
                                                    id={cards._id}
                                                    src={cards.image}
                                                    alt={cards.name}
                                                    data-attack={cards.attack}
                                                    onClick={this.checkCombat}
                                                    className="equipped-combat"
                                                />
                                            </div>
                                        ))}
                                    </>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Combat;