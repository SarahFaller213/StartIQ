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


class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', ideas: [], revisions: [], comments: [], uid: undefined, uids: [], username: undefined, attachments: [], profile: '', ideaKey: "", comment: "", commentShow: false}
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadRef = React.createRef();
  }

  componentDidMount() {
    //get Mentor profile
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getCreator(this.state.uid).then(username => {
          this.setState({username: username});
          // console.log(this.state.username)
        });
        this.props.firebase.getProfile(this.state.uid).then(profile => {
          this.setState({profile : profile});
        });
      }
      else this.setState({ uid: undefined, username: undefined });
    });

    //get all users' UID
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        key
      }));
      this.setState({
        uids : usersList
      })
      //get all users' ideas
      this.state.uids.forEach((key) =>{

        this.props.firebase.getIdea(key.key).then(data => { // ideas : { KEY -> user idea}
        
        if(data.length > 0){
          this.setState({
            ideas: [...this.state.ideas, data]
          });
          
        }
        });
      })
    });

  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }


  handleChange(value) {
    this.setState({ text: value });
  }


  onChange = event => {
    this.setState({ comment: event.target.value });
  };

  onPost = (evt, key, owner, uid) => {
    evt.preventDefault();
    this.props.firebase.putComment(uid, key, this.state.username, this.state.comment).then(() => {
      this.props.firebase.getIdea(uid).then(ideas => { // ideas : { KEY -> user idea}
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
    let idea;

    const ideas = this.state.ideas.map((list) => {
      console.log(list)
      idea = list.map( ([key, ideaInfo]) => {
        const created_at = (new Date(ideaInfo.created_at)).toString();
        const owner = ideaInfo.username;
        const idea = ideaInfo.idea;
        const owner_uid = ideaInfo.uid;

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
          
          
          <div className="row dashboard" key={key} owner = {owner} owner_uid = {owner_uid}>

            <div className="col-8">
              <p className = "createdAt"> {created_at}, posted by {owner}</p>
            </div>
            <div className="col-4">
              <Link to={`/Ideas/${key}/${owner_uid}`}> <Button className = "submit" variant="info"> Refine </Button></Link>
            </div>
            
            <div className="col-12">
              {renderHTML(idea)}
              {attachments}
              <hr></hr>
              
              <Form onSubmit = {this.onComment} >
              <Form.Group as={Row} controlId="formPlaintextComment">
                <Form.Label className = "username_comment" column sm={2}>
                {this.state.username}
                </Form.Label>
                <Col sm="8">
                  <Form.Control className = "comment_input" type="Comment" onChange = {this.onChange} placeholder="Enter Your Comment..." />
                </Col>
                <Button className = "mr-4" type="submit" variant = "light" onClick = {(evt) => this.onPost(evt, key, owner, owner_uid)}>Post</Button>
              </Form.Group>
              </Form>
              {comments}
            </div>
            
          </div>
        )
      });
    });


    return (
      <div className = "main">
        <h1 className="title text-center mt-0">Idea Dashboard</h1>
        <div className="container-fluid">
          <div className="my-5"></div>
          <div className="row ml-5">
            
            <input type="file" className="invisible" ref={this.uploadRef} onChange={this.onUpload} multiple></input>
            
            <div className = 'dashboard_profile col-2 px-3 text-center mt-5'>
              <div className="col-10 offset-md-1">
                <img className = "profile_img" src={this.state.profile.profileIMG} alt="profile"/>
                <hr></hr>
                <div className = "dash_pro">
                  <p>{this.state.username}</p>
                </div>
              </div>
            </div>

            <div className='col-9 px-3 mr-0 px-5 mt-4 idea-wrapper'>
              {idea}
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default NewsFeedPage

