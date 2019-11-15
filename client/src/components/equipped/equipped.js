import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./style.css";


class Equipped extends Component {

    state = {
        cards: [],
    }

    componentDidMount() {
        this.loadCards()
    }

    loadCards = () => {
        API.getAllCards(this.props.match.params.id)
            .then(res => {
                this.setState({ cards: res.data.equippedCards })
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
                                to={"../inventory/" + this.props.match.params.id}>
                                    <img
                                        className="equippedImages"
                                        src={process.env.PUBLIC_URL + cards.image}
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