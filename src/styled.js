import styled from 'styled-components';

export const CommentDiv = styled.div`
  display: felx;
  flex-direction: row;
  min-width: wid;
  min-height: 6em;
  align-items: center;
  padding: 1em;
`
export const CommentBubble = styled.div`
  background-color: #FFF;
  border-radius: 5em;
  border-bottom-right-radius: .2em;
  flex-grow: 1;
  position: relative;
  text-align: center;
  padding: 1em;
`

export const XButton = styled.button`
  flex-direction: column;
  color: #424242;
  font-size: 1rem;
  line-height: 1rem;
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  bottom: 3px;
  right: 2px;
  &:hover{
    color: #A8A439;
  }
`

export const StyledForm = styled.form`
  display: flex;
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  font-size: 13px;
  text-indent: 1em;
  height: 1.8rem;
  line-height: 1.8rem;
  border-top-left-radius: 1.5em;
  border-bottom-left-radius: 1.5em;
`;

export const GoButton = styled.button`
  background-color: #A8A439;
  line-height: 1.6rem;
  width: 3rem;
  align-items: center;
  color: #424242;
  font-size: .8rem;
  outline: none;
  border: none;
  border-top-right-radius: 1.5em;
  border-bottom-right-radius: .2em;
  &:hover{
    background-color: #AFB42B;
    color: #FFF;
  }
`
export const InputDiv = styled.div`
  ${'' /* color: #cac888; */}
  line-height: .85rem;
  font-size: .8rem;
  padding: .8em;
  background-color: #19192f;
  border-top-left-radius: .2em;
  border-top-right-radius: 1.5em;
`
export const YodishDiv = styled.div`
  color: #A8A439;
  background-color: #323246;
  line-height: .85rem;
  font-size: .8rem;
  padding: .8em;
  border-bottom-left-radius: 1.5em;
  border-bottom-right-radius: 1.5em;
  margin-bottom: 15px;
  text-shadow: 4px 4px 2px rgba(0,0,25, 0.8);
`
