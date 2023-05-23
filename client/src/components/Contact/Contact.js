import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../Header/Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [links, setLinks] = useState([
    { label: "Logout", path: "/logout", logged: true},
    { label: "Add", path: "/add", logged: true},
    { label: "About Us", path: "/aboutus", logged: true}, 
    { label: "Contact", path: "/contact", logged: true}, 
    { label: "Register", path: "/register", logged: false}, 
    { label: "Login", path: "/login", logged: false}
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // do something with form data
  }

  return (
    <>
      <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="my-4">Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="my-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>

  );
};

export default Contact;
