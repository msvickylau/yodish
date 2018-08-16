import React, { Component } from 'react';

class InputForm extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit
    } = this.props;

    return(
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
        />
        <button type='submit'>
          submit
        </button>
      </form>
    )
  }
}

export default InputForm;
