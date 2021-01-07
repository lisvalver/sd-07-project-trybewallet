import styled from 'styled-components';

const NewForm = styled.form`
  align-items: center;
  background-color: #2c2c2c;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  font-weight: 500;
  
  label {
    color: white;
    margin-right: 20px;
  }

  input, select {
    background-color: none;
    box-shadow: none;
    border: none;
    border-radius: 6px;
    margin-left: 6px;
    padding: 4px;
    outline: none;
  }

  input#value-input {
    width: 80px;
  }

  input#send-btn {
    background-color: #fff;
    color: #252525;
    cursor: pointer;
    transition: .2s ease-in-out;
    font-weight: 700;
    font-size: 14px;
    padding: 4px 8px;

    &:hover {
      background-color: #bbb;
    }
  }
`;

export default NewForm;
