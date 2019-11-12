import axios from "axios";

export default {
  // Gets all users. 
  //Not currently using
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUserId: function(id) {
    return axios.get("/api/user/" + id);
  },
  getUser: function(userData){
      return axios.post("/api/user/login", userData)
  },
  // Deletes the user with the given id. 
  //Not currently using
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  //get equippedCards from user id in url
  getEquippedCards: function(id){
    return axios.get("/api/user/getEquippedCards/" + id);
  }
};


