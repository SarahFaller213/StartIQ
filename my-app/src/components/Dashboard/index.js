import * as React from "react"
import ReactQuill from 'react-quill';
import './style.css'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Button } from 'react-bootstrap';
import Firebase, {FirebaseContext} from '../Firebase';
import renderHTML from 'react-render-html';


const DashboardPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <Dashboard firebase={firebase}/>}
    </FirebaseContext.Consumer>
  </div>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', ideas: [], uid: undefined }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.firebase.setAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
          this.setState({ideas : ideas});
          console.log(this.state.ideas);
        });
      }
      else this.setState({ uid: undefined });
    });
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  onSubmit = () =>{
    if(this.state.uid) {
      this.props.firebase.putIdea(this.state.text, this.state.uid).then(() => {
        this.props.firebase.getIdea(this.state.uid).then(ideas => { // ideas : { KEY -> user idea}
          this.setState({ideas : ideas, text: ''});
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

  render() {
    const ideas = this.state.ideas.map( ([key, ideaInfo]) => (
        <div className="row dashboard" key={key}>
          <div className="col-12">
            <Button className = "submit" variant="danger" onClick = {() => this.onDelete(key)} > Delete</Button>
            <Button className = "submit" variant="secondary" onClick = {this.onEdit}>Edit</Button>
          </div>
          <div className="col-12">
            {renderHTML(ideaInfo.idea)}
          </div>
          
        </div>
    ));

    return (      
      <div className = "main">
        <div className="container">
          <div className="row">
            <div className='col-xl-12'>
              <h1>Idea Dashboard</h1>
              <div className= "writeIdea">
              <ReactQuill className= "quill" value={this.state.text} placeholder ="Coming up with good ideas
                  . Enter a short description of your idea here"
                  onChange={this.handleChange} />
              <Button className = "submit" variant="info" onClick={this.onSubmit}>Post</Button>
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
