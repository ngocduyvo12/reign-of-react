import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Map from "../components/map";
import Help from "../components/Help";
import Equipped from "../components/equipped/equipped";
import "../styles/map.css";
import "../styles/player-stat.css";

class Home extends Component {

    handleLocationClick = (name) => {
        this.props.history.push("/combat/" + name + "/" + this.props.match.params.id)
    }

    render() {

        return (
            <div className="container-fluid map-hold">
                <div className="row">
                    <div className="col-md-8">
                        {/* Map div */}
                        <div id="map-box">
                            {/* call on map component */}
                            {/* <MapWithRouter userid={this.props.match.params.id} /> */}
                            <Map handleLocationClick={this.handleLocationClick} />
                        </div>
                    </div>

                    <div className="col-md-4">
                        {/* player stats div */}
                        <div id="player-stat-box">
                            <Help />
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