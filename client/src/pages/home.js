import React, { Component } from "react";
import Map from "../components/map"
import Help from "../components/Help"
import Player from "../components/Player";
import "../styles/map.css";
import "../styles/player-stat.css"
import Equipped from "../components/equipped/equipped"
import API from "../utils/API";

class Home extends Component {

    state = {
        randomBackground: [],
        player: []
    }

    // background = () => {
    //     player: []
    // }

    componentDidMount() {
        API.getUserId(this.props.match.params.id)
            .then(data => {
                this.setState({ player: data.data })
            })
            .catch(err => console.log(err))
    }

    handleLocationClick = (name) => {
        this.props.history.push("/combat/" + name + "/" + this.props.match.params.id)
    }

    loadUserLevel = () => {
        const expThreshHold = 300
        let level = Math.floor((1 + Math.sqrt(1 + 8 * this.state.player.exp / expThreshHold)) / 2)
        return level
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
                                            lvl={this.loadUserLevel()}
                                            attack={this.loadUserLevel() * 32}
                                            defense={this.loadUserLevel() * 41}
                                            health={(this.loadUserLevel() * 234) + 550}
                                        />
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