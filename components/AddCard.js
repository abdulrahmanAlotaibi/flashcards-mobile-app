import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Button,
  AsyncStorage,
  FlatList,
  TextInput
} from "react-native";
import styled from "styled-components";
import Deck from "./Deck";
import { addCardToDeck } from "../utils/api";
const Form = styled.View`
  margin-top: 50px;
`;
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionChange(text) {
    this.setState({ question: text });
  }
  handleAnswerChange(text) {
    this.setState({ answer: text });
  }
  handleSubmit() {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    addCardToDeck(card);

    this.props.navigation.navigate("DeckScreen");
  }

  render() {
    return (
      <Form>
        <TextInput
          placeholder="Type your Question"
          onChangeText={text => this.handleQuestionChange(text)}
          value={this.state.question}
          name="question"
        />
        <TextInput
          placeholder="Type your Ansewr"
          onChangeText={text => this.handleAnswerChange(text)}
          value={this.state.answer}
          name="answer"
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </Form>
    );
  }
}

export default AddCard;
