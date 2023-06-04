import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import "./App.css";

export const NavBar = () => {
  var navBar = [];
  var url = window.location.href;
  var index = url.indexOf("3000/");
  var urlStr = url.substring(index + "3000/".length);
  var loginOrNot = urlStr === "login" || urlStr === "signup" || urlStr === "verify";
  const [user, setUser] = useState<String>("Guest");

  const fetchItems = async (): Promise<void> => {
      const response = await fetch('/getCurrentUser');
      const u = await response.json();
    
      if (u) setUser(u);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (user !== "Guest" && !loginOrNot) {
    navBar.push(    
      <Navbar bg="light" expand="lg" className="NavBar">
        <Nav.Link href="/" className="nav-brand">CSE 101 @ Ohio State</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
          <Nav className="mr-auto" id="nav-contents">
            <Nav.Link href="/schedule" className="nav-link">ScheduleBuilder</Nav.Link>
            <Nav.Link href="/courses" className="nav-link">CourseRating</Nav.Link>
            <Nav.Link href="/freshman" className="nav-link">FreshmanTips</Nav.Link>
            <Nav.Link href="/prereq" className="nav-link">PrereqCharts</Nav.Link>
          </Nav>
          <Nav className="ml-auto align-items-center" id="loginButton">
            <Link to="/login">
              <Button variant="success">{user}</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (!loginOrNot) {
    navBar.push(    
      <Navbar bg="light" expand="lg" className="NavBar">
        <Nav.Link href="/" className="nav-brand">CSE 101 @ Ohio State</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
          <Nav className="mr-auto" id="nav-contents">
            <Nav.Link href="/schedule" className="nav-link">ScheduleBuilder</Nav.Link>
            <Nav.Link href="/courses" className="nav-link">CourseRating</Nav.Link>
            <Nav.Link href="/freshman" className="nav-link">FreshmanTips</Nav.Link>
            <Nav.Link href="/prereq" className="nav-link">PrereqCharts</Nav.Link>
          </Nav>
          <Nav className="ml-auto align-items-center" id="loginButton">
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    navBar.push(
      <Navbar bg="light" expand="lg" className="NavBar">
        <Nav.Link href="/" className="nav-brand">CSE 101 @ Ohio State</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="mr-auto" id="nav-contents">
          <Nav.Link href="/schedule" className="nav-link">ScheduleBuilder</Nav.Link>
          <Nav.Link href="/courses" className="nav-link">CourseRating</Nav.Link>
          <Nav.Link href="#contact" className="nav-link">FreshmanTips</Nav.Link>
          <Nav.Link href="#contact" className="nav-link">PrereqCharts</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  return (
    <>
      {navBar}
    </>
  );
}