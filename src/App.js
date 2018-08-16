import React, { Component } from 'react';
import InputForm from './InputForm';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      yodish: 'Help you I can. Yes. Mmmmm.'
    }
  }

  onInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    const { userInput } = this.state;
    const urlencodedInput = encodeURIComponent(userInput.trim());
    this.getYodish(urlencodedInput);
    this.setState({userInput: ''});
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

  render() {
    const { userInput } = this.state
    return (
      <div className="App">

        <div>
          <h4>{this.state.yodish}</h4>
        </div>

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
