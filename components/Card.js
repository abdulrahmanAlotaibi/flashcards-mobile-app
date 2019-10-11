import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class Card extends Component {
  render() {
    return (
      <View>
        <Text>Card</Text>
        <Button title="Go to Duck" onPress={() => this.props.navigation.navigate('Deck')} />
      </View>
    );
  }
}

export default Card;
