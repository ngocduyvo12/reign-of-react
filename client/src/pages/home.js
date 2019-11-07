import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Map from "../components/map"
import "../styles/map.css";
import "../styles/player-stat.css"

class Home extends Component {
    state = {
        items: []
    }

    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-8">

                        {/* Map div */}
                        <div id="map-box">
                            <Draggable {...dragHandlers}>
                                <div id="text-box" >
                                    <img src="./img/map/map.png" id="map" alt="map" useMap="#game-map"/>
                                </div>
                            </Draggable>
                            <Map />
                        </div>
                    </div>

                    <div className="col col-lg-4">
                    {/* player stats div */}
                        <div className="row">
                            <div className="col">
                                <div id="player-stat-box">
                                    <div className="row align-items-center">

                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* consumable items div */}
                    <div className="row">
                            <div className="col">
                                <div id="player-consumable-box">
                                    {/* logic to display current consumable items */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;