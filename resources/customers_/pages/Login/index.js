import React, {Component} from 'react'
import PropTypes from 'prop-types'; 
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import loginRequest from './actions'; 

import Messages from '../../components/Messages'
import Errors from '../../components/Errors'

// If you were testing, you'd want to export this component
// so that you can test your custom made component and not
// test whether or not Redux and Redux Form are doing their jobs
class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }

  submit = (values) => {
    this.props.loginRequest(values)
  }

  render() {
    const {
      handleSubmit, 
      login: {
        requesting, 
        successful, 
        messages, 
        errors,
      },
    } = this.props

    const UsernameField = () => (
      <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
    )

    const PasswordField = () => (
      <Form.Input
        fluid
        icon='lock'
        iconPosition='left'
        placeholder='Password'
        type='password'
      />
    )

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/static/images/logo.png' />  */}
            Log-in to your account
          </Header>
          <form className="ui large form" onSubmit={handleSubmit(this.submit)}>
            <Segment stacked>
              <Field
                name="username"
                type="text"
                id="username"
                className="username"
                component = "input"
              />
              <Field
                name="password"
                type="password"
                id="password"
                className="password"
                component = "input"
              />
              <Button action='submit' color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </form>
          <div className="auth-messages">
            {/* As in the signup, we're just using the message and error helpers */}
            {!requesting && !!errors.length && (
              <Errors message="Failure to login due to:" errors={errors} />
            )}
            {!requesting && !!messages.length && (
              <Messages messages={messages} />
            )}
            {requesting && <div>Logging in...</div>}
          </div>
          {!requesting && !successful && (
            <Message>
              New to us ? <a href='/signup'>Sign Up</a>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login, 
})

const connected = connect(mapStateToProps, {loginRequest})(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'login',
})(connected)

// Export our well formed login component
export default formed