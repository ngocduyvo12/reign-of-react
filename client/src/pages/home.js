import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Map from "../components/map"
import Help from "../components/Help"
import "../styles/map.css";
import "../styles/player-stat.css"
import Equipped from "../components/equipped/equipped"

class Home extends Component {

    handleLocationClick = (name) => {
        this.props.history.push("/combat/"+name+"/"+this.props.match.params.id)
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-8">
                        {/* Map div */}
                        <div id="map-box">
                            {/* call on map component */}
                            {/* <MapWithRouter userid={this.props.match.params.id} /> */}
                            <Map handleLocationClick={this.handleLocationClick} />
                        </div>
                    </div>

                    <div className="col col-lg-4">
                        {/* player stats div */}
                        <div className="row">
                            <div className="col">
                                <div id="player-stat-box">
                                    <Help />
                                    <div className="row align-items-center">
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* equipped card div */}
                        <div className="row">
                            {/* logic to display current equipped cards */}
                            <Equipped {...this.props} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;