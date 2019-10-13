import React, { Component } from "react";
import { Text, TextInput, View, Button, AsyncStorage } from "react-native";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDeck = this.addDeck.bind(this);
  }
  async addDeck() {
    const parker = {
      age: 22,
      name: "Right!"
    };
    const decks = AsyncStorage.getItem("decks").then(decks => {
      console.log("&&&", JSON.parse(decks));
      parsedDecks = JSON.parse(decks);
      AsyncStorage.setItem(
        "decks",
        JSON.stringify({
          ...parsedDecks,
          [this.state.term]: {
            title: this.state.term,
            questions: []
          }
        })
      );
    });
  }
  handleChange(text) {
    this.setState({ term: text });
  }
  async handleSubmit() {
    this.addDeck();

    try {
      // await AsyncStorage.setItem("dddd", this.state.term).then(res => {
      //   console.log(res);
      // });
      // await AsyncStorage.getItem("dddd").then(res => {
      //   console.log(res);
      // });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <View>
        <Text>What is the title?</Text>
        <TextInput
          placeholder="Type your Title"
          onChangeText={text => this.handleChange(text)}
          value={this.state.term}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default AddDeck;
