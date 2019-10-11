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
      decks: { name: "d", age: 22 }
    };
  }
  _storeDate = async () => {
    try {
      await AsyncStorage.setItem("decks", JSON.stringify(this.state.decks));
      await console.log(
        AsyncStorage.getItem("decks").then(res => {
          console.log(">>", res);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this._storeDate();
  }
  render() {
    return (
      <View>
        <FlatList
          data={[
            { key: "Devin" },
            { key: "Dan" },
            { key: "Dominic" },
            { key: "Jackson" },
            { key: "James" },
            { key: "Joel" },
            { key: "John" },
            { key: "Jillian" },
            { key: "Jimmy" },
            { key: "Julie" },
            { key: "zDevin" },
            { key: "zDan" },
            { key: "zDominic" },
            { key: "zJackson" },
            { key: "zJames" },
            { key: "zJoel" },
            { key: "zJohn" },
            { key: "zJillian" },
            { key: "zJimmy" },
            { key: "zJulie" }
          ]}
          renderItem={({ item }) => <Deck title={item.key} />}
        >
          <Text>App</Text>
          <Deck />
          <Deck />
          <Deck />
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
