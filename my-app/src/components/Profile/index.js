import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { EditProfileLink } from '../EditProfile';
import { withFirebase } from '../Firebase';
import Firebase, {FirebaseContext} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import profileImg from './fakeImgForProfile.png';
import { compose } from 'recompose';
import './style.css'


const ProfilePage = () => (
  <div>
    <h1 className = "title mt-0">Your Profile </h1>
    <FirebaseContext.Consumer>
      {firebase => <Profile firebase={firebase}/>}
    </FirebaseContext.Consumer>
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
      <div className = "mt-4">
        <img className = "profile_img_" src={profileImg} alt="profile"/>
        <table className="editTable">
        <tr>
        <td className="cell">
        Your University
        </td>
        <td>
        {this.state.profile.university}
        </td>
        </tr>
        <tr>
        <td className="cell">
        Degree
        </td>
        <td>
        {this.state.profile.degree}
        </td>
        </tr>
        <tr>
        <td className="cell">
        Skills
        </td>
        <td>
        {this.state.profile.skills}
        </td>
        </tr>
        <tr>
        <td className="cell">
        Industries
        </td>
        <td>
        {this.state.profile.industries}
        </td>
        </tr>

        <tr>
        <td className="cell">
        Roles
        </td>
        <td>
        {this.state.profile.roles}
        </td>
        </tr>
        
        <tr>
        <td>
        </td>
        <td className="cell2">
        <p className="button"><EditProfileLink/></p>
        </td>
        </tr>
        
        </table>
      </div>

    );
  }
}
    




export default ProfilePage;

export {EditProfileLink};





