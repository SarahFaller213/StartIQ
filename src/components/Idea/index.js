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

const IdeaPage = (props) => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Idea firebase={firebase} {...props}/>}
    </FirebaseContext.Consumer>
  </div>
);


              
class Idea extends React.Component {
  constructor(props) {
    super(props)
    this.state = { prompt: "", number: "", question: "", key: props.match.params.key, uid: undefined, date: "", content: "", answer:""}
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getRefineIdea(this.state.uid, this.state.key).then((idea) => {
          console.log(idea)
          this.setState({
            date: idea.created_at,
            content: idea.idea
          })
        })
      }
      else this.setState({ uid: undefined});
    });
  }


  onChange = event => {
    this.setState({ answer: event.target.value });
  };

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

  onClick = (evt) => {
    evt.preventDefault();
    this.props.firebase.putAnswers(this.state.answer, this.state.uid, this.state.key, this.state.prompt);
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
              <form>
                  <div className="questionInput">
                  <input 
                  name="email"
                  type="text"
                  value = {this.state.answer}
                  className="form-control"
                  placeholder=""
                  onChange = {this.onChange}
              />
                </div>
              <Button className="nurikuri" id="next" disabled={blockSubmit} type="submit" onClick = {(evt) => this.onClick(evt)}> save</Button>
            </form>        
          </Tab>
          <Tab eventKey="Competition" title="Competition">
              <Form.Label className = "question-label">{this.state.question}</Form.Label>
              <p><b>{this.state.answer}</b></p>
              <form>
                  <div className="questionInput">
                  <input 
                  name="email"
                  type="text"
                  value = {this.state.answer}
                  className="form-control"
                  placeholder=""
                  onChange = {this.onChange}
              />
             </div>
             
              <Button className="nurikuri" id="next" disabled={blockSubmit} type="submit"  onClick = {(evt) => this.onClick(evt)}> save</Button> 
            </form>

          </Tab>
          <Tab eventKey="Solution" title="Solution">
              <Form.Label className = "question-label">{this.state.question}</Form.Label>
              <p><b>{this.state.answer}</b></p>
              <form>
                  <div className="questionInput">
                  <input 
                  name="email"
                  type="text"
                  value = {this.state.answer}
                  className="form-control"
                  placeholder=""
                  onChange = {this.onChange} />
                </div>
                <Button className="nurikuri" id="next" disabled={blockSubmit} type="submit"  onClick = {(evt) => this.onClick(evt)}> save</Button>
              </form>
          </Tab>
          <Tab eventKey="Problem" title="Problem">
                <Form.Label className = "question-label">{this.state.question}</Form.Label>
                <p><b>{this.state.answer}</b></p>
              <form>
                <div className="questionInput">
                  <input 
                  name="email"
                  type="text"
                  value = {this.state.answer}
                  className="form-control"
                  placeholder=""
                  onChange = {this.onChange}
              />
              </div>
              <Button className="nurikuri" id="next" disabled={blockSubmit} type="submit"  onClick = {(evt) => this.onClick(evt)}> save</Button>
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

