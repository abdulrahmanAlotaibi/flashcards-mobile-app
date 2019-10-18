import React, { Component } from "react";
import { Text, View, Button, Animated,TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { DeckStyles, Title, ButtonStyles } from "./styles/DeckStyles";

class Deck extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.setSelectedDeck(this.props.title);
  }
  render() {
    if (!this.props.deck) {
      return (
        <View>
          <Text>empty</Text>
        </View>
      );
    }
    return (
      <DeckStyles>
        <TouchableOpacity onPress={this.handlePress}>
          <Title>{this.props.title}</Title>
          <Text style={{textAlign:"center"}}>
             { this.props.deck.questions ? this.props.deck.questions.length : 0} cards
          </Text>
        </TouchableOpacity>
      </DeckStyles>
    );
  }
}

export default Deck;
