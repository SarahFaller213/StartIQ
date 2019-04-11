import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { Button} from 'react-bootstrap';
import Firebase, {FirebaseContext} from '../Firebase';
import './style.css'




const EditPage = () => (
  <div>
    <h1 className = "title mt-0">Your Profile</h1>
    <div className="editBox">
    <EditForm />
    </div>
  </div>
);


const INITIAL_STATE = {
  profile: {
    profileIMG: "",
    university: "",
    skills: "",
    degree: "",
    industries:"",
    roles:""
  },
  blockSubmit: false,
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
          this.setState({ profile: profile });
        });
      } else this.setState({ uid: undefined });
    });
  }


 onSubmit = event => {
    event.preventDefault();
    const { profile, uid } = this.state;
    this.props.firebase.putProfile(profile, uid).then(() => {
      this.props.history.push(ROUTES.PROFILE);
    });
  }

  onChange = event => {
    this.state.profile[event.target.name] = event.target.value;
    this.setState({ profile: this.state.profile });
  };

  onUpload = (event) => {
    this.setState({blockSubmit: true});
    this.props.firebase.uploadImg(event.target.files[0]).then(url => {
      this.state.profile.profileIMG = url;
      this.setState({ profile: this.state.profile, blockSubmit: false });
    });
  }

  render() {
    const { profile, blockSubmit } = this.state;
      
    return (
      <div className = "mt-4">
        <img className = "profile_img_" src={profile.profileIMG} alt="profile"/>
        <input onChange={this.onUpload} type="file" accept="image/*" className="cell" />
        <input name="imgURL" value={profile.profileIMG} readOnly hidden />

        <form onSubmit={this.onSubmit}>
          <table className="editTable"> 
            <tbody> 
              <tr> 
                <td className="cell"> Your University </td>
                <td> 
                  <input className="input1" name="university" value={profile.university} onChange={this.onChange} type="text" placeholder="Where did you go to school?"/>
                </td>
              </tr>

              <tr>
                <td className="cell"> Degree </td> 
                <td>
                  <input className="input1" name="degree" value={profile.degree} onChange={this.onChange} type="text" placeholder="What degree are you pursuing or have?" />
                </td>
              </tr>

              <tr>
                <td className="cell"> Skills </td>
                <td> 
                  <input className="input1" name="skills" value={profile.skills} onChange={this.onChange} type="text" placeholder="What skills do you have?" />
                </td>
              </tr>
        
              <tr>
                <td className="cell"> Industries </td>
                <td> 
                  <input className="input1" name="industries" value={profile.industries} onChange={this.onChange} type="text" placeholder="What industries interest you"/>
                </td>
              </tr>

              <tr>
                <td className="cell"> Roles </td>
                <td>
                  <input className="input1" name="roles" value={profile.roles} onChange={this.onChange} type="text" placeholder="What are your roles?"/>
                </td>
              </tr>
              
              <tr>
                <td> </td>
                <td className="cell2">
                  <Button className = "submit" variant="secondary" disabled={blockSubmit} className="button1">Save</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

const EditProfileLink = () => (
  <Link to={ROUTES.EDIT}> <Button variant="secondary">
    Edit
  </Button></Link>
);




const EditForm = compose(
  withRouter,
  withFirebase,
)(ProfileEditBase);


export default EditPage;

export { EditForm, EditProfileLink};