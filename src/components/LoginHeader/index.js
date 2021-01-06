import React from 'react';
import PropTypes from 'prop-types';

const LoginHeader = ({ message }) => (
  <h1 className="ui green icon header">
    <i aria-hidden="true" className="money bill alternate icon" />
    {message}
  </h1>
);

LoginHeader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoginHeader;
