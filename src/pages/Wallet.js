import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValue: 0,
      moeda: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { initialValue, moeda } = this.state;
    return (
      <div>
        <p>Trybe Wallet</p>
        <header>
          <h3 data-testid="email-field">{ email }</h3>

          <h4 data-testid="total-field">{ initialValue }</h4>

          <h4 data-testid="header-currency-field">{ moeda }</h4>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
