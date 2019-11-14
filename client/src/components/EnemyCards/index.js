import React, { Component } from "react";
import "./style.css";

function EnemyCards(props) {

        return (
            <>
                <div className="enemy-img-container">
                    <img alt={props.name} src={`${process.env.PUBLIC_URL}/img/cards/${props.image}`} />
                </div>
                <div className="enemy-stats">
                    <p>Name: {props.name}</p>
                    <p>Health: {props.hitpoints}</p>
                    <p>Attack: {props.attack}</p>
                    <p>Defense: {props.defense}</p>
                </div>
            </>
        )
}


export default EnemyCards;
