import React from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

const LoginM = () => (
  <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
    <Grid.Column style={ { maxWidth: 450 } }>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="../public/logo192.png" />
        Log-in to your account
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            data-testid="email-input"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            data-testid="password-input"
          />

          <Button
            color="teal"
            fluid
            size="large"
            disabled={ !auth || password.length < numberSix }
            type="button"
            onClick={ () => logando(email) }
          >
            Entrar
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default LoginM;
