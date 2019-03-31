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
    this.state = { text: '', ideas: "" }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.firebase.getIdea().then(ideas => {
      this.setState({ideas: ideas});
      console.log(this.state.ideas);
    });
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  onSubmit = () =>{
    this.props.firebase.putIdea(this.state.text);
    window.location.reload();
  }

  onEdit = () => {
    
  }

  render() {
    //TODO: change this to some iteration 
    const ideas = (
        <div>
        <div className = "dashboard">
          {renderHTML(this.state.ideas)}
        </div>
        <Button className = "submit" variant="danger" onClick = {this.onEdit}>Edit</Button>
        </div>
    );

    return (      
      <div className = "main">
        <div className="container">
          <div className="row">
            <div className='col-xl-12'>
              <ReactQuill className= "quill" value={this.state.text}
                  onChange={this.handleChange} />
              <Button className = "submit" variant="info" onClick={this.onSubmit}>Post</Button>
              <h1>Idea Dashboard</h1>
              {ideas}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage