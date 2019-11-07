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
            <div id="map-box">
                <Draggable {...dragHandlers}>
                    <img src="./img/map/map.png" id="map" alt="map" useMap="#game-map" />
                </Draggable>
                <Map />
            </div>
        )
    }
}

export default Home;