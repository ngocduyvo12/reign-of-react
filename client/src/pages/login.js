import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // 
import Map from "../components/map"
import "../styles/map.css";
import "../styles/player-stat.css";

class Login extends Component {

    state = {

    }

    render() {
        return (
            <div className="jumbotron">
                <form>
                    <button type="submit" className="btn btn-primary">Create New Account</button>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">Please Enter Your Email</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )

    }
}

export default Login;