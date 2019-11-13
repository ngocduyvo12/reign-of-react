import React, { Component } from "react";
import "./style.css";

function PlayerCards(props) {
    // console.log(props)
    return (
        <div>
            <h2>Name: {props.userName}</h2>
            <h2>Level: {props.lvl}</h2>
            <h2>Attack: {props.attack}</h2>
            <h2>Defense: {props.defense}</h2>
            <h2>Health: {props.health}</h2>
        </div>
    )
}


export default PlayerCards;
