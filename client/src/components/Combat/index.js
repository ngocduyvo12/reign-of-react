import React, { Component } from "react";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import "./style.css"

class Combat extends Component {
    state = {
        items: []
    }

    render() {
        return (
            <>
                <div>
                    <div className="jumbotron">
                    <h1>Glorious Combat</h1>
                        <div className="container">
                            <div className="row">

                                <div className="combat-log col-md-2">
                                    <div>
                                        Combat Stats Insert Here
                                        These are updated Each Round
                                    </div>
                                </div>
                                <div className="enemy-cards col-md-7">
                                    <div>
                                        Enemy Cards Insert Here
                                        Append Each
                                    </div>
                                </div>
                                <div className="player-inventory col-md-3">
                                    <div>
                                        Player Inventory Insert Here
                                        Based on Inventory from Home Page
                                    </div>
                                </div>
                                <div className="player-cards col-md-12">
                                    <div>
                                        Player Cards Insert Here 
                                        Append Each Card with ability to attack
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Combat;