import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import "./style.css"
import EnemyCards from "../EnemyCards";
import PlayerCards from "../PlayerCards";
import Fightlogs from "../Fightlogs";
import characters from "../../json/characters.json"


class Combat extends Component {
    state = {
        items: []
    }

    randomEnemy = () => {
        let randNum = (Math.floor(Math.random() * 50) + 1)
        console.log(randNum)
    }

    render() {
        return (
            <>
                <div>
                    {this.randomEnemy()}
                    <div className="jumbotron">
                        <h1>Glorious Combat</h1>
                        <div className="container">
                            <div className="row">

                                <div className="combat-log col-md-3">
                                    <div>
                                        <Fightlogs />
                                    </div>
                                </div>
                                <div className="enemy-cards col-md-9">
                                    <div>
                                        <EnemyCards
                                            name={characters[0].name}
                                            image={characters[0].image}
                                            hitpoints={characters[0].hitpoints}
                                            attack={characters[0].attack}
                                            defense={characters[0].defense}
                                        />
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <div>
                                        <PlayerCards />
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