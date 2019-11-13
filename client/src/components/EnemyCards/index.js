import React, { Component } from "react";
import "./style.css";

function EnemyCards(props) {

        return (

            <div>
                <div className="img-container">
                    <img alt={props.name} src={`${process.env.PUBLIC_URL}/img/cards/${props.image}`} />
                </div>
                <div className="enemy-stats">
                    <p>Name: {props.name}</p>
                    <p>Health: {props.hitpoints}</p>
                    <p>Attack: {props.attack}</p>
                    <p>Defense: {props.defense}</p>
                </div>
            </div>

        )
}


export default EnemyCards;
