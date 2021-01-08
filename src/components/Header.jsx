import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { email } = this.props;
    const INITIAL_TOTAL_PRICE = 0;
    const COIN_TYPE = 'BRL'

    return(
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { INITIAL_TOTAL_PRICE }
            </span>
            <span data-testid="header-currency-field">
              { COIN_TYPE }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps, null)(Header);
