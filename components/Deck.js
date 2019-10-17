import React, { Component } from "react";
import { Text, View, Button, Animated } from "react-native";
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
        <View>
          <Title>{this.props.title}</Title>
          <Text>
            {this.props.deck.questions ? this.props.deck.questions.length : 0}
          </Text>
          <ButtonStyles title="Show Deck" onPress={() => this.handlePress()} />
        </View>
      </DeckStyles>
    );
  }
}

export default Deck;
