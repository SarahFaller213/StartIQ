import React from 'react';
import { withFirebase } from '../Firebase';
import {FirebaseContext} from '../Firebase';
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
    <CardGroup>
    {users.map(user => (
        <Card style={{ width: '18rem'}} className="text-center">
            <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>email:  {user.email}</Card.Text>
            <Card.Text>University: {user.profile_info.university}</Card.Text>
            <Card.Text>Degree: {user.profile_info.degree}</Card.Text>
            <Card.Text>Skills: {user.profile_info.skills}</Card.Text>
            </Card.Body>
        </Card>
    ))}
    </CardGroup>
  </div>
);







export default withFirebase(CommunityPage);






