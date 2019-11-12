import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import "./style.css"
import EnemyCards from "../EnemyCards";
import PlayerCards from "../PlayerCards";
import Fightlogs from "../Fightlogs";

class Combat extends Component {
    state = {
        items: []
    }

    render() {
        return (
            <>
                <div>
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
                                        <EnemyCards />
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