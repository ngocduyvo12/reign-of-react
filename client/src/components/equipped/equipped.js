import React, { Component } from "react";
import ReactDOM from "react-dom"
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./style.css";


class Equipped extends Component {

    state = {
        cards: [],
    }

    componentDidMount() {
        // console.log(this.props.match.params.id)
        this.loadCards()
    }

    loadCards = () => {
        API.getAllCards(this.props.match.params.id)
            .then(res => {
                this.setState({ cards: res.data.equippedCards })
                console.log(this.state.cards);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {this.state.cards.length ? (
                    <>
                        {this.state.cards.map(cards => (
                            // <div className="col col-md-3" key={cards._id}>
                            <div className="style-equipped" key={cards._id}>
                                <Link 
                                to={"/inventory/" + this.props.match.params.id}>
                                    <img
                                        className="equippedImages"
                                        src={cards.image}
                                        alt={cards.name}
                                    />
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