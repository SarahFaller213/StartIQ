import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { EditProfileLink } from '../EditProfile';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import './style.css'


const ProfilePage = () => (
  <div>
    <h1>Your Profile </h1>
    <div>
    <FirebaseContext.Consumer>
      {firebase => <Dashboard firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
    <h2><EditProfileLink/></h2>
  </div>
);



const INITIAL_STATE = {
  university: '',
  skills: '',
  degree: null,
};

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { university: '',skills: '', degree: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.firebase.setupAuthChangeHandler((user) => {
    this.props.firebase.getProfile(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
          this.setState({university : university});
          console.log(this.state.university);
          this.setState({skills : skills});
          console.log(this.state.skills);
          this.setState({degree: degree});
          console.log(this.state.degree);
        });
      
    });
  }
    
    
export default ProfilePage;

export {EditProfileLink};





