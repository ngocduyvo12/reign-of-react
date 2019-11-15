import React, { Component } from "react";
import "./player-stat.css"

class Player extends Component {

    render() {
        return (
            <>

                    <h4>Name: {this.props.userName}</h4>
                    <br />
                    <h4>Level: {this.props.lvl}</h4>
                    <h4>Attack: {this.props.attack}</h4>
                    <h4>Defense: {this.props.defense}</h4>
                    <h4>Health: {this.props.health}</h4>

            </>
        )
    }
}

export default Player;