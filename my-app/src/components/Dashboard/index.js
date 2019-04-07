import * as React from "react"
import ReactQuill from 'react-quill';
import './style.css'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Col, Button, Form, Row} from 'react-bootstrap';
import Firebase, {FirebaseContext} from '../Firebase';
import renderHTML from 'react-render-html';
import profileImg from './fakeImgForProfile.png';
import { NONAME } from "dns";


const DashboardPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Dashboard firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);

const SubmitButton = () => (
  <span className = "submit-idea px-2 py-1" variant="info">
    Post
  </span>
);

const FileUploadButton = () => (
  <i class="fas fa-paperclip"></i>
);

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <button className="ql-image mr-auto"></button>
    <button className="ql-upload px-0 py-0">
      <FileUploadButton className="mx-0 my-0"/>
    </button>
    <button className="ql-submit px-0 py-0 float-right mr-3">
      <SubmitButton className="mx-0 my-0"/>
    </button>
  </div>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', ideas: [], uid: undefined, username: undefined, attachments: [] }
    this.handleChange = this.handleChange.bind(this)
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
          // console.log(this.state.ideas.length);
        });
      }
      else this.setState({ uid: undefined, username: undefined });
    });
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  onSubmit = () =>{
    if(this.state.uid) {
      this.props.firebase.putIdea(this.state.text, this.state.uid, this.state.attachments).then(() => {
        this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
          this.setState({ideas : ideas, text: '', attachments: [] });
        });
      });
    }
  }

  //TODO: Edit or Delete function
  onEdit = () => {
    
  }

  onDelete = (key) => {
    this.props.firebase.deleteIdea(this.state.uid, key).then(() => {
      this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
        this.setState({ideas : ideas});
      });
    });
  }

  onUploadClick = () => {
    this.uploadRef.current.click();
  }

  removeAttachment = (idx) => {
    this.state.attachments.splice(idx, 1);
    this.setState({attachments: this.state.attachments});
  } 

  onUpload = (event) => {
    this.props.firebase.uploadFiles(this.state.uid, event.target.files).then(urls => {
      this.setState({attachments: [...this.state.attachments, ...urls]});
    });
    event.target.value=""; // to allow consecutive file upload on same file (it's just weird to not allow that)
  }

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        "submit": this.onSubmit,
        "upload": this.onUploadClick
      }
    }
  }

  render() {
    // ideas
    const ideas = this.state.ideas.map( ([key, ideaInfo]) => {
      const created_at = (new Date(ideaInfo.created_at)).toString();
      const attachments = !ideaInfo.attachments ? [] : ideaInfo.attachments.map(([filename, url], idx) => {
        return (
          <div key={idx} className="my-0 px-2 idea-attachments" style={{ "border-top": idx == 0 ? "solid rgb(223, 223, 223) 1pt" : "none" }}>
            <p className="my-0 px-0 col-11 d-inline-block"> <i class="fas fa-paperclip"></i> <a href={url} target="_blank">{filename}</a></p>
          </div>
        );
      });

      return (
        <div className="row dashboard" key={key}>

          <div className="col-8">
            <p className = "createdAt"> {created_at}, posted by {this.state.username} </p>
          </div>
          <div className="col-4">
            <Button className = "submit" variant="danger" onClick = {() => this.onDelete(key)} > Delete</Button>
            <Button className = "submit" variant="secondary" onClick = {this.onEdit}>Edit</Button>
          </div>

          <div className="col-12">
            {renderHTML(ideaInfo.idea)}
            {attachments}
            <hr></hr>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextComment">
                <Form.Label className = "username_comment" column sm={2}>
                {this.state.username}
                </Form.Label>
                <Col sm="9">
                  <Form.Control className = "comment_input" type="Comment" placeholder="Enter Your Comment..." />
                </Col>
                <Button type="submit" variant = "info">Post</Button>
              </Form.Group>
            </Form>
          </div>
          
        </div>
      )
    });

    // attachments below quill
    const attachments = this.state.attachments.map(([filename, url], idx) => {
      if(filename.length > 60) filename = filename.substring(0, 30)+" ... "+filename.substring(filename.length-30, filename.length);
      return (
        <div key={idx} className="my-0 px-2 attachments">
          <p className="my-0 px-0 col-11 d-inline-block"> <i class="fas fa-paperclip"></i> <a href={url} target="_blank">{filename}</a></p>
          <span className="float-right remove-attachment" onClick={() => this.removeAttachment(idx)} ><i class="far fa-trash-alt"></i></span>
        </div>
      );
    })

    return (      
      <div className = "main">
        <div className="container-fluid">
          <div className="my-5"></div>
          <div className="row ml-5">
            <input type="file" accept=".pdf" className="invisible" ref={this.uploadRef} onChange={this.onUpload} multiple></input>
            <div className = 'dashboard_profile col-2 px-3 text-center mt-5'>
              <div className="col-10 offset-md-1">
                <img className = "profile_img" src={profileImg} alt="profile"/>
                <hr></hr>
                <div className = "dash_pro">
                  <p>{this.state.username}</p>
                  <p>Ideas: {this.state.ideas.length} </p>
                </div>
              </div>
            </div>

            <div className='col-9 px-3 mr-0 px-5 idea-wrapper'>
              <h1 className="text-center mt-0 mb-5">Idea Dashboard</h1>
              <div className= "writeIdea mb-5">
                <CustomToolbar className="mb-0"/>
                <ReactQuill className= "quill mt-0" 
                            modules={this.modules} 
                            value={this.state.text} 
                            placeholder ="Coming up with good ideas. Enter a short description of your idea here"
                            onChange={this.handleChange}>
                </ReactQuill>
                <div className="mt-0">
                  {attachments}
                </div>
              </div>
              {ideas}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage
