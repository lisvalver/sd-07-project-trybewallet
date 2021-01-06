import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

const LoginHeader = ({ message }) => (
  <Header as="h1" color="green" icon>
    <Icon name="money bill alternate" />
    {message}
  </Header>
);

LoginHeader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoginHeader;
