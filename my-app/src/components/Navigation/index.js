import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import logo from './startIQ.png';
import SignOutButton from '../SignOut';
import './style.css'
import { Navbar, Nav} from 'react-bootstrap';
// import { userInfo } from 'os';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <div className = "nav">
  <nav className='navbar navbar-inverse'>
    <div className='container-fluid'>
      <img src= {logo} alt="StartIQ" />
      <li> <Link to={ROUTES.DASHBOARD} >Dashboard</Link> </li>
      <li> <Link to={ROUTES.ADMIN}>Community</Link> </li>
      <li> <Link to={ROUTES.PROFILE}>Profile</Link> </li>
      <li>  <Link to={ROUTES.LANDING}><SignOutButton /></Link></li>
    </div>
  </nav>

  </div>
);

const NavigationNonAuth = () => (

  <div className = "nav"> 
  
  <Navbar bg="white" expand="lg">
    <img src= {logo} alt="StartIQ" />
    <Nav className="mr-4 px-5">
      <Nav.Link to={ROUTES.LANDING}>Home</Nav.Link>
    </Nav>
  </Navbar>
  
  </div>

);
export default Navigation;