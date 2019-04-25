import React, { Component } from 'react';
import {FirebaseContext} from '../Firebase';
import { Button, InputGroup, FormControl, ListGroup} from 'react-bootstrap';
import './style.css'

const TokenPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Token firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);


const INITIAL_STATE = {
  token: "",
  community:"",
  pairs: []
};

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.props.firebase.tokenPair().on('value', snapshot => {
      const tokenPair = [];
      snapshot.forEach(function(data) {
        tokenPair.push(data.val() + " && " + data.key);
      });

      this.setState({
        pairs: tokenPair
      });
    });
  }

  onSubmit = event => {
    event.preventDefault();
    const { token, community } = this.state;
    this.props.firebase.putTokens(token, community);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {
    const { community, token, pairs } = this.state;
    return (
      <div>
        <h1 className = "title text-center mt-0">Admin Page</h1>
        <p className = "p_title text-center mt-4">Create passcode for the Community</p>
        <div className="container_token">
          <InputGroup className="w-75 mt-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Community and Token</InputGroup.Text>
            </InputGroup.Prepend>
            
            <FormControl
              placeholder="Community Name"
              value={community}
              name = "community"
              onChange={this.onChange} type="text"
            />
            <FormControl
              placeholder="Create Token"
              value={token}
              name = "token"
              onChange={this.onChange} type="text"
            />

            <InputGroup.Append>
              <Button variant="outline-secondary" onClick = {this.onSubmit}>Generate</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className = "container_token">
          <TokensList pairs = {pairs} />
        </div>
      </div>
    );
  }
}

const TokensList = ({ pairs }) => (
  <div>
    <p className = "p_title text-center mt-4">Already Existed Communities && Tokens: </p>
    <hr></hr>
    <ListGroup as="ul">
      {pairs.map(pair => (
        <ListGroup.Item className="text-center mt-3"> 
          <p className = "p_title">{pair}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>

  </div>

  
);


export default TokenPage;