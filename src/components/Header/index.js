import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Infos, Nav } from './styles';

const { format } = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

const Header = ({ email }) => (
  <Nav>
    <h1>Logo</h1>
    <Infos>
      <span className="email-input" data-testid="email-field">
        Email:
        {email}
      </span>
      <span>
        Despesas Totais: R$
        <span data-testid="total-field">
          {format(0)}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </span>
    </Infos>
  </Nav>
);

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
