import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList
} from "react-native";
import { getDeck } from "../utils/api";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      questionNumber: 0,
      correctTracker: 0,
      isAnswer: false
    };
    this.getDeck = this.getDeck.bind(this);
    this.toDeck = this.toDeck.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.increaseCorrectTracker = this.increaseCorrectTracker.bind(this);
  }
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
  showAnswer() {
    this.setState({ isAnswer: true });
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
  render() {
    if (!this.state.deck) {
      return (
        <View>
          <Text>Empty</Text>
        </View>
      );
    }

    const { title, questions } = this.state.deck;
    const currentQuestion = questions[this.state.questionNumber];
    if (!questions.length) {
      return (
        <View>
          <Text>Sorry, There is no questions</Text>
        </View>
      );
    }
    if (this.state.questionNumber === questions.length) {
      return (
        <View>
          <Text>correct answers:</Text>
          <Text>
            {(100 * this.state.correctTracker) / questions.length + "%"}
          </Text>
          <Button title="Restart Quiz" onPress={this.restartQuiz} />
          <Button title="Back to Deck" onPress={this.toDeck} />
        </View>
      );
    }

    if (this.state.isAnswer) {
      return (
        <View>
          <Text>{currentQuestion.answer}</Text>
          
        </View>
      );
    }

    return (
      <View>
        <Text>{this.state.questionNumber + 1 + "/" + questions.length} </Text>
        <Text>{currentQuestion.question} ?</Text>
        <Button title="Show Answer" onPress={this.showAnswer} />
        <Button title="Correct" onPress={this.increaseCorrectTracker} />
        <Button title="Incorrect" onPress={this.handlePress} />
      </View>
    );
  }
}

export default Quiz;
