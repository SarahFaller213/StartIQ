import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Firebase, {FirebaseContext} from '../Firebase';
import './style.css'
import { Col, Button, Form, Row} from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'



const IdeaPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Idea firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);

const INITIAL_STATE = {
  email: '',
};


class Idea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {ideas: "", uid: undefined, username: undefined, attachments: [], profile: '' }
    this.uploadRef = React.createRef();
  }
    

  render() {
    // ideas
      
      return (
        <div className = "main">
        <h1 className="title text-center mt-0">Interogate Idea</h1>
        <div className="centerDiv" >
        <div className="card">
            <div className="cardHeader">
                <p className="ideaFont">Idea</p>
            </div>
            <div className="cardBody">
                <p>blah blah content</p>
            </div>
        </div>
        </div>
        <div className="centerDiv2"> 
        <div className="tabs">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="customer" title="Customer">
                <div className="label1"><Form.Label>Question: Show question</Form.Label></div>
                <form onSubmit={this.onSubmit}>
                    <input 
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder=""
                />
                </form>
            </Tab>
            <Tab eventKey="competition" title="Competition">
                <Form.Label>Question:</Form.Label>
                <form onSubmit={this.onSubmit}>
                    <input 
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder=""
                />
                </form>
            </Tab>
            <Tab eventKey="solution" title="Solution">
                <Form.Label>Question:</Form.Label>
                <form onSubmit={this.onSubmit}>
                    <input 
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder=""
                />
                </form>
            </Tab>
            <Tab eventKey="problem" title="Problem">
                 <Form.Label>Question:</Form.Label>
                <form onSubmit={this.onSubmit}>
                    <input 
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder=""
                />
                </form>
            </Tab>
          </Tabs> 
        </div>
        </div>
          
        </div>
          
      )
    }

  
}

const IdeaForm = compose(
  withRouter,
  withFirebase,
)(Idea);

const MoreIdeaLink = () => (
  <Link to={ROUTES.IDEA_PAGE}> <Button className = "submit" variant="info">
    Refine
  </Button></Link>
);


export default IdeaPage;

export {IdeaForm, MoreIdeaLink};

