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
        myEnemyAttack: characters[monsterID].attack,
        myEnemyDefense: characters[monsterID].defense,
        myEnemyHealth: characters[monsterID].hitpoints,
    }

    loadUserInfo = () => {
        API.getUserId(this.props.match.params.id)
        .then(res => console.log(res.data))
        // .then(res => this.setState({ myCards: res.data.equippedCards }))
        .catch(err => console.log(err))
    }
    
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.loadUserInfo();
    }
    
    render() {
        return (
            <>
                <div>
                    <div className="jumbotron">
                        <h1>Glorious Combat</h1>
                        <div className="container">
                            <div className="row">
                                <div className="map-info col-md-12">
                                    <div>
                                        <MapInfoCombat
                                            mapName={mapJSON[0].name}
                                            mapLevel={mapJSON[0].tier}
                                            mapMonsters={mapJSON[0].monsters}
                                            mapExp={mapJSON[0].experience}
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
                                            name={characters[monsterID].name}
                                            image={characters[monsterID].image}
                                            hitpoints={this.state.myEnemyHealth}
                                            attack={this.state.myEnemyAttack}
                                            defense={this.state.myEnemyDefense}
                                        />
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <div>
                                        <PlayerCards 
                                            myCards={this.state.myCards}
                                        />
                                    </div>
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