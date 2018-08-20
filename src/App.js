import React, { Component } from 'react';
import InputForm from './InputForm';
import yodaReady from './yoda/yodaReady.svg'
import yodaAnswer from './yoda/yodaAnswer.svg'
import yodaBlink from './yoda/yodaBlink.svg'
import {
  CommentDiv,
  CommentBubble,
  XButton
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      yodish: '',
      currentYoda: 0,
      history: []
    }
  }

  onInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    const { userInput } = this.state;
    if (!userInput.length) {
      // alert("please submit a sentence")
      this.setState({yodish: "A sentence, to submit?"});
    } else {
      const urlencodedInput = encodeURIComponent(userInput.trim());
      this.getYodish(urlencodedInput);
      this.setState({userInput: ''});
    }
  }

  getYodish = (urlencodedString) => {
    const url = 'http://yoda-api.appspot.com/api/v1/yodish?text=' + urlencodedString

    fetch(url, {mode: 'cors'})
    .then(response => response.json())
    .then(result => this.setYodish(result))
    .catch(error => console.error('Error: ', error))
  }

  setYodish = (result) => {
    this.setState({yodish: result.yodish})
  }

  clearYodish = () => {
    this.setState({yodish: ''})
  }

  componentDidMount() {
    setInterval(
      () => this.startYodaBlinking(), 2000
    );
  }

  startYodaBlinking() {
    if (this.state.currentYoda === 0) {
      this.setState({currentYoda: 1})
    } else {
      this.setState({currentYoda: 0})
    }
  }

  render() {
    const { userInput } = this.state
    const yoda = [ yodaReady, yodaBlink ];

    return (
      <div className="App">

        <CommentDiv>
          { this.state.yodish.length > 0
            ?
              <CommentBubble>
                <h4>{this.state.yodish}</h4>
                <XButton onClick={this.clearYodish}>&#10006;</XButton>
              </CommentBubble>
            :
            <div>
              {/* empty if there is no yodish */}
            </div>
          }
        </CommentDiv>

        { this.state.yodish.length > 0
          ?<div>
            <img alt='yodaAnswer' src={yodaAnswer}/>
          </div>
          : <div>
            <img alt='yoda' src={yoda[this.state.currentYoda]}/>
          </div>
        }

        <div>
          <h4>Yodish translator:</h4>
          <InputForm
            value={userInput}
            onChange={this.onInputChange}
            onSubmit={this.onInputSubmit}
          >
            GO
          </InputForm>
        </div>

      </div>
    );
  }
}

export default App;
