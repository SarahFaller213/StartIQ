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
    this.state = { text: '', uid: '', ideas: [] }
    this.handleChange = this.handleChange.bind(this)
  }

  //Still fixing now
  componentDidMount() {
    this.props.firebase.setupAuthChangeHandler((user) => {
      if(user) {
        this.setState({ uid: user.uid });
        this.props.firebase.getIdea(this.state.uid).then(ideas => {
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
      this.props.firebase.putIdea(this.state.text, this.state.uid);
      window.location.reload();
    }
  }

  //TODO: Edit or Delete function
  onEdit = () => {
    
  }

  onDelete = () => {
    
  }

  render() {
    //TODO: change this to some iteration 
    const ideas = this.state.ideas.map( (idea) => (
        <div className="row dashboard">
          <div className="col-9">
            {renderHTML(idea)}
          </div>
          <div className="col-3">
            <Button className = "submit" variant="danger" onClick = {this.onDelete} > Delete</Button>
            <Button className = "submit" variant="secondary" onClick = {this.onEdit}>Edit</Button>
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
