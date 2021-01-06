import React from 'react';
import { connect } from 'react-redux';
import { Menu, Image, Segment, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const WalletHeader = ({
  userEmail,
  totalExpense,
  currentExchange,
}) => {
  const LOGO_TRYBE = 'https://uploads-ssl.webflow.com/5fba98ad987231cf0efa3d58/5fba9c9a93a2e77624258d49_Logo.svg';
  const total = new Intl.NumberFormat(
    'pt-BR',
    { style: 'currency', currency: 'BRL' },
  ).format(totalExpense);
  return (
    <Segment color="black" inverted>
      <Menu color="black" size="massive" inverted>
        <Menu.Item>
          <Image src={ LOGO_TRYBE } size="tiny" verticalAlign="middle" />
        </Menu.Item>
        <Menu.Item>
          <Header as="h2" inverted color="grey">
            <Icon name="money bill alternate outline" />
            <Header.Content>PROJECT TRYBE WALLET</Header.Content>
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <span data-testid="email-field">
              { userEmail }
            </span>
          </Menu.Item>
          <Menu.Item>
            <span data-testid="total-field">
              { `Despesa Total: ${total}` }
            </span>
          </Menu.Item>
          <Menu.Item>
            <span data-testid="header-currency-field">
              { `Câmbio: ${currentExchange}` }
            </span>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

WalletHeader.propTypes = {
  userEmail: PropTypes.string,
  totalExpense: PropTypes.number,
  currentExchange: PropTypes.string,
};

WalletHeader.defaultProps = {
  userEmail: '',
  totalExpense: 0,
  currentExchange: 'BRL',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpense: state.wallet.total,
});

export default connect(mapStateToProps)(WalletHeader);
