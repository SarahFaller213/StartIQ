import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { EditProfileLink } from '../EditProfile';
import { withFirebase } from '../Firebase';
import Firebase, {FirebaseContext} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import profileImg from './fakeImgForProfile.png';
import { compose } from 'recompose';
import './style.css'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'



const ProfilePage = () => (
  <div>
    <h1 className = "title mt-0">Your Profile </h1>
    <FirebaseContext.Consumer>
      {firebase => <CommunityPage firebase={firebase}/>}
    </FirebaseContext.Consumer>
    
  </div>

);

class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
    

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1 className = "title mt-0">Community</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}


const UserList = ({ users }) => (
  <div className = "mt-5">
    <CardGroup>
    {users.map(user => (

    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top"/>
        <Card.Body>
        <Card.Title className="text-center p-3">{user.username}</Card.Title>
        <Card.Text>
        <ul>
            <li>{user.university}</li>
            <li>{user.degree}</li>
            <li>{user.skills}</li>
        </ul>
        </Card.Text>
        </Card.Body>
        </Card>))}
    </CardGroup>
  </div>
);





export default withFirebase(CommunityPage);






