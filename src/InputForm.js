import React, { Component } from 'react';
import {
  StyledForm,
  StyledInput,
  GoButton
} from './styled'

class InputForm extends Component {

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    let input;

    return(
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => input = node}
        />

        <GoButton type='submit'>
          {children}
        </GoButton>
      </StyledForm>
    )
  }
}

export default InputForm;
