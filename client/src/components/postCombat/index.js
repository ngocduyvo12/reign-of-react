import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import "./style.css"
import { Redirect } from "react-router-dom"

class PostCombat extends Component {
    state = {
        // items: [],
        redirect: false 
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = "/home" />
        }
    }

    render() {

        return(
            <>
                <div>
                    <div className="jumbotron">
                    <h1>End of Combat</h1>
                        <div className="container">
                            <div className="row">

                                <div className="combat-result col-md-7">
                                    <div>
                                        insert whether player won or lost the round
                                        repercussions of the results
                                    </div>
                                </div>

                                <div className="card-status col-md-5">
                                    <div>
                                        Append image of card that is being gained
                                        Append image of card that is lost
                                    </div>
                                </div>

                                <div className="card-inventory col-md-12">
                                    <div>
                                        Player stats and card inventory will go here
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg btn-dark result-submit"
                                    onClick={this.setRedirect}
                                >Return to Map</button>
                                
                            </div>
                        </div>                    
                    </div>
                </div>
            </>
        )
        
    }

}

export default PostCombat;