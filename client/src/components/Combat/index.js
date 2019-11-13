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
let totalHealth = 0

class Combat extends Component {

    state = {
        items: [],
        myCards: [],
        myPlayer: [],
        mapTier: 0,
        myAttack: 1,
        myDefense: 1,
        myHealth: 1,
        myLevel: 1,
        monStat: 1,
        myEnemyAttack: characters[monsterID].attack,
        myEnemyDefense: characters[monsterID].defense,
        myEnemyHealth: characters[monsterID].hitpoints,
        locationData: {},
        monster: {},
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.loadUserInfo();
        this.loadUserCharacter();
        this.loadLocationAndMonsterInfo();
    }

    loadUserInfo = () => {
        API.getUserId(this.props.match.params.id)
            .then(res => this.setState({ myCards: res.data.equippedCards }))
            .catch(err => console.log(err))
    }

    loadUserCharacter = () => {
        API.getUserId(this.props.match.params.id)
            .then(res => this.setState({ myPlayer: res.data }))
            .catch(err => console.log(err))
    }

    loadLocationAndMonsterInfo = () => {
        const locData = mapJSON.find(loc => loc.name === this.props.match.params.location);
        const tierData = locData.tier
        const MonsterData = parseInt(tierData * [Math.floor(Math.random() * 2) + 1])
        console.log("Monster Data " + MonsterData)
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

    calcHealth = () => {
        this.state.myCards.map(cards => (
            totalHealth += parseInt(cards.hitPoint)
        ))
        return (totalHealth / 2)
    }

    attackNow = (event) => {
        const thisAttack = event.target.attackvalue
        const id = event.target.value
        console.log(id)
    }


    render() {
        return (
            <>
                <div>
                    <div className="jumbotron">
                        <h1>Welcome To The Arena</h1>
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
                                            hitpoints={(this.state.myEnemyHealth * this.state.monStat) * .5}
                                            attack={this.state.myEnemyAttack * this.state.monStat}
                                            defense={this.state.myEnemyDefense * this.state.monStat}
                                        />
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <>
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-danger"
                                                role="progressbar"
                                                aria-valuenow="70"
                                                aria-valuemin="0"
                                                aria-valuemax={this.calcHealth() + ((this.loadUserLevel() * 83) + 820)}
                                                style={{ width: "70%" }}>
                                                Current Health
                                                </div>
                                        </div>
                                        <PlayerCards
                                            userName={this.state.myPlayer.userName}
                                            lvl={this.loadUserLevel()}
                                            attack={this.loadUserLevel() * 55}
                                            defense={this.loadUserLevel() * 70}
                                            health={(this.loadUserLevel() * 83) + 820}

                                        />
                                        {this.state.myCards.map(cards => (
                                            <div key={cards._id} className="player-equipped">
                                                <h4> Name: {cards.name}</h4>
                                                <h5> Health: {cards.hitPoint}</h5>
                                                <h5> Attack: {cards.attack}</h5>
                                                <h5> Defense: {cards.defense}</h5>
                                                <img
                                                    // id={cards._id}
                                                    src={cards.image}
                                                    alt={cards.name}
                                                    value={cards.attack}
                                                    onClick={this.attackNow}
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