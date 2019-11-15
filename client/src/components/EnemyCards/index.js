import React from "react";
import "./style.css";

function EnemyCards(props) {

        return (

            <div>
                <div className="img-container">
                    <img alt={props.monster ? props.monster.name : ""} src={`${process.env.PUBLIC_URL}/img/cards/${props.monster ? props.monster.image : ""}`} />
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
