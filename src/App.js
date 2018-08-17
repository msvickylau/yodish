import React, { Component } from 'react';
import InputForm from './InputForm';
import yodaReady from './yoda/yodaReady.svg'
import yodaAnswer from './yoda/yodaAnswer.svg'
import yodaBlink from './yoda/yodaBlink.svg'

class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      yodish: '',
      currentYoda: 0
    }
  }

  onInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    const { userInput } = this.state;
    if (!userInput.length) {
      alert("please submit a sentence")
    } else {
      const urlencodedInput = encodeURIComponent(userInput.trim());
      this.getYodish(urlencodedInput);
      this.setState({userInput: ''});
    }
  }

  getYodish = (urlencodedString) => {
    const url = 'http://yoda-api.appspot.com/api/v1/yodish?text=' + urlencodedString

    fetch(url)
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

        <div>
          <h4>{this.state.yodish}</h4>
        </div>


        { this.state.yodish.length > 0
          ?
            <div>
              <button onClick={this.clearYodish}>clear</button> <br/>
              <img alt='yodaAnswer' src={yodaAnswer} width="400"/>
            </div>
          :
          <div>
            <img alt='yoda' src={yoda[this.state.currentYoda]} width="400"/>
          </div>
        }

        <div>
          Yodish translator:
          <InputForm
            value={userInput}
            onChange={this.onInputChange}
            onSubmit={this.onInputSubmit}
          >
            search
          </InputForm>
        </div>

      </div>
    );
  }
}

export default App;
