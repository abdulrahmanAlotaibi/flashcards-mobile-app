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
  render() {
    console.log("**", this.props);

    return (
      <DeckStyles>
        <Title>{this.props.title}</Title>
        <Text>2 cards</Text>
      </DeckStyles>
    );
  }
}

export default Deck;
