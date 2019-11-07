import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Map from "../components/map"
import "../styles/map.css";

class Home extends Component {
    state = {
        items: []
    }

    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        return (
            <div className="container-fluid">

            <div id="map-box">
                <Draggable {...dragHandlers}>
                    <div id="text-box" >
                    <img src="./img/map/map.png" id="map" alt="map" useMap="#game-map" />
                    
                    </div>
                </Draggable>
                <Map />
            </div>
            </div>
        )
    }
}

export default Home;