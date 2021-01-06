import styled from 'styled-components';

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 6px;

  h1 {
    display: flex;
    margin: 0;
    padding: 0;
  }
`;

export const Infos = styled.div`
  display: flex;
  align-items: center;

  .email-input {
    margin-right: 24px;
  }  
`;
