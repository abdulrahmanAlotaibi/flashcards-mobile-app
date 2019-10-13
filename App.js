import React from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList
} from "react-native";
import styled from "styled-components/native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { purple, white } from "./utils/colors";
import Deck from "./components/Deck";
import Card from "./components/Card";
import AddDeck from "./components/AddDeck";

const DecksList = styled.FlatList`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: 1px solid green;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {}
    };
    this.getDate = this.getDate.bind(this);
  }
  componentDidMount() {
    this.getDate();
  }
  getDate = () => {
    try {
      const decks = AsyncStorage.getItem("decks").then(res => {
        this.setState({ decks: JSON.parse(res) });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (!this.state.decks)
      return (
        <View>
          <Text>Not Found</Text>
        </View>
      );
    const renderedItems = Object.keys(this.state.decks).map(
      deckId => this.state.decks[deckId]
    );
    console.log("%%", renderedItems[0]);

    return (
      <View>
        <FlatList
          data={renderedItems}
          renderItem={({ item }) => <Deck title={item.title} />}
        >
          <Text>App</Text>
        </FlatList>
        <Button
          title="Go To Deck"
          onPress={() => this.props.navigation.navigate("Deck")}
        />
      </View>
    );
  }
}
const HomeStack = createStackNavigator({
  Home: { screen: App },
  Deck: { screen: AddDeck },
  Card: { screen: Card }
});
const DeckStack = createStackNavigator({
  Home: { screen: HomeStack },
  Deck: { screen: Deck },
  Card: { screen: Card }
});
const Tabs = createBottomTabNavigator({
  Home: HomeStack,
  Deck: AddDeck
});

export default createAppContainer(Tabs);
