import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Firebase, {FirebaseContext} from '../Firebase';
import './style.css'
import profileImg from './fakeImgForProfile.png';




const EditPage = () => (
  <div>
    <h1 className = "title mt-0">Your Profile</h1>
    <div className="editBox">
    <EditForm />
    </div>
  </div>
);


const INITIAL_STATE = {
  university: "",
  skills: "",
  degree: "",
  industries:"",
  roles:"",
  error: null,
  uid: '',
};

const EditDataBase = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <ProfileEditBase firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);


class ProfileEditBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getProfile(user.uid).then(profile => {
          this.setState({ 
            university : profile.university,
            skills: profile.skills,
            degree: profile.degree,
            industries:profile.industries,
            roles:profile.roles
          });
        });
      } else this.setState({ uid: undefined });
    });
  }


 onSubmit = event => {
    event.preventDefault();

    const {university, skills, degree, industries, roles, uid } = this.state;
    this.props.firebase.putProfile(university, skills, degree, industries, roles, uid ).then(() => {
      this.props.history.push(ROUTES.PROFILE);
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { university, skills, degree, industries, roles, error } = this.state;
      
    return (
        <div className = "mt-4">

        <img className = "profile_img_" src={profileImg} alt="profile"/>
        <table className="editTable">
        <tr>
        <td className="cell">
        Your University
        </td>
        <td>
        <form onSubmit={this.onSubmit}>
        <input
        className="input1"
          name="university"
          value={university}
          onChange={this.onChange}
          type="text"
          placeholder="Where did you go to school?"
        />
        </form>
        </td>
        </tr>
        <tr>
        <td className="cell">
        Degree
        </td>
        <td>
        <form onSubmit={this.onSubmit}>
        <input
        className="input1"
          name="degree"
          value={degree}
          onChange={this.onChange}
          type="text"
          placeholder="What degree are you pursuing or have?"
        />
        </form>
        </td>
        </tr>
        <tr>
        <td className="cell">
        Skills
        </td>
        <td>
        <form onSubmit={this.onSubmit}>
        <input
        className="input1"
          name="skills"
          value={skills}
          onChange={this.onChange}
          type="text"
          placeholder="What skills do you have?"
        />
        </form>
        </td>
        </tr>
        
        <tr>
        <td className="cell">
        Industries
        </td>
        <td>
        <form onSubmit={this.onSubmit}>
        <input
        className="input1"
          name="industries"
          value={industries}
          onChange={this.onChange}
          type="text"
          placeholder="What industries interest you"
        />
        </form>
        </td>
        </tr>

        <tr>
        <td className="cell">
        Roles
        </td>
        <td>
        <form onSubmit={this.onSubmit}>
        <input
        className="input1"
          name="roles"
          value={roles}
          onChange={this.onChange}
          type="text"
          placeholder="What are your roles?"
        />
        </form>
        </td>
        </tr>
        
        <tr>
        <td>
        </td>
        <td className="cell2">
        <form onSubmit={this.onSubmit}>
        <button type="submit" className="button1">Save</button>
        {error && <p>{error}</p>}  
        </form>
        </td>
        </tr>
        </table>
        </div>
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