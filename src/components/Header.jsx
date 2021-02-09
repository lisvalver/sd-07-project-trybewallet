import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { showEmail } = this.props;
    return (
      <section>
        <h2>carteira</h2>
        <div data-testid="email-field">
          {`E-mail: ${showEmail}`}
        </div>
        <div data-testid="total-field">
          0
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>

      </section>
    );
  }
}

// lendo o state do redux

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    showEmail: user.email,
  };
};

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  showEmail: PropTypes.string.isRequired,
};
