import React, { Component } from "react";
import "./player-stat.css"

class Player extends Component {

    state = {
        player: [],
        class: "Wizard",
        hp: 400
    }

    render() {
        return (
            <>
                <div id="player-stat-box">
                    <h2>Name: {this.props.userName}</h2>
                    <h2>Level: {this.props.lvl}</h2>
                    <h2>Attack: {this.props.attack}</h2>
                    <h2>Defense: {this.props.defense}</h2>
                    <h2>Health: {this.props.health}</h2>
                    <h2>Level: {this.props.lvl}</h2>
                </div>
            </>
        )
    }
}

export default Player;