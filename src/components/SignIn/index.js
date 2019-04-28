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
import google from './googleIcon.png'
import './style.css'

const SignInPage = () => (
  <div>
    <section className = "screen pt-4">

      <div className = "container-fluid pt-20">
        <div className="row align-items-center justify-content-center pt-5">

          <div className="col-md-3">    
            <div className = "row mydiv">
              <img src= {rocket} className = "rocket" alt="StartIQ" />
            </div>
            <div className = "texts row align-items-center">
              <h1 className = "fancy">Start up. Smarter.</h1>
              <p className = "lato">StartIQ provides support to aspiring founders across the world by automatically interrogating their ideas, delivering data rich insights, organizing their artifacts, and connecting them with people who can help.</p>
             </div>
          </div>

          <div className="col-md-2">
          </div>
          <div className = "col-md-4">
            <div className= "col1 signInForm">
              <SignInForm />
              <SignInGoogle />
            </div>
          </div>

        </div>
      </div>
      
    </section>

    <section className = "partner">
      <div className = "container">
        <div className = "row justify-content-center">
          <h1 className = "fancy">Our partners</h1>
        </div>
        <div className = "row justify-content-center align-items-center">
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
      .then(() => {
        this.setState({ error: null });
        setTimeout(() => { this.props.history.push(ROUTES.DASHBOARD); }, 100);
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
       
        <button type="submit" className="btn nurikuri mx-3">
          <img src= {google} className = "google" alt="StartIQ" /> Sign In with Google
        </button>

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
    const { email, password} = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ email: email, password: password });
        if(email === "admin@gmail.com"){
          setTimeout(() => { this.props.history.push(ROUTES.TOKEN); }, 100);
        } else {
          this.props.firebase.setAuthChangeHandler((user) => {
            this.props.firebase.user(user.uid).once('value').then(snapshot => {
              // console.log(snapshot.val().userType);
              if(snapshot.val().userType == "mentor"){
                setTimeout(() => { this.props.history.push(ROUTES.FEED); }, 300);
              } else if(snapshot.val().userType == "user") {
                setTimeout(() => { this.props.history.push(ROUTES.DASHBOARD); }, 100);
              } else if (snapshot.val().userType = "admin") {
                setTimeout(() => { this.props.history.push(ROUTES.TOKEN); }, 100);
              }
            });
          })
        }
      }).catch(error => {
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
      <div className="elements" id="welcome-text">
      Welcome Back
      </div>
      <form onSubmit={this.onSubmit}>
        <div className="elements">
        <input 
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          className="form-control"
          placeholder="Email Address"
        />
        </div>
        <div className="elements">
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          className="form-control"
          placeholder="Password"
        />
        </div>
        <div className="elements">
        <button type="submit" className="btn nurikuri btn-block">
          Log In
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
