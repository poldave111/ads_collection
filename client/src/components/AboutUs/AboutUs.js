import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Header from '../Header/Header';

const AboutUs = () => {
  const [links, setLinks] = useState([
    { label: "Logout", path: "/logout", logged: true},
    { label: "Add", path: "/add", logged: true},
    { label: "Contact", path: "/contact", logged: true}, 
    { label: "Register", path: "/register", logged: false}, 
]);

  return (
    <>
    <Header links={links}/>
    <Container>
      <Row>
        <Col md={6}>
          <Image src="https://via.placeholder.com/500x500" fluid />
        </Col>
        <Col md={6}>
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel justo eget felis facilisis semper. Mauris nec ipsum sit amet mauris bibendum blandit ac vel enim. Aenean id magna sed lacus tempor laoreet vitae id nisl. Integer ultrices aliquam justo at consequat. Nulla finibus, nibh sed aliquam sagittis, turpis diam viverra sapien, ut facilisis eros odio at augue. Suspendisse sed venenatis massa, quis tincidunt augue.</p>
          <p>Phasellus sed lacinia massa, eu fringilla eros. Praesent bibendum mi quis ex pellentesque, vitae imperdiet est consectetur. Sed nec efficitur dolor. Suspendisse malesuada auctor sem, eget rhoncus magna. Nulla dictum euismod lacus, a rhoncus mauris ullamcorper non. Proin vitae tortor nec quam sollicitudin varius. Morbi lacinia, purus eu blandit tempor, dolor purus dictum nisl, vel ultrices odio metus a enim. Sed auctor ullamcorper justo eu dapibus. Fusce at fermentum enim.</p>
          <Button variant="primary">Learn More</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AboutUs;