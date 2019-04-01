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
    this.listOfideas = [];
    this.state = { text: '', ideas: this.listOfidea }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // this.props.firebase.getIdea().then(value => {
    //   this.setState({ideas: this.listOfIdea.push(value.idea)});
    // });
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
    // const ideas = (
    //     <div>
    //     <div className = "dashboard">
    //       {renderHTML(this.state.ideas.idea)}
    //     </div>
    //     <Button className = "submit" variant="danger" > Delete</Button>
    //     <Button className = "submit" variant="secondary" onClick = {this.onEdit}>Edit</Button>
    //     </div>
    // );

    return (      
      <div className = "main">
        <div className="container">
          <div className="row">
            <div className='col-xl-12'>
              <ReactQuill className= "quill" value={this.state.text} placeholder ="Coming up with good ideas
                  . Enter a short description of your idea here"
                  onChange={this.handleChange} />
              <Button className = "submit" variant="info" onClick={this.onSubmit}>Post</Button>
              <h1>Idea Dashboard</h1>
              {/* {ideas} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage