import React, { Component } from "react";
import ReactDOM from "react-dom"
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import API from "../utils/API";
import { Link } from "react-router-dom";


class Equipped extends Component {

    state = {
        card: [],
        test: [],
    }

    componentDidMount() {
        // console.log(this.props.match.params.id)
        this.loadCards()
    }

    loadCards = () => {
        API.getEquippedCards(this.props.match.params.id)
            .then(res => {

                this.setState({ card: res.data })
                this.setState({ test: res.data.equippedCards })
                console.log(this.state.test);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {this.state.test.length ? (
                    <>
                        {this.state.test.map(cards => (
                            <div className="col col-md-3">
                                <Link to={"/inventory/" + this.props.match.params.id}>
                                    <img
                                    className="equippedImages"
                                        key={cards._id}
                                        src={cards.image}
                                        alt={cards.name} />
                                </Link>
                            </div>
                        ))}
                    </>
                ) : (
                        <h3>No Card Equipped</h3>
                    )}
            </>
        )
    }
}

export default Equipped;