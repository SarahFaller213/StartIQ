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
import renderHTML from 'react-render-html';

const Mentor_IdeaPage = (props) => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Idea_Mentor firebase={firebase} {...props}/>}
    </FirebaseContext.Consumer>
  </div>
);


              
class Idea_Mentor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { prompt: "", number: "", question: "", key: props.match.params.key, uid: props.match.params.uid, date: "", content: "", answer:""}
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.props.firebase.getRefineIdea(this.state.uid, this.state.key).then((idea) => {
          console.log(idea)
          this.setState({
            date: idea.created_at,
            content: idea.idea
          })
        })
      }
    });
  }


  onSelect = (prompt) => {
    this.setState({ prompt });
    this.props.firebase.prompts(prompt).once('value').then((snapshot) => {
      var prompt_question = [];
      snapshot.forEach(function(data) {
          prompt_question.push(data.val()); //push into array because data.val() is ReadOnly. It cannot be defined as string
        });
      this.setState({question: prompt_question[0]});
      this.setState({blockSubmit:false})
    })

    this.props.firebase.getAnswers(this.state.uid, this.state.key, prompt).then((ans) => {
      this.setState({answer : ans})
    })
  }

  render() {
    const { 
      blockSubmit,
    } = this.state;

    
    return (
      <div className = "main">
      <h1 className="title text-center mt-0">Interogate Idea</h1>
        <div className="centerDiv">
      <div className = "card">
        <div className="cardHeader">
            <p className="ideaFont">Idea</p>
        </div>
        <div className="cardBody">
          {renderHTML(this.state.content)}
        </div>
      </div>
        </div>
      <div className="centerDiv2"> 
      <div className="tabs">
        <Tabs activeKey={this.state.prompt} id="uncontrolled-tab-example" onSelect={prompt => this.onSelect(prompt)}>
          <Tab eventKey="Customer" title="Customer">
            <div className="label1"><Form.Label className = "question-label">{this.state.question} </Form.Label> </div>
            <p><b>{this.state.answer}</b></p>
          </Tab>
          <Tab eventKey="Competition" title="Competition">
            <Form.Label className = "question-label">{this.state.question}</Form.Label>
            <p><b>{this.state.answer}</b></p>
          </Tab>
          <Tab eventKey="Solution" title="Solution">
            <Form.Label className = "question-label">{this.state.question}</Form.Label>
            <p><b>{this.state.answer}</b></p>
          </Tab>
          <Tab eventKey="Problem" title="Problem">
            <Form.Label className = "question-label">{this.state.question}</Form.Label>
            <p><b>{this.state.answer}</b></p> 
          </Tab>
        </Tabs> 
      </div>
      </div>
        
      </div>
    )
  }

}

const MentorIdeaForm = compose(
  withRouter,
  withFirebase,
)(Idea_Mentor);


export default Mentor_IdeaPage;

export {MentorIdeaForm};

