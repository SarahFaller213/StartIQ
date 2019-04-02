import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Firebase, {FirebaseContext} from '../Firebase';
import './style.css'



const EditPage = () => (
  <div>
    <h1>Profile</h1>
    <EditForm />
  </div>
);


const INITIAL_STATE = {
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
          // 
        })
      }
      else this.setState({ uid: undefined });
    });
  }


 onSubmit = event => {
    const { university, skills, degree, uid } = this.state;
    this.props.firebase.putProfile(university, skills, degree, uid );
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
    <div className = "wrapper">
      <form className="form" onSubmit={this.onSubmit}>
        <input
        className="input"
          name="university"
          value={university}
          onChange={this.onChange}
          type="text"
          placeholder="Where did you go to school?"
        />
        <input 
        className="input"
          name="skills"
          value={skills}
          onChange={this.onChange}
          type="text"
          placeholder="What skills do you have?"
        />
        <input
        className="input"
          name="degree"
          value={degree}
          onChange={this.onChange}
          type="text"
          placeholder="What degree are you pursuing or have?"
        />
        <button type="submit" className="button1">Save</button>
        {error && <p>{error}</p>}
        
      </form>
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