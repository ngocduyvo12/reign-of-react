import React, { Component } from "react";
// import Modal from "react-modal";
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import Druid from "../Druid"
import Warrior from "../Warrior"

class Welcome extends Component {

    state = {
        class: ""
    }

    classInfo = () => {
        if (this.state.class === "") {
            return <h3>Select A Class For More Information</h3>
        } else if (this.state.class === "Druid") {
            return <Druid />
        } else if (this.state.class === "Warrior") {
            return <Warrior />
        }
    }

    selectDruid = (event) => {
        event.preventDefault()
        this.setState({ class : "Druid" })
    }

    selectWarrior = (event) => {
        event.preventDefault()
        this.setState({ class : "Warrior" })
    }


    render() {
        return (
            <div className="container jumbotron">
                <h1>Welcome To Reign of React</h1>
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" /> <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />

                <p>Thank you for joining us on this adventure, to begin playing, please select from available classes below.</p>
                <p>Once you have selected a class, you will be awarded with four random cards and the game will begin, best of luck!</p>
                <div className="row">
                    <div className="col-md-4 class-available">
                        <p>Currently Available Classes:</p>
                        <button className="btn-lg btn-dark btn-lg" onClick={this.selectDruid}>Druid</button>
                        <button className="btn-lg btn-dark btn-lg" onClick={this.selectWarrior}>Warrior</button>
                    </div>
                    <div className="col-md-8 class-description">
                        {this.classInfo()}
                    </div>
                    <div className="col-md-12 random-card">
                        <p>THIS IS WHERE RANDOM CARDS WILL BE ASSIGNED BASED ON THE PLAYER SELECTION</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;