import React, { Component } from 'react';
import yodaEyesOpen from './yoda/yodaEyesOpen.svg'
import yodaEyesClosed from './yoda/yodaEyesClosed.svg'
import yodaAnswer from './yoda/yodaAnswer.svg'
import yodaThinking from './yoda/yodaThinking.svg'

class Yoda extends Component {
  constructor() {
    super();

    this.state = {
      yodaBlinking: 0,
    }
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
    const yodaBlinks = [ yodaEyesOpen, yodaEyesClosed ];
    const {yodaBlinking} = this.state;

    return (
      <div className="yoda blinking">
        { this.props.yodish.length > 0
          ? <img alt='yoda has an answer' src={yodaAnswer}/>
          : (this.props.isLoading
            ? <img alt='yoda is thinking' src={yodaThinking} />
            : <img alt='yoda is blinking' src={yodaBlinks[yodaBlinking]}/>
          )
        }
      </div>
    );
  }
}

export default Yoda;
