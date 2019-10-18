import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList
} from "react-native";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/notification";
import { getDeck } from "../utils/api";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      questionNumber: 0,
      correctTracker: 0,
      isAnswer: false,
      isComplete: false
    };
    this.getDeck = this.getDeck.bind(this);
    this.toDeck = this.toDeck.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.increaseCorrectTracker = this.increaseCorrectTracker.bind(this);
    this.setComplete = this.setComplete.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };
  async getDeck() {
    const deck = await getDeck();
    this.setState({ deck: deck });
  }

  componentDidMount() {
    this.getDeck();
  }
  handlePress() {
    this.setState(currState => ({
      questionNumber: currState.questionNumber + 1
    }));
  }
  increaseCorrectTracker() {
    this.setState(currState => ({
      correctTracker: currState.correctTracker + 1,
      questionNumber: currState.questionNumber + 1
    }));
  }
  async showAnswer() {
    this.setState(currState => {
      return {
        isAnswer: true
      };
    });
  }
  restartQuiz() {
    this.setState({
      questionNumber: 0,
      correctTracker: 0,
      isAnswer: false
    });
  }

  toDeck() {
    this.props.navigation.navigate("DeckScreen");
  }

  async setComplete(currentNumber, total) {
    if (currentNumber === total)
      clearLocalNotification().then(setLocalNotification);
  }
  render() {
    if (!this.state.deck) {
      return (
        <View>
          <Text>Empty</Text>
        </View>
      );
    }

    const { questions } = this.state.deck;
    const currentQuestion = questions[this.state.questionNumber];
    if (!questions.length) {
      return (
        <View>
          <Text>Sorry, There is no questions</Text>
        </View>
      );
    }

    if (this.state.questionNumber === questions.length) {
      this.setComplete(this.state.questionNumber, questions.length);
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Correct Answers: {this.state.correctTracker}
          </Text>
          <Button title="Restart Quiz" onPress={this.restartQuiz} />
          <Button title="Back to Deck" onPress={this.toDeck} />
        </View>
      );
    }

    if (this.state.isAnswer) {
      return (
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {this.state.questionNumber + 1 + "/" + questions.length}{" "}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {currentQuestion.answer}
          </Text>
          <Button title="Correct" onPress={this.increaseCorrectTracker} />
          <Button title="Incorrect" onPress={this.handlePress} />
        </View>
      );
    }

    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {this.state.questionNumber + 1 + "/" + questions.length}{" "}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {currentQuestion.question} ?
        </Text>
        <Button title="Show Answer" onPress={this.showAnswer} />
        <Button title="Correct" onPress={this.increaseCorrectTracker} />
        <Button title="Incorrect" onPress={this.handlePress} />
      </View>
    );
  }
}

export default Quiz;
