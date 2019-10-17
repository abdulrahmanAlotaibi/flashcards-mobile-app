import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList,
  Animated
} from "react-native";
import { Logs } from "expo";
import { getDeck } from "../utils/api";
class DeckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      opacity: new Animated.Value(0)
    };
    this.getSelectedDeck = this.getSelectedDeck.bind(this);
    this.removeDeck = this.removeDeck.bind(this);
  }

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 700 }).start();
    this.getSelectedDeck();
  }
  // componentDidUpdate() {
  //   this.getSelectedDeck();
  // }
  // componentDidUpdate() {
  //   this.getSelectedDeck();
  // }

  removeDeck() {
    AsyncStorage.getItem("decks").then(res => {
      const decks = JSON.parse(res);
      decks[this.state.deck.title] = undefined;
      delete decks[this.state.deck.title];
      AsyncStorage.setItem("decks", JSON.stringify(decks));
    });
  }
  async getSelectedDeck() {
    const deck = await getDeck();
    this.setState({ deck: deck });
  }
  render() {
    const {opacity} = this.state;
    if (!this.state.deck) {
      return (
        <Animated.View style={{opacity}}>
          <Text>Empty</Text>
        </Animated.View>
      );
    }
    const { title, questions } = this.state.deck;
    const cardNumbers = questions.length;
    return (
      <Animated.View style={{opacity}}>
        <Text>{title}</Text>
        <Text>{"cards: " + cardNumbers}</Text>
        <Button
          title="Add Card"
          onPress={() => this.props.navigation.navigate("AddCard")}
        />
        <Button
          title="Start Quiz"
          onPress={() => this.props.navigation.navigate("Quiz")}
        />
        <Button title="Delete Deck" onPress={this.removeDeck} />
      </Animated.View>
    );
  }
}

export default DeckScreen;
