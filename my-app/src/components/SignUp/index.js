import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import './style.css'
import rocket from './rocket.svg'
import kauff from '../SignIn/Kauffman.png'
import fuqua from '../SignIn/Fuqua.gif'
import IE from '../SignIn/DukeIE.gif'
import FormCheck from 'react-bootstrap/FormCheck'
import Form from 'react-bootstrap/Form'



const SignUpPage = () => (
  <div>
    <section className = "screen pt-4">

      <div className = "container-fluid pt-15">
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

          <div className="col-md-2"></div>

          <div className = "col-md-4">
            <div className= "col1">
              <SignUpForm />
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
  userType:'',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  token: '',
  imgURL: '',
  blockSubmit: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {userType, username, email, passwordOne, imgURL, token } = this.state;
      
    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(result => this.props.firebase.signup(userType, username, email, imgURL, token,result.user.uid))
        .then(() => this.props.history.push(ROUTES.DASHBOARD))
        .catch(error => {
            console.log(error);
            this.setState({ error: error.message }); //Set Error State as Error message
    })

  }
  

  onRole = event => {
      this.setState({userType: event.target.value});
  }
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onUpload = (event) => {
    this.setState({blockSubmit: true});
    this.props.firebase.uploadImg(event.target.files[0]).then(url => {
      this.setState({imgURL: url, blockSubmit: false});
    });
  }

  render() {
    const { 
      userType,
      username,
      email,
      passwordOne,
      passwordTwo,
      token,
      imgURL,
      blockSubmit,
      error,
    } = this.state;
    
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

      
    return (
    <div>
      <div className="elements2 signup-text">
          Sign up for free
      </div>

      <form onSubmit={this.onSubmit}>
        <div className="elements2-mx-1">
        <Form>
        <fieldset>
        <Form.Group>
            {['radio'].map(type => (
            <div key={'inline-${type}'} className="mb-3">
                <Form.Check inline label="Mentor" id={'inline-${type}-1'} name = "userType" type="radio"
                value= "mentor"
                onChange={this.onRole}

                />
                <Form.Check inline label="User" id={'inline-${type}-1'} name = "userType" type="radio" 
                value= "user"
                onChange={this.onRole}

                />
            </div>))}
        </Form.Group>
        </fieldset>
        </Form>

        </div>
        
        <div className="elements2 mx-1">
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            className="form-control"
            placeholder="First Name and Last Name"
          />
        </div>
        <div className="elements2 mx-1">
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            className="form-control"
            placeholder="Email Address"
          />
        </div>
        <div className="elements2 mx-1">
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          className="form-control"
          placeholder="Password"
        />
        </div>
        <div className="elements2 mx-1">
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          className="form-control"
          placeholder="Confirm Password"
        />
        </div>
        <div className="elements2 mx-1">
        <input
          name="token"
          value={token}
          onChange={this.onChange}
          type="text"
          className="token"
          placeholder="Community Password"
        />
        </div>
        <div className="elements2 mx-1">
        <input
          onChange={this.onUpload}
          type="file"
          accept="image/*"
          className="form-control"
        />
        <input 
          name="imgURL"
          value={imgURL}
          readOnly
          hidden
        />
        </div>
        <div className="elements2">
        <button className = "btn nurikuri btn-block" disabled={blockSubmit} type="submit">Sign Up</button>
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