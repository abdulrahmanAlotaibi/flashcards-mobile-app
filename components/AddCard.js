import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList,
  TextInput
} from "react-native";
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDeck = this.addDeck.bind(this);
  }

  handleChange(){

  }
  handleSubmit(){
      
  }
  
  render() {
    return (
      <View>
        <TextInput
          placeholder="Type your Title"
          onChangeText={text => this.handleChange(text)}
          value={this.state.term}
        />
        <TextInput
          placeholder="Type your Title"
          onChangeText={text => this.handleChange(text)}
          value={this.state.term}
        />
      </View>
    );
  }
}

export default AddCard;
