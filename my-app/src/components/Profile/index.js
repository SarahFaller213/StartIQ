import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { EditProfileLink } from '../EditProfile';
import { withFirebase } from '../Firebase';
import Firebase, {FirebaseContext} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import './style.css'


const ProfilePage = () => (
  <div>
    <h1>Your Profile </h1>
    <div>
    <FirebaseContext.Consumer>
      {firebase => <Profile firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
    <h2><EditProfileLink/></h2>
  </div>
);

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { profile: { university: "", degree: "", skills: ""}, uid: undefined }
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      this.setState({uid: user.uid});
      this.props.firebase.getProfile(this.state.uid).then(profile => { 
        this.setState({profile: profile});
      });
    });
  }

  render() {
    return (
      <div className = "wrapper">
        <p> University : {this.state.profile.university} </p>
        <p> Degree : {this.state.profile.degree} </p>
        <p> Skills : {this.state.profile.skills} </p>
      </div>
    );
  }
}
    
    
export default ProfilePage;

export {EditProfileLink};





