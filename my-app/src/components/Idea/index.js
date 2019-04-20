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
import ReactQuill from 'react-quill';
import { dashboard } from '../Dashboard';


const IdeaPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Idea firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);

              
class Idea extends React.Component {
  constructor(props) {
    super(props)
    this.state = { prompt: "", question: ""}
  }

  onSelect = (prompt) => {
    this.setState({ prompt });
    this.props.firebase.prompts().once('value').then((snapshot) => {
      var prompt_question = [];
      snapshot.forEach(function(data) {
        if(data.key === prompt){
          prompt_question.push(data.val()); //push into array because data.val() is ReadOnly. It cannot be defined as string
        }
      });
      this.setState({question: prompt_question[0]});
    })
  }

  render() {
    
    return (
      <div className = "main">
      <h1 className="title text-center mt-0">Interogate Idea</h1>
        <div className="centerDiv">
      <div className = "card">
      {/* <ReactQuill /> */}
          <div className="cardHeader">
              <p className="ideaFont">Idea</p>
          </div>
          <div className="cardBody">
            <p></p>
          </div>
      </div>
        </div>
      <div className="centerDiv2"> 
      <div className="tabs">
        <Tabs activeKey={this.state.prompt} id="uncontrolled-tab-example" onSelect={prompt => this.onSelect(prompt)}>
          <Tab eventKey="customer" title="Customer">
              <div className="label1"><Form.Label className = "question-label">Question: {this.state.question} </Form.Label></div>
              <form>
                  <input 
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder=""
              />
              </form>        
          </Tab>
          <Tab eventKey="competitor" title="Competition">
              <Form.Label className = "question-label">Question: {this.state.question}</Form.Label>
              <form>
                  <input 
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder=""
              />
              </form>
          </Tab>
          <Tab eventKey="solution" title="Solution">
              <Form.Label className = "question-label">Question: {this.state.question}</Form.Label>
              <form>
                  <input 
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder=""
              />
              </form>
          </Tab>
          <Tab eventKey="problem" title="Problem">
                <Form.Label className = "question-label">Question: {this.state.question}</Form.Label>
              <form>
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


export default IdeaPage;

export {IdeaForm};

