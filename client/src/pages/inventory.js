import React, { Component } from "react";
import API from "../utils/API";
import "../styles/inventory.css"

class Inventory extends Component {

  state = {
    inventoryCard: [],
    equippedCards: [],
    activeCard: {}
  }

  //on page load call functions for displaying inventory and equipped cards
  componentDidMount() {
    this.loadCards();
  }

  

  //function to get equipped cards:
  loadCards = () => {
    API.getAllCards(this.props.match.params.id)
      .then(res => {
        this.setState({ equippedCards: res.data.equippedCards })
        this.setState({ inventoryCard: res.data.inventoryCards})
      })
      .catch(err => console.log(err))
  }

  //onclick of inventory image trigger this function:
  //check if the equippedCards array is > 3:
  //if yes alert and use return to exit the function.
  //if not continue on:
  //get the id from the image card
  //get info of this card by looping through the inventoryCard:
  //save the info of the card 
  //set the info into activeCard state
  //exist the loop
  //call API route to update equippedCards if slot is available
  equip = (event) => {

    if (this.state.equippedCards.length > 3) {
      alert("No more cards can be equipped");
      return 
    }

    const id = event.target.id
    for (let i = 0; i < this.state.inventoryCard.length; i++){
      if(id === this.state.inventoryCard[i]._id){
        const newActiveState = {...this.state.inventoryCard[i]}
        newActiveState.userID = this.props.match.params.id
        this.setState({activeCard: newActiveState}, this.equipCard)
      }
    }
  }
  
  equipCard = () => {
    API.updateEquippedCard(this.state.activeCard)
    .then(res => {
      this.componentDidMount();
    })
    .catch(err => console.log(err))
  }

  //onclick event to unequip a currently equipped card:
  //get the id from image card.
  //get info of the card by looping through the equippedCards array
  //save info of card into activeCard state
  //exist loop
  //call API route to remove this card id from equippedCard array in database and add it to the inventoryCard array in database
  unEquip = (event) => {
    const id = event.target.id
    for(let i = 0; i < this.state.equippedCards.length; i++){
      if(id === this.state.equippedCards[i]._id){
        const newActiveState = {...this.state.equippedCards[i]}
        newActiveState.userID = this.props.match.params.id
        this.setState({activeCard: newActiveState}, this.cardUnEquip)
      }
    }
  }
  
  cardUnEquip = () => {
    API.unEquipCard(this.state.activeCard)
    .then(res => {
      this.componentDidMount();
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Link to={"/home/" + this.props.match.params.id} id="return-home"><button className="btn-lg btn-dark" id="other-home">Return Home</button></Link>
          <div className="col-md-6 inventory-inventory">
          <h2>Current Inventory</h2>
            {/* inventory go here */}
            <div className="row" id="style-invetory">
              {this.state.inventoryCard.length ? (
                <>
                  {this.state.inventoryCard.map(cards => (
                    <div key={cards._id}>
                      <img
                        id={cards._id}
                        className="inventoryCardImage"
                        src={process.env.PUBLIC_URL+"/img/cards/" + cards.image}
                        alt={cards.name}
                        onClick={this.equip}
                      />
                    </div>
                  ))}
                </>
              )
                : (<h3>No Cards in Inventory</h3>)}
            </div>
          </div>

          <div className="col-md-5 inventory-equipped">
          <h2>Currently Equipped</h2>
            <div className="row" id="style-equipped">
              {/* equipped cards go here */}
              {this.state.equippedCards.length ? (
                <>
                  {this.state.equippedCards.map(cards => (
                    // <div className="col col-md-3" key={cards._id}>
                    <div key={cards._id}>
                      <img
                        id={cards._id}
                        className="equippedImages"
                        src={process.env.PUBLIC_URL+"/img/cards/" + cards.image}
                        alt={cards.name}
                        onClick={this.unEquip}
                      />
                    </div>
                  ))}
                </>
              ) : (
                  <h3>No Card Equipped</h3>
                )}
            </div>
          </div>
        </div>
      </div >
    )

  }
}

export default Inventory;