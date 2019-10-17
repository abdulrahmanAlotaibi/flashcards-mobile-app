import React, { Component } from "react";
import { Text, TextInput, View, Button, AsyncStorage } from "react-native";
import { saveDeckTitle } from "../utils/api";
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
  async addDeck(title) {
    saveDeckTitle(title);
  }
  handleChange(text) {
    this.setState({ term: text });
  }
  async handleSubmit() {
    const title = this.state.term;
    try {
      this.addDeck(title);
      await AsyncStorage.setItem("selectedDeck", JSON.stringify(title));
      this.props.navigation.navigate("DeckScreen");
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
