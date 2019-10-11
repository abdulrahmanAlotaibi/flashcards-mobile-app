import React, { Component } from "react";
import { Text, TextInput, View, Button, AsyncStorage } from "react-native";

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(text) {
    this.setState({ term: text });
    // console.log(text);
  }
  async handleSubmit() {
    try {
      await AsyncStorage.setItem("dddd", this.state.term).then(res => {
        console.log(res);
      });
      await AsyncStorage.getItem("dddd").then(res=>{
          console.log(res);
          
      })
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <View>
        <Text>What is the title?</Text>
        <TextInput
          placeholder="Type your Title"
          onChangeText={text => this.handleChange(text)}
          value={this.state.term}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default AddDeck;
