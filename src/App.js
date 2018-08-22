import React, { Component } from 'react';
import InputForm from './InputForm';
import yodaReady from './yoda/yodaReady.svg'
import yodaAnswer from './yoda/yodaAnswer.svg'
import yodaBlink from './yoda/yodaBlink.svg'
import yodaThinking from './yoda/yodaThinking.svg'
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
      yodaBlinking: 0,
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

    (!userInput.length)
    ? this.setState({yodish: "Submit a sentence, or I will help you not."})
    : this.getYodish(userInput);
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
    this.setState({
      yodish: result.yodish,
      isLoading: false,
    })
    let oldInput = this.state.savedUserInput
    let oldYodish = this.state.yodish
    this.setState({history: [oldInput, oldYodish, ...this.state.history]})
  }

  clearYodish = () => {
    this.setState({yodish: ''})
  }

  clearNote = () => {
    this.setState({note: []})
  }

  componentDidMount() {
    setInterval(
      () => this.startYodaBlinking(), 2000
    );
  }

  startYodaBlinking() {
    (this.state.yodaBlinking === 0) ? this.setState({yodaBlinking: 1}) : this.setState({yodaBlinking: 0});
  }

  render() {
    const { yodaBlinking, isLoading, userInput, yodish, note, history } = this.state
    const yodaBlinks = [ yodaReady, yodaBlink ];

    return (
      <div className="App">

        <CommentDiv>
          { note.length > 0
            ? <CommentBubble>
              <h4>{note[0]}</h4>
              <h5>{note[1]}</h5>
              <XButton onClick={this.clearNote}>&#10006;</XButton>
            </CommentBubble>
            : ( yodish.length > 0
              ? <CommentBubble>
                <h4>{yodish}</h4>
                <XButton onClick={this.clearYodish}>&#10006;</XButton>
              </CommentBubble>
              : <div>{/* empty if there is no yodish */}</div>
            )
          }
        </CommentDiv>

        { yodish.length > 0
          ? <img alt='yodaAnswer' src={yodaAnswer}/>
          : (isLoading
            ? <img alt='yodaThinking' src={yodaThinking} />
            : <img alt='yodaBlinking' src={yodaBlinks[yodaBlinking]}/>
          )
        }

        <h4>Yodish translator:</h4>
        <InputForm
          value={userInput}
          onChange={this.onInputChange}
          onSubmit={this.onInputSubmit}
        >
          GO
        </InputForm>

        { history.length > 0
          ? <div>
            <h4>History:</h4>

            { history.map((string, index) => { return index % 2 === 0
              ? <InputDiv key={index}>{string}</InputDiv>
              : <YodishDiv key={index}>{string}</YodishDiv>
            })}

          </div>
          : <div>{/* empty if there is no history */}</div>
        }

      </div>
    );
  }
}

export default App;
