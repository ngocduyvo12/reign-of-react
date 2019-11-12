import React, { Component } from "react";
import "./style.css";


function MapInfoCombat(props) {
    
    return (

        <div>
            <div className="map-stats">
                <p>Tier: {props.mapLevel}</p>
                <p>Name: {props.mapName}</p>
                <p>Experience: {props.mapExp}</p>
            </div>
        </div>

    )
}

export default MapInfoCombat;
