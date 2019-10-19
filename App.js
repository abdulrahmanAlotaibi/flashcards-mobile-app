import React, { createContext } from "react";
import {
  Text,
  View,
  Button,
  AsyncStorage,
  FlatList,
  Animated,
  Platform
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
import { getDecks, getDeck } from "./utils/api";
import { Main } from "./components/styles/AppStyles";
import {
  setLocalNotification,
  clearLocalNotification
} from "./utils/notification";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
      selectedDeck: NaN
    };
    _isMounted = false;
    this.getAllDecks = this.getAllDecks.bind(this);
    this.setSelectedDeck = this.setSelectedDeck.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Decks"
    };
  };
  componentDidMount() {
    this._isMounted = true;
    setLocalNotification();
    this.getAllDecks();
  }
  
  componentDidUpdate() {
    if(this._isMounted){
      this.getAllDecks();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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
      this.props.navigation.navigate("DeckScreen", {
        selectedDeck: getDeck()
      });
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
  ["Add Deck"]: { screen: AddDeck },
  DeckScreen: { screen: DeckScreen },
  AddCard: { screen: AddCard },
  Quiz: { screen: Quiz },
  AddCard: { screen: AddCard }
});
const Tabs = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    ["Add Deck"]: { screen: AddDeck }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#1d1d1d" : "#fff",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "#fff" : "#1d1d1d",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

export default createAppContainer(Tabs);
