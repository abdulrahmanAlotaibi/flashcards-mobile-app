import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList
} from "react-native";
import { Logs } from "expo";

class DeckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null
    };
    this.getDeck = this.getDeck.bind(this);
  }
  componentDidMount() {
    this.getDeck();
  }
  async getDeck() {
    const data = await AsyncStorage.getItem("decks");
    const decks = await JSON.parse(data);
    console.log("!!", decks);

    const title = await AsyncStorage.getItem("selectedDeck");
    const selectedDeck = await JSON.parse(title);
    console.log("selecredDeck:" + selectedDeck);

    const deck = await decks[selectedDeck];
    console.log("vv>", deck);

    this.setState({ deck: deck });
  }
  render() {
    console.log("=", this.state);
    if(!this.state.deck){
        return <View><Text>Empty</Text></View>
    }
    const { title,questions } = this.state.deck;
    const cardNumbers = questions.length;
    return (
      <View>
        <Text>{title}</Text>
        <Text>{cardNumbers}</Text>

      </View>
    );
  }
}

export default DeckScreen;
