import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import styled from "styled-components/native";
import Card from "./Card";

const DeckStyles = styled.View`
  background: pink;
  font-size: 22px;
`;
const Title = styled.Text`
  font-size: 22px;
`;
class Deck extends Component {
  static navigationOptions = {
    title: "Screen Two"
  };
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.setSelectedDeck(this.props.title);
  }
  render() {

    return (
      <DeckStyles>
        <View >
          <Title>{this.props.title}</Title>
          <Text>2 cards</Text>
          <Button title="Show Deck" onPress={() => this.handlePress()}/>
        </View>
      </DeckStyles>
    );
  }
}

export default Deck;
