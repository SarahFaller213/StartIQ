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
    <h2><EditProfileLink/></h2>


  </div>
);

const INITIAL_STATE = {
  university: '',
  skills: '',
  degree: null,
};

export default ProfilePage;

export {EditProfileLink};