import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { EditProfileLink } from '../EditProfile';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const ProfilePage = () => (
  <div>
    <h1>Your Profile</h1>
    <EditProfileLink/>


  </div>
);

const INITIAL_STATE = {
  university: '',
  skills: '',
  degree: null,
};

export default ProfilePage;

export {EditProfileLink};