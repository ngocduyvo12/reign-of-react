import React, { Component } from "react";
import ReactDOM from "react-dom"
import "../styles/map.css";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import ImageMapper from "react-image-mapper"
import mapJSON from "../map.json"
import Help from "../components/Help"


var MAP = {
    name: "my-map",
    areas: mapJSON
}

class Map extends Component {

    //function for moving map:
    moveMap(event) {
        console.log(`Pressed ${event.keyCode}`)
        switch (event.keyCode) {
            //UP
            case 38:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) + 20 + "px"
                break;
            //DOWN
            case 40:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) - 20 + "px"
                break;
            //LEFT
            case 37:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) + 20 + "px"
                break;
            //RIGHT
            case 39:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) - 20 + "px"
        }
    }


    getMapInfoHandler = (area) => alert(`Clicked on ${area.name}`);

    render() {
        return (
            <>
                {/* //move map with arrow keys */}
                <div onKeyDown={this.moveMap}
                    tabIndex="0"
                >
                    <Draggable >
                        <div id="text-box" style={{ top: "0px", left: "0px" }}>
                            <ImageMapper
                                src="../img/map/map.png"
                                map={MAP}
                                width={1844}
                                onClick={area => this.getMapInfoHandler(area)}
                            ></ImageMapper>
                        </div>
                    </Draggable>
                </div>
                
            </>
        )
    }
}

export default Map;
