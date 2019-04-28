import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import logo from './startIQ.png';
import SignOutButton from '../SignOut';
import './style.css'
import { withFirebase } from '../Firebase';

const NavigationAuth = () => (
  <div className = "nav">
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <img src= {logo} alt="StartIQ" />
      <li> <Link to={ROUTES.DASHBOARD} >Dashboard</Link> </li>
      <li> <Link to={ROUTES.COMMUNITY}>Community</Link> </li>
      <li> <Link to={ROUTES.PROFILE}>Profile</Link> </li>
      <li>  <Link to={ROUTES.LANDING}><SignOutButton /></Link></li>
    </div>
  </nav>

  </div>
);

const NavigationAuthMentor = () => (
  <div className = "nav">
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <img src= {logo} alt="StartIQ" />
      <li> <Link to={ROUTES.FEED} >Dashboard</Link> </li>
      <li> <Link to={ROUTES.COMMUNITY}>Community</Link> </li>
      <li> <Link to={ROUTES.PROFILE}>Profile</Link> </li>
      <li>  <Link to={ROUTES.LANDING}><SignOutButton /></Link></li>
    </div>
  </nav>

  </div>
);


const NavigationAuthAdmin = () => (
  <div className = "nav">
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <img src= {logo} alt="StartIQ" />
      <li> <Link to={ROUTES.TOKEN} >Token</Link> </li>
      <li> <Link to={ROUTES.COMMUNITY}>Community</Link> </li>
      <li> <Link to={ROUTES.PROFILE}>Profile</Link> </li>
      <li>  <Link to={ROUTES.LANDING}><SignOutButton /></Link></li>
    </div>
  </nav>

  </div>
);

const NavigationNonAuth = () => (

  <div className = "nav">
  <nav className='navbar navbar-inverse'>
    <div className= "row mx-3">
      <img src= {logo} alt="StartIQ" />
      <li> <Link className = "mx-5" to={ROUTES.LANDING} >Home</Link> </li>
    </div>
  </nav>
  </div>
);


class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nav;

    if (this.props.userType === "admin") {
      nav = <NavigationAuthAdmin />;
    } else if (this.props.userType === "mentor") {
      nav = <NavigationAuthMentor />;
    } else if (this.props.userType === "user") {
      nav = <NavigationAuth />;
    } else {
      nav = <NavigationNonAuth />;
    }

    return (
      <div>
        {nav}
      </div>
    );
  }

}



export default withFirebase(Navigation);