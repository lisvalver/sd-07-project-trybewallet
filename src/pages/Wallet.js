import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>

        <form>
          <input data-testid="value-input" />
          <input data-testid="description-input" />
          {/* <select data-testid="currency-input" >
        <option>

        </option>
      </select> */}
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
