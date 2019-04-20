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


const INITIAL_STATE = {
      questions: {
          comp :{
            "Are_there_competing_Companies": ' ',
          },
          customer :{
          "Who_is_your_target_customer": ' ', 
          },
        },
    blockSubmit: false,
    error: null,
    uid: '',
    email: '',
};
              
class Idea extends React.Component {
  constructor(props) {
    super(props)
      this.state={ questions: { comp : { "Are_there_competing_Companies": ""}, customer : { "Who_is_your_target_customer": ""}}
      }
  }
    
    componentDidMount() {
         this.props.firebase.getQuestion((customerQ) => {
             this.setState({questions:{customer: customerQ}});
         });
  }


    render() {
    // ideas
      
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
              <p>dfdfs</p>
            </div>
        </div>
          </div>
        <div className="centerDiv2"> 
        <div className="tabs">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="customer" title="Customer">
                <div className="label1"><Form.Label className = "question-label">{this.state.questions.customer.Who_is_your_target_customer}</Form.Label></div>
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
                <Form.Label className = "question-label">Question:</Form.Label>
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
                <Form.Label className = "question-label">Question:</Form.Label>
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
                 <Form.Label className = "question-label">Question:</Form.Label>
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

const RefineIdeaLink = () => (
  <Link to={ROUTES.IDEA_PAGE}> <Button className = "submit" variant="info">
    Refine
  </Button></Link>
);


export default IdeaPage;

export {IdeaForm, RefineIdeaLink};

