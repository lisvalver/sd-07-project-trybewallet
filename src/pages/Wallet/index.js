import React from 'react';

import {
  Container,
  Content,
} from './styles';

import Header from '../../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Header />
        </Content>
      </Container>
    );
  }
}

export default Wallet;
