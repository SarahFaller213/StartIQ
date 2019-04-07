import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import rocket from './rocket.svg'
import kauff from './Kauffman.png'
import fuqua from './Fuqua.gif'
import IE from './DukeIE.gif'
import './style.css'

const SignInPage = () => (
  <div>
    <section className = "screen">

      <div className = "container pt-5">
        <div className="row align-items-center justify-content-center pt-5">

          <div className="col-md-4">    
            <div class = "row mydiv">
              <img src= {rocket} className = "rocket" alt="StartIQ" />
            </div>
            <div className = "row align-items-center">
              <h1 className = "fancy">Start up. Smarter.</h1>
              <p className = "lato">StartIQ provides support to aspiring founders across the world by automatically interrogating their ideas, delivering data rich insights, organizing their artifacts, and connecting them with people who can help.</p>
             </div>
          </div>

          <div className = "col-md-7">
            <div className= "col1">
              <SignInForm />
              <SignInGoogle />
            </div>
          </div>

        </div>
      </div>
      
    </section>

    <section className = "partner">
      <div class = "container">
        <div class = "row justify-content-center">
          <h1 class = "fancy">Our partners</h1>
        </div>
        <div class = "row justify-content-center align-items-center">
          <img src= {kauff} className = "partners" alt="StartIQ" />
          <img src= {IE} className = "partners" alt="StartIQ" />
          <img src= {fuqua} className = "partners_fuqua" alt="StartIQ" />
        </div>
      </div>
    </section>

  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};



class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}


class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
    <div>
      <div className="elements">
      Welcome back
      </div>
      <form onSubmit={this.onSubmit}>
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
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <div className="elements">
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        </div>
        <div className="elements">
        <SignUpLink />
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };
