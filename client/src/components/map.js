import React, {Component} from "react";
import "../styles/map.css";


function hellerbenia () {
    alert(`Clicked on hellerbenia`)
}

function Map() {
    return (
        <map name="game-map">
            <area shape="poly" coords="277,395,237,434,211,559,278,624,315,556,444,480, 413, 405" onClick={hellerbenia} />
        </map>
    )
}

export default Map;