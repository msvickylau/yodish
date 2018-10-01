import React, { Component } from 'react';
import InputForm from './InputForm';
import Yoda from './Yoda'

import {
  CommentDiv,
  CommentBubble,
  XButton,
  InputDiv,
  YodishDiv,
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      savedUserInput: '',
      yodish: '',
      history: [],
      isLoading: false,
      note: ["Stay and help you I will... Mmm...", "(note: yoda takes a while to load.)"]
    }
  }

  onInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    const { userInput } = this.state;

    (!userInput.length) ?
      this.setState({yodish: "Submit a sentence, or I will help you not."})
     :
      this.getYodish(userInput)
      this.setState({
        savedUserInput: userInput,
        userInput: '',
        isLoading: true,
        note: []
      });

  }

  getYodish = (userInput) => {
    const urlencodedInput = encodeURIComponent(userInput.trim());
    const url = 'https://cors-anywhere.herokuapp.com/https://yoda-api.appspot.com/api/v1/yodish?text=' + urlencodedInput

    fetch(url)
    .then(response => response.json())
    .then(result => this.setYodish(result))
    .catch(error => console.error('Error: ', error))
  }

  setYodish = (result) => {
    let oldInput = this.state.savedUserInput
    let oldYodish = result.yodish
    this.setState({
      yodish: result.yodish,
      isLoading: false,
      history: [oldInput, oldYodish, ...this.state.history]
    })
  }

  clearYodish = () => {
    this.setState({yodish: ''})
  }

  clearNote = () => {
    this.setState({note: []})
  }

  render() {
    const {isLoading, userInput, yodish, note, history } = this.state

    return (
      <div className="App">

        <CommentDiv>
          { note.length > 0 ? (
            <CommentBubble>
              <h4>{note[0]}</h4>
              <h5>{note[1]}</h5>
              <XButton onClick={this.clearNote}>&#10006;</XButton>
            </CommentBubble>
          ) : (
            ( yodish.length > 0
              ? <CommentBubble>
                <h4>{yodish}</h4>
                <XButton onClick={this.clearYodish}>&#10006;</XButton>
              </CommentBubble>
              : <div>{/* empty if there is no yodish */}</div>
            )
          )}
        </CommentDiv>

        <Yoda
          yodish={yodish}
          isLoading={isLoading}
        />

        <h4>Yodish translator:</h4>
        <InputForm
          value={userInput}
          onChange={this.onInputChange}
          onSubmit={this.onInputSubmit}
        >
          GO
        </InputForm>

        { history.length > 0 ? (
          <div>
            <h4>History:</h4>
            { history.map((string, index) => { return index % 2 === 0 ? <InputDiv key={index}>{string}</InputDiv> : <YodishDiv key={index}>{string}</YodishDiv>})}
          </div>
        ):(
          <div>{/* empty if there is no history */}</div>
        )}

      </div>
    );
  }
}

export default App;
