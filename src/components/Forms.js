
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {

  var addedBy = sessionStorage.getItem("id");
  // alert(addedBy)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const Register = () => {
    if (name == "" || username == "" || email == "" || mobile == "" || password == "" || address == "") {
      alert('plese fill out the fields')
    } else {
      Axios.post("http://localhost:3002/adminReg", {
        name: name,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
      }).then((response) => {

      });
      alert("Registered Successfully")

    }
    setName("")
    setUsername("")
    setEmail("")
    setMobile("")
    setPassword("")
    setAddress("")
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Register New user </h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Full Name</Form.Label>
                <Form.Control required type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>User Name</Form.Label>
                <Form.Control required type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="enter username" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" onChange={e => setMobile(e.target.value)} value={mobile} placeholder="+91-345 678 910" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label>Enter Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
              <Form.Control required type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
            </InputGroup>
          </Form.Group>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group >
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="Enter your home address" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" onClick={Register} >Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
