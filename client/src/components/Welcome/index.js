import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";

class Welcome extends Component {

    render() {
        return (
            <div class="container jumbotron">
                <h1>Welcome To Reign of React</h1>
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" /> <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />

                <p>Thank you for joining us on this adventure, to begin playing, please select from available classes below.</p>
                <p>Once you have selected a class, you will be awarded with four random cards and the game will begin, best of luck!</p>
                <div class="row">
                    <div class="col-md-4 class-available">
                        <p>Currently Available Classes:</p>
                        <p>DUMMY FOR DRUID</p>
                    </div>
                    <div class="col-md-8 class-description">
                        <p>DUMMY FOR THE INFORMATION THAT WILL COME WITH THE SELECTION OF A CLASS</p>
                    </div>
                    <div class="col-md-12 random-card">
                        <p>THIS IS WHERE RANDOM CARDS WILL BE ASSIGNED BASED ON THE PLAYER SELECTION</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;