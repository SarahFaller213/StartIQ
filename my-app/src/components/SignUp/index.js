import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import './style.css'


const SignUpPage = () => (
  <div>
    <h1>Welcome to StartIQ</h1>
    <div className= "col2">
    <SignUpForm />
    </div>
  </div>
);


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => this.props.firebase.signup(username, email, authUser))
    .then(() => this.props.history.push(ROUTES.DASHBOARD))
    .catch(error => {
      console.log(error);
      this.setState({ error: error.message }); //Set Error State as Error message
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
      const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
      
      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      
    return (
    <div>
    <div className="elements">
        Sign up for free
        </div>

      <form onSubmit={this.onSubmit}>
        <div className="elements">

        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        </div>
        <div className="elements">
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div className="elements">
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <div className="elements">
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        </div>
        <div className="elements">
        <button disabled={isInvalid} type="submit">Sign Up</button>
        </div>

        {error && <p>{error}</p>}
        
      </form>
    </div>
    );
  }
}



const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);


export default SignUpPage;

export { SignUpForm, SignUpLink };