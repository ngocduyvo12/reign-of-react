import React, { Component } from "react";
import ReactDOM from "react-dom"
import "./player-stat.css"
import API from "../../utils/API";

class Player extends Component {

    state = {
        player: [],
        class: "Wizard",
        hp: 400
    }

    componentDidMount() {
        // console.log(this.props.match.params.id);
        console.log(this.props.userid);
        API.getUserId(this.props.userid)
            .then(data => {
                console.log(data.data);
                //  this.setState({player: data.data})
            })
            .catch(err => console.log(err))
        // const user = 
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