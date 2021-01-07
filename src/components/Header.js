import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>
          Olá,
          <span data-testid="email-field">{user.email}</span>
        </p>
        <p>
          Despesa Total:
          <span data-testid="total-field">0</span>
        </p>
        <p>
          Câmbio utilizado:
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, null)(Header);
