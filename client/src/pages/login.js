import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/login.css";

class Login extends Component {
      
    render() {
        return (
            <>
                <div className="jumbotron">
                    <h1>Welcome to Reign of React!</h1>
                    <h3>Sign in or register a new account with us</h3>
                    <form id="sign-in">
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">Please Enter Your Email</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            <small id="emailHelp" className="form-text text-muted">Please Enter Your Password</small>
                        </div>
                        <Link to="/home"><button type="submit" className="btn btn-lg btn-dark">Submit</button></Link>
                    </form>
                    <form id="register">
                        <h3>Register New Account</h3>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">Please Enter A Email</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            <small id="emailHelp" className="form-text text-muted">Please Enter A Password</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            <small id="emailHelp" className="form-text text-muted">Please Re-enter Your Password</small>
                        </div>
                        <Link to="/home"><button type="submit" className="btn btn-lg btn-dark">Submit</button></Link>
                    </form>
                    <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                    <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                    <img className="front-card" src="https://www.maxplayingcards.com/en/wp-content/uploads/2013/10/KoNW_backLIMITED.png" />
                </div>
            </>
        )

    }
}

export default Login;