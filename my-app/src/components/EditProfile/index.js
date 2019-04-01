import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const EditPage = () => (
  <div>
    <h1>Profile</h1>
    <EditForm />
  </div>
);

const INITIAL_STATE = {
  university: '',
  skills: '',
  degree: '',
  error: null,
};


class ProfileEditBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };


  }

 onSubmit = event => {
    const { university, skills, degree } = this.state;
    this.props.firebase.putProfile(university, skills, degree, "dd");

  }



  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
      const {
      university,
      skills,
      degree,
      error,
    } = this.state;
      
      
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="university"
          value={university}
          onChange={this.onChange}
          type="text"
          placeholder="Where did you go to school?"
        />
        <input
          name="skills"
          value={skills}
          onChange={this.onChange}
          type="text"
          placeholder="What skills do you have?"
        />
        <input
          name="degree"
          value={degree}
          onChange={this.onChange}
          type="text"
          placeholder="What degree are you pursuing or have?"
        />
        <button type="submit">Save</button>

        {error && <p>{error}</p>}
        
      </form>
    );
  }
}



const EditProfileLink = () => (
  <Link to={ROUTES.EDIT}> <button>
    Edit
  </button></Link>
);




const EditForm = compose(
  withRouter,
  withFirebase,
)(ProfileEditBase);


export default EditPage;

export { EditForm, EditProfileLink};