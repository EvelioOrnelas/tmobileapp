import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form } from "react-bootstrap";
import Logo from './TMOLogo.svg'
//QIvtmmjeBLQCtbtr
//import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//   return fetch('http://localhost:8080/overview', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

const NavBar = ({handleLoginClick/*, setToken*/}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password
  //   });
  //   setToken(token);
  // }
  return (
    <>
    <Navbar collapseOnSelect bg="dark" variant="dark" sticky='top' style={{overflow: 'auto'}}>
      <Container>
        <Navbar.Brand href="overview">
          <img alt="" src={Logo} width="100" height="30" className="d-inline-block align-top"/>{' '}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="overview"><b style={{color: 'white'}}>Overview</b></Nav.Link>
            <Nav.Link href="devices"><b style={{color: 'white'}}>Devices</b></Nav.Link>
            <Nav.Link href="statistics"><b style={{color: 'white'}}>Statistics</b></Nav.Link>
            <Nav.Link href="system"><b style={{color: 'white'}}>System</b></Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={handleShow}><b style={{color: 'white', whiteSpace: 'nowrap'}}>Log In</b></Nav.Link>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
              <Modal.Header closeButton style={{fontSize: '25px'}}><b>Log In</b></Modal.Header>
              <Modal.Body>
                <Form /*onSubmit={handleSubmit}*/>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter your Username" /*onChange={e => setUserName(e.target.value)}*//>
                      {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text> */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter your Password" /*onChange={e => setPassword(e.target.value)}*//>
                  </Form.Group>
                  <br/>
                  {/* <Button variant="primary" type="submit">
                    Submit
                  </Button> */}
                  <div className="d-grid gap-2">
                    <Button type='submit' variant="primary" size="lg">Log in</Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </Nav>
      </Container>
    </Navbar>
</>
  );
}

// NavBar.propTypes = {
//   setToken: PropTypes.func.isRequired
// }

export default NavBar