import React, { Component } from "react";
import "./style.css";

function PlayerCards(props) {
    console.log(props)
    return (
        <div>
            <h2>This is a test as well</h2>
            {/* <h2>Cards: {props.name}</h2> */}
        </div>
    )
}

{/* <p>Name: {props.name}</p>
<p>Health: {props.hitpoints}</p>
<p>Attack: {props.attack}</p>
<p>Defense: {props.defense}</p> */}

export default PlayerCards;
