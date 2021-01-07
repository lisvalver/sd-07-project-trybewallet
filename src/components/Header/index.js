import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Cambio,
  Container,
  Content, DespesaTotal,
  Email,
} from './styles';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <Container>
        <Content>
          <Email data-testid="email-field">{ email }</Email>
          <DespesaTotal data-testid="total-field">{ 0 }</DespesaTotal>
          <Cambio data-testid="header-currency-field">BRL</Cambio>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
