import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  render() {
    const { handleChange, submitLogin, validation } = this.props;
    return (
      <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
        <Grid.Column style={ { maxWidth: 450 } }>
          <Header as="h2" color="teal" textAlign="center">
            Trybe Wallet
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                data-testid="email-input"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={ (e) => handleChange(e) }
                disabled={ validation() }
              />
              <Form.Input
                data-testid="password-input"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={ (e) => handleChange(e) }
              />
              <Button
                color="teal"
                fluid
                size="large"
                type="submit"
                onClick={ (e) => submitLogin(e) }

              >
                Entrar
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
};

export default LoginForm;
