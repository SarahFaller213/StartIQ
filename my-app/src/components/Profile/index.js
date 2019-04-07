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
        <td>
        </td>
        <td className="cell2">
        <p className="button"><EditProfileLink/></p>
        </td>
        </tr>
        
        </table>

    );
  }
}
    




export default ProfilePage;

export {EditProfileLink};





