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
                        <p>Player: {this.state.player}</p>
                        <p>Class: {this.state.class}</p>
                        <p>Hit Points: {this.state.hp}</p>
                </div>
            </>
        )
    }
}


export default Player;