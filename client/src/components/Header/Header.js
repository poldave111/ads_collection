import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { checkLogin } from '../../redux/usersRedux';
const commonLinks = [
  { label: "Add", path: "/add", },
  { label: "About Us", path: "/aboutus", }, 
  { label: "Contact", path: "/contact", }, 
  { label: "Register", path: "/register", }, 
]

function Header(props) {
  const [links, setLinks] = useState([

  ]);

  const login = useSelector((state) => {
    return state.users.login
  });

  useEffect(() => {
    if(login != null) {
        setLinks(
          [
              ...commonLinks,
              { label: "Logout", path: "/logout", }  
          ])
    } else {
        setLinks([
            ...commonLinks, 
            { label: "Login", path: "/login", }
        ])
           
    }
},[login])
  
  const dispatch = useDispatch() 
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);


  //console.log('login', login);

  const error = useSelector((state) => {
    return state.users.error
  });


  console.log(login);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#"><Link to="/" className={styles.title}>My website</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              links.map(link => (
                <Link key={link.label} to={link.path} className={styles.link }>{link.label}</Link>
              ))
            }
            {/* { login ? (
              <>
                <Nav.Link href="#logout"><Link to="/logout">Logout</Link></Nav.Link>
                <Nav.Link href="#add"><Link to="/add">Add</Link></Nav.Link>
                <Nav.Link href="#aboutus"><Link to="/aboutus">About Us</Link></Nav.Link>
                <Nav.Link href="#contact"><Link to="/contact">Contact</Link></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#register"><Link to="/register">Register</Link></Nav.Link>
                <Nav.Link href="#login"><Link to="/login">Login</Link></Nav.Link>
                <Nav.Link href="#aboutus"><Link to="/aboutus">About Us</Link></Nav.Link>
                <Nav.Link href="#contact"><Link to="/contact">Contact</Link></Nav.Link>
              </>
                
            )} */}
            
            {/* <Nav.Link href="#edit"><Link to="/edit/:id">Edit</Link></Nav.Link> */}
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;