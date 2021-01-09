import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      currentCurrency: 'BRL',
    };
  }

  render() {
    const { userEmail, total } = this.props;
    const { currentCurrency } = this.state;
    return (
      <div className="header-container">
        <h3 className="email-field" data-testid="email-field">
          { `Email: ${userEmail}` }
        </h3>
        <div className="total-container">
          <h4>
            Despesa total: R$
          </h4>
          <h4 data-testid="total-field">
            { total }
          </h4>
          <h4 data-testid="header-currency-field">
            {currentCurrency}
          </h4>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
