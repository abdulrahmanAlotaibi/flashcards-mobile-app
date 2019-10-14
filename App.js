import React, { createContext } from "react";
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
import DeckScreen from "./components/DeckScreen";
const DecksList = styled.FlatList`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border: 1px solid green;
`;

export const MyContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      selectedDeck: NaN
    };
    this.getDate = this.getDate.bind(this);
    this.setData = this.setData.bind(this);
    this.setSelectedDeck = this.setSelectedDeck.bind(this);
  }
  componentDidMount() {
    this.getDate();
  }
  setData() {}
  async setSelectedDeck(id) {
    try {
      await AsyncStorage.setItem("selectedDeck", JSON.stringify(id));
      const data = await AsyncStorage.getItem("selectedDeck");

      const selectedDeck = await JSON.parse(data);
      this.props.navigation.navigate("DeckScreen");
    } catch (e) {
      console.log(e);
    }
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

    return (
      <MyContext.Provider
        value={{
          setData: this.setData,
          getSelectedDeck: this.state.selectedDeck
        }}
      >
        <View>
          <FlatList
            data={renderedItems}
            renderItem={({ item }) => (
              <Deck
                title={item.title}
                key={item.title}
                setSelectedDeck={this.setSelectedDeck}
              />
            )}
          >
            <Text>App</Text>
          </FlatList>
          <Button
            title="Go To Deck"
            onPress={() => this.props.navigation.navigate("Deck")}
          />
        </View>
      </MyContext.Provider>
    );
  }
}
const HomeStack = createStackNavigator({
  Home: { screen: App },
  Deck: { screen: AddDeck },
  DeckScreen: { screen: DeckScreen }
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
