import React, { Component } from "react";
import "./style.css";

function PlayerCards(props) {
    console.log(props)
    return (
        <div>
            <h2>Name: {props.userName}</h2>
            <h2>Attack: {props.attack}</h2>
            <h2>Exp: {props.exp}</h2>
        </div>
    )
}


export default PlayerCards;
