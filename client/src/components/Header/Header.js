import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
    // const [links, setLinks] = useState([
    //   {label: , path: "/"},
    //   {},
    //   {},
    //   {},
    //   {}, 
    //   {}, 

    // ])
    console.log('links', props);
    const login = useSelector((state) => {
        return state.users.login
    });
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#"><Link to="/">My website</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              props.links.map(link => link.logged === login ? (
                <Nav.Link href="#logout"><Link to={link.path}>{link.label}</Link></Nav.Link>
              ) : (
                <Nav.Link href="#logout"><Link to={link.path}>{link.label}</Link></Nav.Link>
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
            
            <Nav.Link href="#edit"><Link to="/edit/:id">Edit</Link></Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;