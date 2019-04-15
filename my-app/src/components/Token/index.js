import React, { Component } from 'react';
import Firebase, {FirebaseContext} from '../Firebase';
import { Button, InputGroup, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap';
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
  community: "",
  tokens: []
};

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // componentDidMount() {
  //   this.props.firebase.tokens().on('value', snapshot => {
  //     const tokensObject = snapshot.val();
  //     const tokensList = Object.keys(tokensObject).map(key => ({
  //       ...tokensObject[key],
  //       uid: key,
  //     }));

  //     this.setState({
  //       tokens: tokensList,
  //       loading: false,
  //     });
  //   });
  // }

  // componentWillUnmount() {
  //   this.props.firebase.tokens().off();
  // }


  onSubmit = event => {
    event.preventDefault();
    const { token, community } = this.state;
    this.props.firebase.putTokens(token, community);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {
    const { tokens, community, token } = this.state;
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
          
          {/* <TokensList tokens = {tokens} /> */}
        </div>
      </div>
    );
  }
}

// const TokensList = ({ tokens }) => (
//   <div>
//     <p className = "p_title text-center mt-4">Already Existed Community Codes:</p>
//     <ListGroup>
//       {tokens.map(token => (
//         <ListGroup.Item className="text-center mt-2">{token.community}</ListGroup.Item>
//       ))}
//     </ListGroup>
//   </div>
// );


export default TokenPage;