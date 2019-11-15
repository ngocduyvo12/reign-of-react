import React, { Component } from "react";
import Map from "../components/map"
import Help from "../components/Help"
import Player from "../components/Player";
import Equipped from "../components/equipped/equipped"
import player from "../json/player.json"
import API from "../utils/API";
import "../styles/map.css";
import "../styles/player-stat.css"

class Home extends Component {

    state = {
        randomBackground: [],
        player: [],
        playerImage: "",
        myLevel: ""
    }

    componentDidMount() {
        API.getUserId(this.props.match.params.id)
            .then(data => {
                const expThreshHold = 300
                let level = Math.floor((1 + Math.sqrt(1 + 8 * data.data.exp / expThreshHold)) / 2)
                let imageSrc = ""
                if (level > 0) {
                    imageSrc = player[level - 1].image
                }
                this.setState({ 
                    player: data.data,
                    playerImage : imageSrc,
                    myLevel : level
                 })
            })
            .catch(err => console.log(err))
    }

    handleLocationClick = (name) => {
        this.props.history.push("/combat/" + name + "/" + this.props.match.params.id)
    }

    render() {

        return (
            <div className="container-fluid map-hold">
                <div className="row">
                    <div className="col-md-8">
                    <img id="map-compass" src="../img/map/compass.png" />
                        {/* Map div */}
                        <div id="map-box">
                            {/* call on map component */}
                            {/* <MapWithRouter userid={this.props.match.params.id} /> */}
                            <Map handleLocationClick={this.handleLocationClick} />
                        </div>
                    </div>

                    <div className="col col-md-4">
                        {/* player stats div */}
                        <div className="row">
                                <div id="player-stat-box">
                                    <Help />
                                    {/* <div className="row align-items-center"> */}
                                        <Player
                                            userName={this.state.player.userName}
                                            lvl={this.state.myLevel}
                                            attack={this.state.myLevel * 32}
                                            defense={this.state.myLevel * 41}
                                            health={(this.state.myLevel * 234) + 550}
                                        />
                                        <img id="player-image" src={process.env.PUBLIC_URL + "/img/cards/" + this.state.playerImage}></img>
                                    {/* </div> */}
                            </div>
                        </div>
                    </div>

                    {/* equipped card div */}
                    <div className="col-md-12" id="player-cards-home">
                        {/* logic to display current equipped cards */}
                        <Equipped {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;