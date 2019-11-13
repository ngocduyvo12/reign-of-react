import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../styles/map.css";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import ImageMapper from "react-image-mapper";
import mapJSON from "../json/map.json";
import Help from "../components/Help";
import Modal from "react-modal";
import characters from "../json/characters.json"

var MAP = {
    name: "my-map",
    areas: mapJSON,
    currentArea: []
}

class Map extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(area) {
        this.setState({ modalIsOpen: true, currentArea: area });
    }

    afterOpenModal() {
        this.subtitle.style.color = "black";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    //function for moving map:
    moveMap(event) {
        console.log(`Pressed ${event.keyCode}`)
        switch (event.keyCode) {
            //UP
            case 38:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) + 20 + "px"
                break;
            //DOWN
            case 40:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) - 20 + "px"
                break;
            //LEFT
            case 37:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) + 20 + "px"
                break;
            //RIGHT
            case 39:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) - 20 + "px"
        }
    }


    getMapInfoHandler = (area) => {
        console.log(area);
        this.openModal(area);
    }
    

    renderMonsters = (monsters) => {
        console.log(monsters)
        var monsterInfo = monsters.map(monster => (characters.filter(character => character.id == monster))[0]);
        // return monsterInfo;
        return <div>
            {monsterInfo.map(item => (
                <div>
                        <img key= {item.id} src={`${process.env.PUBLIC_URL}/img/cards/${item.image}`} alt=""></img>
                        <p>{item.name}</p>
                </div>
                    ))}
        </div>
        
    }

    render() {
        return (
            <>
                {/* //move map with arrow keys */}
                <div onKeyDown={this.moveMap}
                    tabIndex="0"
                >
                    <Draggable >
                        <div id="text-box" style={{ top: "0px", left: "0px" }}>
                            <ImageMapper
                                src="../img/map/map.png"
                                map={MAP}
                                width={1844}
                                onClick={area => this.getMapInfoHandler(area)}
                            ></ImageMapper>
                        </div>
                    </Draggable>
                
                {this.state.currentArea ?
                (

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal"
                    >


                    <h1 ref={subtitle => this.subtitle = subtitle}>{this.state.currentArea.name}</h1>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Tier: {this.state.currentArea.tier}</h2>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Resides in this area: </h2>
                    {this.renderMonsters(this.state.currentArea.monsters)}
                    <h2 ref={subtitle => this.subtitle = subtitle}>Possible Rewards:</h2> 
                    {this.renderMonsters(this.state.currentArea.monsters)} 
                    <h2>joins your team</h2>
                    <h2>You Gain: {this.state.currentArea.experience}XP!</h2>
                    <button id="attack-region" className="btn btn-dark btn-lg" onClick={this.closeModal}>Attack Region</button>
                    <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Close</button>
                   
                </Modal>

                ) : ( 

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal"
                    >


                    <h2 ref={subtitle => this.subtitle = subtitle}>None</h2>
                    <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Close</button>
                
                </Modal>
                )
                }
                </div>

                
            </>
        )
    }
    
}

export default Map;
