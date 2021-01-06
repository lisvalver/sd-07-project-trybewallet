import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment } from 'semantic-ui-react';

const LoginForm = ({
  formData: { email, password },
  onInputChange,
  onSubmit,
  disabled,
}) => (
  <Form size="large">
    <Segment stacked>
      <Form.Field
        control="input"
        value={ email }
        name="email"
        placeholder="E-mail"
        data-testid="email-input"
        onChange={ (event) => onInputChange(event) }
      />
      <Form.Field
        control="input"
        name="password"
        value={ password }
        placeholder="Senha"
        type="password"
        data-testid="password-input"
        onChange={ (event) => onInputChange(event) }
      />
      <Button
        onClick={ (event) => onSubmit(event) }
        disabled={ disabled }
        color="green"
        fluid
        size="large"
      >
        Entrar
      </Button>
    </Segment>
  </Form>
);

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoginForm;
