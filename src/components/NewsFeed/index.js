import * as React from "react"
import ReactQuill from 'react-quill';
import './style.css'
 import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Col, Button, Form, Row, Modal, Dropdown } from 'react-bootstrap';
import {FirebaseContext} from '../Firebase';
import renderHTML from 'react-render-html';

const NewsFeedPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <NewsFeed firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);

const SubmitButton = () => (
  <span className = "submit-idea px-2 py-1" variant="info">
    Post
  </span>
);


class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', ideas: [], revisions: [], comments: [], uid: undefined, username: undefined, attachments: [], profile: '', ideaKey: "", comment: "", commentShow: false}
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadRef = React.createRef();
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getCreator(this.state.uid).then(username => {
          this.setState({username: username});
          // console.log(this.state.username)
        });
        this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
          this.setState({ideas : ideas});
        });
        this.props.firebase.getProfile(this.state.uid).then(profile => {
          this.setState({profile : profile});
        });
      }
      else this.setState({ uid: undefined, username: undefined });
    });

  }

  handleChange(value) {
    this.setState({ text: value });
  }


  onChange = event => {
    this.setState({ comment: event.target.value });
  };

  onPost = (evt, key) => {
    evt.preventDefault();
    this.props.firebase.putComment(this.state.uid, key, this.state.username, this.state.comment).then(() => {
      this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
        this.setState({ideas : ideas});
      });
    });
  }

  onComment= (event) => {
    event.target.reset();
    this.setState({
      comment: ""
    })
  }


  render() {
    // ideas
    const ideas = this.state.ideas.map( ([key, ideaInfo]) => {
      const created_at = (new Date(ideaInfo.created_at)).toString();
      const comments = !ideaInfo.comments ? [] : Object.values(ideaInfo.comments).map(([username, comment]) => {
        return (
          <Form>
            <Form.Group as={Row} controlId="formPlaintextComment">
              <Form.Label className = "username_comment" column sm={2}>
                {username}
              </Form.Label>
              <Col sm="9" className = "commentContext pt-2">
                {comment}
              </Col>
            </Form.Group>
          </Form>
        )
      });
      
      const attachments = !ideaInfo.attachments ? [] : ideaInfo.attachments.map(([filename, url], idx) => {
        return (
          <div key={idx} className="my-0 px-2 idea-attachments" style={{ "borderTop": idx == 0 ? "solid rgb(223, 223, 223) 1pt" : "none" }}>
            <p className="my-0 px-0 col-11 d-inline-block"> <i className="fas fa-paperclip"></i> <a href={url} target="_blank">{filename}</a></p>
          </div>
        );
      });

      return (
        <div className="row dashboard" key={key}>

          <div className="col-8">
            <p className = "createdAt"> {created_at}, posted by {this.state.username} </p>
          </div>
          <div className="col-12">
            {renderHTML(ideaInfo.idea)}
            {attachments}
            <hr></hr>
            
            <Form onSubmit = {this.onComment} >
              <Form.Group as={Row} controlId="formPlaintextComment">
                <Form.Label className = "username_comment" column sm={2}>
                {this.state.username}
                </Form.Label>
                <Col sm="9">
                  <Form.Control className = "comment_input" type="Comment" onChange = {this.onChange} placeholder="Enter Your Comment..." />
                </Col>
                <Button className = "mr-4" type="submit" variant = "light" onClick = {(evt) => this.onPost(evt, key)}>Post</Button>
              </Form.Group>
            </Form>

            {comments}

          </div>
          
        </div>
      )
    });

    return (      
      <div className = "main">
        <h1 className="title text-center mt-0">Idea Dashboard</h1>
        <div className="container-fluid">
          <div className="my-5"></div>
          <div className="row ml-5">
            
            {/* hidden file input that receives multiple files to be uploaded */}
            <input type="file" className="invisible" ref={this.uploadRef} onChange={this.onUpload} multiple></input>
            
            <div className = 'dashboard_profile col-2 px-3 text-center mt-5'>
              <div className="col-10 offset-md-1">
                <img className = "profile_img" src={this.state.profile.profileIMG} alt="profile"/>
                <hr></hr>
                <div className = "dash_pro">
                  <p>{this.state.username}</p>
                  <p>Ideas: {this.state.ideas.length} </p>
                </div>
              </div>
            </div>

            <div className='col-9 px-3 mr-0 px-5 mt-4 idea-wrapper'>
              {ideas}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsFeedPage

