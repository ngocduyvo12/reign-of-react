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
        myAttack: 0,
        myDefense: 0,
        myHealth: 0,
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
        // this.loadAttack();
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
        const monsterID = locData.monsters[Math.floor(Math.random() * 3)]
        this.setState({
            locationData: locData,
            monster: characters[monsterID]
        });
    }

    // loadAttack = () => {
    //     let oldAttack = (this.state.myPlayer.exp)
    //     this.setState({ myAttack: oldAttack })
    // }

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
                                            hitpoints={this.state.myEnemyHealth}
                                            attack={this.state.myEnemyAttack}
                                            defense={this.state.myEnemyDefense}
                                        />
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <>
                                        {this.state.myCards.map(cards => (
                                            <div key={cards._id} className="player-equipped">
                                                <h4> Name: {cards.name}</h4>
                                                <h5> Health: {cards.hitPoint}</h5>
                                                <h5> Attack: {cards.attack}</h5>
                                                <h5> Defense: {cards.defense}</h5>
                                                <img
                                                    id={cards._id}
                                                    className="equipped-combat"
                                                    src={cards.image}
                                                    alt={cards.name}
                                                />
                                            </div>
                                        ))}
                                    </>
                                </div>
                                <div className="player-character col-md-12">
                                    <PlayerCards
                                        userName={this.state.myPlayer.userName}
                                        exp={this.state.myPlayer.exp}
                                        attack={this.state.myAttack}
                                    //  defense="Defense"
                                    //  health="Health"
                                    />
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