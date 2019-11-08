import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";

class Help extends Component {
    state = {
        help: false
    }

    determineHelp = () => {
        if (this.state.help) {
            
        }
    }
    
    render() {
        return (
            <>
                <button onClick={this.determineHelp()}>Click For Help</button>
            </>
        )
    }
}

export default Help;