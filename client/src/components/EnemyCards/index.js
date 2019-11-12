import React, { Component } from "react";
// import Modal from "react-modal";
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Characters from "../../json/characters.json"
import "./style.css";

function EnemyCards(props) {

        return (
            <div className="card">
                <div className="img-container">
                    <img alt={props.name} src={props.image} />
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
