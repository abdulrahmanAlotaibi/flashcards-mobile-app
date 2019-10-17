import React, { createContext } from "react";
import {
  Text,
  View,
  Button,
  AsyncStorage,
  FlatList,
  Animated
} from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Deck from "./components/Deck";
import Card from "./components/Card";
import AddDeck from "./components/AddDeck";
import DeckScreen from "./components/DeckScreen";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { getDecks } from "./utils/api";
import { Main } from "./components/styles/AppStyles";
import { scheduleNotification } from "./utils/notification";

// Configs
const NOTIFICATION_KEY = "flashcards:notifications";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      selectedDeck: NaN,
    };
    this.getAllDecks = this.getAllDecks.bind(this);
    this.setSelectedDeck = this.setSelectedDeck.bind(this);
  }

  componentDidMount() {
    scheduleNotification();
    this.getAllDecks();
  }
  componentDidUpdate() {
    this.getAllDecks();
  }

  async getAllDecks() {
    try {
      const decks = await getDecks();
      this.setState({ decks: decks });
    } catch (err) {
      console.log(err);
    }
  }
  async setSelectedDeck(title) {
    try {
      await AsyncStorage.setItem("selectedDeck", JSON.stringify(title));
      this.props.navigation.navigate("DeckScreen");
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.decks)
      return (
        <View>
          <Text>Empty</Text>
        </View>
      );
    const renderedItems = Object.keys(this.state.decks).map(
      deckId => this.state.decks[deckId]
    );

    return (
      <Main>
        <FlatList
          data={renderedItems}
          renderItem={({ item }) => (
            <Deck
              deck={item}
              title={item.title}
              key={item.title}
              setSelectedDeck={this.setSelectedDeck}
            />
          )}
          keyExtractor={item => item.title}
        ></FlatList>
      </Main>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: App },
  Deck: { screen: AddDeck },
  DeckScreen: { screen: DeckScreen },
  Quiz: { screen: Quiz },
  AddCard: { screen: AddCard }
});
const DeckStack = createStackNavigator({
  Home: { screen: HomeStack },
  Deck: { screen: Deck },
  AddCard: { screen: AddCard },
  Quiz: { screen: Quiz },
  Card: { screen: Card }
});
const Tabs = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Deck: { screen: DeckStack }
});

export default createAppContainer(Tabs);
