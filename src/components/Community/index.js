import React from 'react';
import { withFirebase } from '../Firebase';
import {FirebaseContext} from '../Firebase';
import './style.css'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'


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
      console.log(users)

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
  <div className = "mt-4">
    <CardDeck className="communityDeck">
    {users.map(user => (
        <Card style={{ width: '18rem'}} className="card1">
            <Card.Img variant="top" className="cardImage" src={user.profile_info.profileIMG} alt="profile"/>
            <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>email:  {user.email}</Card.Text>
            <Card.Text>University: {user.profile_info.university}</Card.Text>
            <Card.Text>Degree: {user.profile_info.degree}</Card.Text>
            <Card.Text>Skills: {user.profile_info.skills}</Card.Text>
            </Card.Body>
        </Card>
    ))}
    </CardDeck>
  </div>
);







export default withFirebase(CommunityPage);






