import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Help extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = "black";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <button className="btn btn-dark btn-lg" onClick={this.openModal}>Help</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h3 ref={subtitle => this.subtitle = subtitle}>REIGN OF REACT</h3>
                    <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Close</button>
                        <p>Welcome to the Reign of React Help Page</p>
                    <div className="all-info">
                        <p>Now that you have chosen a class and set up a character, you can now enjoy all the features of Reign of React. You are currently at the home page, from here you have perform a variety of operations. These include the ability to check your current character statistics, view your currently equipped cards or inventory, to explore the map of Reign of React, and also to engage in combat.</p>
                        <p>You can access your currently equipped cards and see your entire inventory by clicking any of the cards at the bottom of the home page. At that page, you can change out your party before you continue on your adventures. In Reign of React, you can currently have up to four (4) active party members, while any additional party members will be stored in the inventory. To add a party member from your inventory, you must first select a card from your current party to be stored in the inventory, you can then select any card from your inventory to bring it to your current party. Remember to check your inventory after successful combat, as new cards will be stored here waiting for you.</p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Help;
