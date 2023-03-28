
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

export const GeneralInfoForm = () => {
  const [salecheck, setSalecheck] = useState(false)
  const [collecheck, setCollecheck] = useState(false)
  const [delivecheck, setDeliveCheck] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  
  const Register = () => {
    // console.log(salecheck,collecheck,delivecheck);
    Axios.post("http://localhost:3002/addEmployee", {
      name: name,
      username: username,
      email: email,
      mobile: mobile,
      password: password,
      address: address,
      sales:salecheck,
      collection:collecheck,
      delivery:delivecheck,
    }).then((response) => {
      if (response.data.message) {
        console.log(response)
      } else {
        console.log("Employee Added Successfully")
      }

    });
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      
      <Card.Body>
        <h5 className="mb-4">Add Employee </h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Full Name {salecheck} </Form.Label>
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
          <Row className="align-items-center">
            
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" onChange={e => setMobile(e.target.value)} value={mobile} placeholder="+12-345 678 910" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group id="password" className="mb-4">
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
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="Enter your home address" />
              </Form.Group>
            </Col>
            
          </Row>
          <Row>
          <Form.Label>Select Role</Form.Label>
            <Col sm={4} className="mb-3">
             <Form.Check type="checkbox" onChange={(e)=> setSalecheck(e.target.checked)} label="Sales Executive"/>
            </Col>

            <Col sm={4} className="mb-3">
            <Form.Check type="checkbox" onChange={(e)=> setCollecheck(e.target.checked)} label="Payment Executive"/>
            </Col>
            <Col sm={4}>
            <Form.Check type="checkbox" onChange={(e)=> setDeliveCheck(e.target.checked)} label="Delivery Executive"/>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit" onClick={Register} >Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
